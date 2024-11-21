import axios from 'axios';

// 권한 할당 API 호출
export const assignPermissions = async (data: { user_Idx: number; gameId: string; permissions: number[] }) => {
    try {
        const response = await axios.post('http://localhost:5000/user/assign-permissions', data, {
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

// 권한 삭제 API 호출
export const deletePermissions = async (requestBody: { userId: number; gameId: number; permissionId: number }) => {
    try {
        const response = await axios.post('http://localhost:5000/user/delete-permissions', requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('권한 삭제 요청 실패:', error);
        throw error;
    }
};

// 사용자 권한 조회 API 호출
export const fetchUserPermissions = async (userId: number, gameId: number, permission: number): Promise<any> => {
    try {
        const response = await axios.post('http://localhost:5000/user/user-permissions', { userId, gameId, permission }, {
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

// 사용자 데이터 조회 API 호출
export const fetchUserData = async (): Promise<any> => {
    try {
        const response = await axios.get("http://localhost:5000/auth/users", {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error);
        return null;
    }
};

// 사용자 상태 체크 API 호출
export const userStatusCheck = async (): Promise<any> => {
    try {
        const response = await axios.get("http://localhost:5000/auth/statusCheck", {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.error('사용자 상태를 가져오는 중 오류 발생:', error);
        window.location.href = '/'
        return null;
    }
};


// 특정 게임에 대한 사용자의 권한을 조회하는 API 호출
export const fetchPermissionsForGame = async (userId: number, gameId: string): Promise<number[]> => {
    try {
        const response = await axios.get(`http://localhost:5000/user/permissions-details/${userId}/${gameId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });


        return response.data;
    } catch (error) {
        console.error('게임 권한 조회 중 오류 발생:', error);
        throw error;
    }
};


export const userPermissionsCheck = async (): Promise<any> => {
    try {
        const response = await axios.get("http://localhost:5000/auth/login-permission", { withCredentials: true })

        return response.data;
    } catch (error) {
        console.error("사용자 권한을 가져오는 중 오류 발생:", error);
        window.location.href = '/'
        return null;
    }
}


export const userGameList = async (): Promise<any> => {
    try {
        const response = await axios.get("http://localhost:5000/auth/per-games",
            { withCredentials: true })

        return response.data;

    } catch (error) {
        alert(`게임 권한 불러오기 오류${error}`)
        window.location.href = '/'
        return null
    }
}