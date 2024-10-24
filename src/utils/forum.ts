import axios from 'axios';

// 언어 목록을 가져오는 API 호출
export const fetchLanguage = async (): Promise<any> => {
    try {
        const response = await axios.get("http://localhost:5000/forum/languages");
        return response.data;
    } catch (error) {
        console.error("언어 목록 가져오기 실패", error);
        throw error;
    }
};

// 커뮤니티 게시판을 가져오는 API 호출
export const fetchForum = async (): Promise<any> => {
    try {
        const response = await axios.get("http://localhost:5000/forum/forum");
        return response.data;
    } catch (error) {
        console.error("커뮤니티 게시판 가져오기 실패", error);
        throw error;
    }
};

// 서비스 코드에 따른 메뉴 목록을 가져오는 API 호출
export const fetchMenuByServiceCodeId = async (service_idx: number): Promise<any> => {
    try {
        const response = await axios.get(`http://localhost:5000/forum/menu/${service_idx}`);
        return response.data;
    } catch (error) {
        console.error("메뉴 목록을 가져오는 데 실패했습니다.", error);
        throw error;
    }
};

// 특정 게시글의 댓글을 가져오는 API 호출
export const fetchComments = async (FB_idx: number): Promise<any> => {
    try {
        const response = await axios.get(`http://localhost:5000/forum/comments/${FB_idx}`);
        return response.data;
    } catch (error) {
        console.error('댓글을 가져오는 데 실패했습니다.', error);
        throw error;
    }
};
