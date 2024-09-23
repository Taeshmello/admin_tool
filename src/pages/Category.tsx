import { useEffect, useState } from "react";
import { fetchCategories,deleteCategoryItem } from "../utils/category";
import { CategoryAdd } from "../components/CategoryAdd";
import './Category.css'

interface Category {
  GC_idx:number;
    game_name: string;
    category: string;
    created_at: string;
}

const Category = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoriesItem, setCategoriesItem] = useState<Category[]>([]);
    const [filterdCategories, setFilteredCategories] = useState<Category[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 
    useEffect(() => {
        const loadCategoryData = async () => {
            try {
                const categoriesData = await fetchCategories();
                setCategories(categoriesData); // 카테고리 데이터를 상태에 저장
            } catch (error) {
                console.error("카테고리 데이터 불러오기 오류:", error);
               
            }
        };
        loadCategoryData();
    }, []);
    const handleDelete = async (GC_idx: number) => {
        const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
        if (confirmDelete) {
            try {
                await deleteCategoryItem(GC_idx);
                // 삭제 후 게시판 데이터 다시 불러오기
                const updatedCategories = categoriesItem.filter(item => item.GC_idx !== GC_idx);
                setCategoriesItem(updatedCategories);
                setFilteredCategories(updatedCategories);
                alert('카테고리가 삭제되었습니다.');
                location.reload()
            } catch (error) {
                console.error("삭제 오류:", error);
                alert('카테고리 삭제에 실패했습니다.');
            }
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    

    return (
        <div className="page-container">
            <div className="page-content">
              <button className="categoryAdd" onClick={openModal}>카테고리 추가</button>
                <table className="board-table">
                    <thead>
                        <tr>
                          <th>카테고리 번호</th>
                            <th>게임명</th>
                            <th>카테고리명</th>
                            <th>등록일</th>
                            <th>옵션</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => {
                            const created_date = category.created_at
                            ? new Date(category.created_at).toLocaleString('ko-KR')
                            : ' ';
                        
                        
                            return (
                                <tr key={index}>
                                  <td className="board_num">{category.GC_idx}</td>
                                    <td className='game_name'>{category.game_name}</td>
                                    <td className='category_name'>{category.category}</td>
                                    <td className="created_at">{created_date}</td>
                                    <td className='options'>
                                        <button className="info">상세</button>
                                        <button className="deleteBtn" onClick={()=>{handleDelete(category.GC_idx)}}>삭제</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {isModalOpen && <CategoryAdd closeModal={closeModal} />}
        </div>
    );
}

export default Category;
