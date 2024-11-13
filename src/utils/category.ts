import axios from 'axios';

export const fetchCategories = async () => {
    try {
        const response = await axios.get("http://localhost:5000/board/categories");
        return response.data;
    } catch (error) {
        throw new Error("카테고리 목록을 가져오는 데 실패했습니다.");
    }
};

export const deleteCategoryItem = async (GC_idx: number) => {
    try {
        const response = await axios.delete(`http://localhost:5000/category/delete/${GC_idx}`);
        return response.data;
    } catch (error) {
        throw new Error("게시물 삭제에 실패했습니다.");
    }
};


export const fetchCategoryDetails = async (GC_idx:number) => {
    try {
        const response = await axios.get(`http://localhost:5000/category/details/${GC_idx}`)
        return response.data
    } catch(error){
        throw new Error("게시물 조회에 실패")
    }
}
