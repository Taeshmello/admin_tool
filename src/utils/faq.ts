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


