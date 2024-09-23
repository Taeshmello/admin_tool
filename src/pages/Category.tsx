import { useEffect, useState } from "react";
import { fetchCategories } from "../utils/category";

interface Category {
  GC_idx:number;
    game_name: string;
    category: string;
}

const Category = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCategoryData = async () => {
            try {
                const categoriesData = await fetchCategories();
                setCategories(categoriesData); // 카테고리 데이터를 상태에 저장
            } catch (error) {
                console.error("카테고리 데이터 불러오기 오류:", error);
                setError("카테고리 데이터를 불러오는 데 실패했습니다.");
            }
        };
        loadCategoryData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>; // 오류 메시지 표시
    }

    return (
        <div className="page-container">
            <div className="page-content">
              
                <table className="board-table">
                    <thead>
                        <tr>
                          <th>카테고리 번호</th>
                            <th>게임명</th>
                            <th>카테고리명</th>
                            <th>옵션</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => {
                            return (
                                <tr key={index}>
                                  <td className="board_num">{category.GC_idx}</td>
                                    <td className='game_name'>{category.game_name}</td>
                                    <td className='category_name'>{category.category}</td>
                                    <td className='options'>
                                        <button>상세</button>
                                        <button>삭제</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Category;
