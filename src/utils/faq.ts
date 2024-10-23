export const fetchGames = async () => {
    const response = await fetch("http://localhost:5000/faq/games");
    if (!response.ok) {
        throw new Error("게임 목록을 가져오는 데 실패했습니다.");
    }
    return response.json();
};

// 게임 ID에 따라 카테고리 목록을 가져오는 API 호출
export const fetchCategoriesByGameId = async (gameId: number) => {
    const response = await fetch(`http://localhost:5000/faq/categories/${gameId}`);
    if (!response.ok) {
        throw new Error("카테고리 목록을 가져오는 데 실패했습니다.");
    }
    return response.json();
};


export const fetchDetails = async (board_num: number): Promise<any> => {
    try {
        const response = await fetch(`http://localhost:5000/faq/details/${board_num}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error('게시판 조회 요청 실패');
        }
        return await response.json();
    } catch (error) {
        console.error('게시판 조회 중 오류 발생:', error);
        throw error;
    }
}


export const fetchBoard = async (): Promise<any> => {
    try {
        const response = await fetch('http://localhost:5000/board/board', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error('게시판 조회 요청 실패');
        }
        return await response.json();
    } catch (error) {
        console.error('게시판 조회 중 오류 발생:', error);
        throw error;
    }
}


export const deleteBoardItem = async (boardNum: number) => {
    const response = await fetch(`http://localhost:5000/board/delete/${boardNum}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('게시물 삭제에 실패했습니다.');
    }
    return response.json();
};


export const fetchBoardItem = async (boardNum: number) => {
    try {
        const response = await fetch(`http://localhost:5000/faq/details/${boardNum}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('게시물 조회에 실패했습니다.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("게시물 조회 오류:", error);
        throw error;
    }
};
