export const fetchCategories = async () => {
    const response = await fetch("http://localhost:5000/board/categories");
    if (!response.ok) {
        throw new Error("카테고리 목록을 가져오는 데 실패했습니다.");
    }
    return response.json();
};



export const deleteCategoryItem = async (GC_idx: number) => {
    const response = await fetch(`http://localhost:5000/category/delete/${GC_idx}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('게시물 삭제에 실패했습니다.');
    }
    return response.json();
};