import axios from 'axios';

// 로그아웃 처리 함수
export const logout = async (removeCookie: Function): Promise<void> => {
    removeCookie('accessToken', { path: '/' });
    try {
        const response = await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true });
        if (response.status === 200) {
            console.log("로그아웃 성공");
            window.location.href = '/';
        }
    } catch (error) {
        console.error("로그아웃 중 오류 발생:", error);
    }
};

// 유저 정보 불러오는 함수
export const fetchUserData = async (): Promise<any> => {
    try {
        const response = await axios.get("http://localhost:5000/auth/users", { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", error);
        return null;
    }
};

// 유저 상태 체크 함수
export const userStatusCheck = async (): Promise<any> => {
    try {
        const response = await axios.get("http://localhost:5000/auth/statusCheck", { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("사용자 상태를 가져오는 중 오류 발생:", error);
        return null;
    }
};

// 인증된 API 요청을 위한 함수
export const fetchData = async (accessToken: string): Promise<any> => {
    try {
        const response = await axios.get("http://localhost:5000/auth/access-token", {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("protected data를 가져오는 중 오류 발생:", error);
        return null;
    }
};

// 게임 장르를 가져오는 API 호출 함수
export const fetchGameGenres = async (): Promise<any> => {
    try {
        const response = await axios.get('http://localhost:5000/auth/genres');
        return response.data;
    } catch (error) {
        console.error("게임 장르를 가져오는 중 오류 발생:", error);
        throw error;
    }
};

// 게임을 가져오는 API 호출 함수
export const fetchGames = async (): Promise<any> => {
    try {
        const response = await axios.get('http://localhost:5000/auth/games');
        return response.data;
    } catch (error) {
        console.error("게임 데이터를 가져오는 중 오류 발생:", error);
        throw error;
    }
};

// 사용자 권한을 가져오는 API 호출 함수
export const userPermissions = async (): Promise<any> => {
    try {
        const response = await axios.get('http://localhost:5000/auth/permissions');
        return response.data;
    } catch (error) {
        console.error("권한을 가져오는 중 오류 발생:", error);
        throw error;
    }
};

// Access Token 갱신 함수
export const refreshAccessToken = async (setCookie: Function): Promise<void> => {
    try {
        const response = await axios.post("http://localhost:5000/auth/refresh-token", {}, { withCredentials: true });
        const result = response.data;
        setCookie('accessToken', result.accessToken, { path: '/', secure: true, httpOnly: true });
    } catch (error) {
        console.error("액세스 토큰을 새로 고치는 중 오류가 발생:", error);
        window.location.href = '/';
    }
};

// 권한 할당 함수
export const assignPermissions = async (data: { user_Idx: number; gameId: string; permissions: number[] }): Promise<any> => {
    try {
        const response = await axios.post('http://localhost:5000/auth/assign-permissions', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        throw error;
    }
};

// 권한 삭제 함수
export const deletePermissions = async (requestBody: { userId: number; gameId: number; permissionId: number }): Promise<any> => {
    try {
        const response = await axios.post('http://localhost:5000/auth/delete-permissions', requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('권한 삭제 요청 중 오류 발생:', error);
        throw error;
    }
};

// 사용자 권한 조회 함수
export const fetchUserPermissions = async (userId: number, gameId: number, permission: number): Promise<any> => {
    try {
        const response = await axios.post('http://localhost:5000/auth/user-permissions', { userId, gameId, permission }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('사용자 권한 조회 중 오류 발생:', error);
        throw error;
    }
};

// 사용자 게임 및 권한 정보 조회 함수
export const fetchUserPermissionGames = async (userId: number): Promise<any> => {
    try {
        const response = await axios.get(`http://localhost:5000/auth/user-games-permissions/${userId}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('사용자 게임 및 권한 정보를 가져오는 중 오류 발생:', error);
        throw error;
    }
};
