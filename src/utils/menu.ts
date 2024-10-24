import axios from 'axios';

// 메뉴 게시판 조회 API 호출
export const fetchMenuBoard = async (): Promise<any> => {
    try {
        const response = await axios.get("http://localhost:5000/menu/board", {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true, // credentials: "include" 대체
        });
        return response.data;
    } catch (error) {
        console.error('메뉴 게시판 조회 중 오류 발생:', error);
        throw error;
    }
};

// 사용자 상태 조회 API 호출
export const fetchBoardUserStatus = async (): Promise<any> => {
    try {
        const response = await axios.get("http://localhost:5000/menu/userStatus", {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('메뉴 게시판 조회 중 오류 발생:', error);
        throw error;
    }
};

// 관리자 상태 조회 API 호출
export const fetchBoardAdminStatus = async (): Promise<any> => {
    try {
        const response = await axios.get("http://localhost:5000/menu/adminStatus", {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('메뉴 게시판 조회 중 오류 발생:', error);
        throw error;
    }
};

// 특정 메뉴 아이템 조회 API 호출
export const fetchMenuBoardItem = async (CM_idx: number): Promise<any> => {
    try {
        const response = await axios.get(`http://localhost:5000/menu/menuDetail/${CM_idx}`);
        return response.data;
    } catch (error) {
        console.error('메뉴 조회 오류:', error);
        throw error;
    }
};

// 메뉴 상태 업데이트 API 호출
export const updateMenuStatus = async (CM_idx: number, UserStatus: string, AdminStatus: string): Promise<any> => {
    try {
        const response = await axios.put(`http://localhost:5000/menu/statusUpdate`, {
            CM_idx,
            UserStatus,
            AdminStatus,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('상태 업데이트 실패');
    }
};

// 서비스 코드 조회 API 호출
export const fetchServiceCode = async (): Promise<any> => {
    try {
        const response = await axios.get('http://localhost:5000/menu/serviceCode', {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw new Error('서비스코드 업데이트 실패');
    }
};

// 메뉴 이름 조회 API 호출
export const fetchMenuName = async (): Promise<any> => {
    try {
        const response = await axios.get('http://localhost:5000/menu/menuName', {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw new Error('메뉴이름 업데이트 실패');
    }
};
