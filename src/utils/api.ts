// 인증된 API 요청을 위한 함수
export const fetchData = async (accessToken: string): Promise<any> => {
    try {
        const response = await fetch("http://localhost:5000/auth/protected-data", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,  // Access Token을 헤더에 포함
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data; 
        } else {
            throw new Error("protected data를 가져오지 못함");
        }
    } catch (error) {
        console.error("protected data를 가져오는 중 오류 발생:", error);
        return null;
    }
};


// at를 갱신하는 함수
export const refreshAccessToken = async (setCookie: Function): Promise<void> => {
    try {
        const response = await fetch("http://localhost:5000/auth/refresh-token", {
            method: "POST",
            credentials: "include",  // 쿠키를 함께 보내기 위한 옵션
        });

        if (response.ok) {
            const result = await response.json();
            setCookie('accessToken', result.accessToken, { path: '/', secure: true, httpOnly: false });  // 새로 받은 Access Token을 쿠키에 저장

        } else {
            console.error("액세스 토큰을 새로 고치지 못했습니다.", response.status);
            throw new Error("Refresh token failed");
        }
    } catch (error) {
        console.error("액세스 토큰을 새로 고치는 중 오류가 발생:", error);
    }
};


// 로그아웃 처리 함수
export const logout = (removeCookie: Function): void => {
    // Access Token 쿠키 삭제
    removeCookie('accessToken', { path: '/' });
    fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include",
    })
        .then((response) => {
            if (response.ok) {
                console.log("로그아웃 성공");
            } else {
                console.error("로그아웃 실패", response.status);
            }
        })
        .catch((error) => {
            console.error("로그아웃 중 오류 발생:", error);
        });

    // 로그인 페이지로 리다이렉트
    window.location.href = '/';
};


