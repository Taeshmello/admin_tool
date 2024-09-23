export const fetchCategories = async () => {
    const response = await fetch("http://localhost:5000/board/categories");
    if (!response.ok) {
        throw new Error("카테고리 목록을 가져오는 데 실패했습니다.");
    }
    return response.json();
};



