

// 로그아웃 처리 함수
export const logout = (removeCookie: Function): void => {
    removeCookie('accessToken', { path: '/' });
    fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include",
    })
        .then((response) => {
            if (response.ok) {
                console.log("로그아웃 성공");
                window.location.href = '/';
            } else {
                console.error("로그아웃 실패", response.status);
            }
        })
        .catch((error) => {
            console.error("로그아웃 중 오류 발생:", error);
        });
};

// 유저 정보 불러오는 함수
export const fetchUserData = async (): Promise<any> => {
    try {
        const response = await fetch("http://localhost:5000/auth/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include" // Ensure credentials are included
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("사용자 정보를 불러오지 못했습니다.");
        }
    } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", error);
        return null;
    }
};


export const userStatusCheck = async (): Promise<any> => {
    try {
        const response = await fetch("http://localhost:5000/auth/statusCheck", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("상태값을 불러오지 못함");
        }
    } catch (error) {
        console.error("사용자 상태를 가져오는 중 오류 발생:", error);
        return null;
    }
}


// 인증된 API 요청을 위한 함수
export const fetchData = async (accessToken: string): Promise<any> => {
    try {
        const response = await fetch("http://localhost:5000/auth/protected-data", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            credentials: "include"
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("protected data를 가져오지 못함");

        }
    } catch (error) {
        console.error("protected data를 가져오는 중 오류 발생:", error);
        return null;
    }
};

// 게임 장르를 가져오는 API 호출 함수
export async function fetchGameGenres() {

    const response = await fetch('http://localhost:5000/auth/genres');
    if (!response.ok) {
        throw new Error('Failed to fetch game genres');
    }
    return response.json();
}
// 게임을 가져오는 API 호출 함수
export async function fetchGames() {

    const response = await fetch('http://localhost:5000/auth/games');
    if (!response.ok) {
        throw new Error('Failed to fetch games');
    }   
    return response.json();
}

export async function userPermissions(){

    const response = await fetch('http://localhost:5000/auth/permissions')
    if(!response.ok){
        throw new Error('Failed to fetch permissions')
    }
    return response.json()

}

// Access Token 갱신 함수
export const refreshAccessToken = async (setCookie: Function): Promise<void> => {
    try {
        const response = await fetch("http://localhost:5000/auth/refresh-token", {
            method: "POST",
            credentials: "include",
        });

        if (response.ok) {
            const result = await response.json();
            setCookie('accessToken', result.accessToken, { path: '/', secure: true, httpOnly: true });
        } else {
            console.error("액세스 토큰을 새로 고치지 못했습니다.", response.status);

        }
    } catch (error) {
        console.error("액세스 토큰을 새로 고치는 중 오류가 발생:", error);

    }
};



export const assignPermissions = async (data: { user_Idx: number; gameId: string; permissions: number[] }) => {
    try {
        const response = await fetch('http://localhost:5000/auth/assign-permissions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // 데이터 JSON으로 변환
        });

        // 성공 상태 코드 확인
        if (response.status !== 200 && response.status !== 201) {
            const errorData = await response.text(); // 에러 메시지를 텍스트로 받기
            throw new Error(`Error: ${errorData}`); // 에러 메시지 출력
        }

        return await response.json(); // 응답 데이터 반환
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        throw error; // 오류 재발생
    }
};


