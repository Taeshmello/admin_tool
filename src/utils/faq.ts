import axios from 'axios';

// 게임 목록을 가져오는 API 호출
export const fetchGames = async (): Promise<any> => {
    try {
        const response = await axios.get("http://localhost:5000/faq/games");
        return response.data;
    } catch (error) {
        console.error("게임 목록을 가져오는 데 실패했습니다.", error);
        throw error;
    }
};

// 게임 ID에 따라 카테고리 목록을 가져오는 API 호출
export const fetchCategoriesByGameId = async (gameId: number): Promise<any> => {
    try {
        const response = await axios.get(`http://localhost:5000/faq/categories/${gameId}`);
        return response.data;
    } catch (error) {
        console.error("카테고리 목록을 가져오는 데 실패했습니다.", error);
        throw error;
    }
};

// 게시판 상세 내용을 가져오는 API 호출
export const fetchDetails = async (board_num: number): Promise<any> => {
    try {
        const response = await axios.get(`http://localhost:5000/faq/details/${board_num}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('게시판 조회 중 오류 발생:', error);
        throw error;
    }
};

// 게시판 목록을 가져오는 API 호출
export const fetchBoard = async (): Promise<any> => {
    try {
        const response = await axios.get('http://localhost:5000/board/board', {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('게시판 조회 중 오류 발생:', error);
        throw error;
    }
};

// 게시물 삭제 요청
export const deleteBoardItem = async (boardNum: number): Promise<any> => {
    try {
        const response = await axios.delete(`http://localhost:5000/board/delete/${boardNum}`);
        return response.data;
    } catch (error) {
        console.error('게시물 삭제에 실패했습니다.', error);
        throw error;
    }
};

// 게시물 조회 요청
export const fetchBoardItem = async (boardNum: number): Promise<any> => {
    try {
        const response = await axios.get(`http://localhost:5000/faq/details/${boardNum}`);
        return response.data;
    } catch (error) {
        console.error("게시물 조회 중 오류 발생:", error);
        throw error;
    }
};
