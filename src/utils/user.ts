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

        return await response.json(); // 응답 데이터 반환
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        throw error; // 오류 재발생
    }
};

export const deletePermissions = async (requestBody: { userId: number; gameId: number; permissionId: number }) => {
    const response = await fetch('http://localhost:5000/auth/delete-permissions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
        throw new Error('권한 삭제 요청에 실패했습니다.');
    }
    return await response.json();
};


export const fetchUserPermissions = async (userId: number, gameId: number, permission:number): Promise<any> => {
    try {
        const response = await fetch('http://localhost:5000/auth/user-permissions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, gameId, permission }),
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error('사용자 권한 조회 요청에 실패했습니다.');
        }

        return await response.json(); 
    } catch (error) {
        console.error('사용자 권한 조회 중 오류 발생:', error);
        throw error; // 오류 재발생
    }
};


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