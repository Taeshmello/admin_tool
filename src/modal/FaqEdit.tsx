import React, { useEffect, useState } from "react";
import styles from './FaqEdit.module.css';
import { fetchGames, fetchCategoriesByGameId } from "../utils/faq.ts"; // updateBoardItem 추가
import DetailEditor from "../components/DetailEditor.tsx"; // 에디터 사용 시 추가

interface Game {
    id: number;
    name: string;
}

interface Category {
    category_name: string;
}

interface Board {
    board_num: number; // 게시물 번호 추가
    games: number;
    category_name: string;
    title: string;
    detail: string;
}

interface FaqEditProps {
    closeEdit: () => void;
    boardItem: Board; // 선택한 게시물 정보를 추가
}

export const FaqEdit: React.FC<FaqEditProps> = ({ closeEdit, boardItem }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(boardItem.category_name);
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<number | null>(null);
    const [title, setTitle] = useState<string>(boardItem.title);
    const [detail, setDetail] = useState<string>(boardItem.detail);

    useEffect(() => {
        const loadGameData = async () => {
            try {
                const gamesData = await fetchGames();
                if (Array.isArray(gamesData)) {
                    setGames(gamesData);
                    const selectedGame = gamesData.find(game => game.name === boardItem.games);
                    if (selectedGame) {
                        setSelectedGame(selectedGame.id);
                    }
                } else {
                    console.error("게임 데이터 형식 오류:", gamesData);
                }
            } catch (error) {
                console.error("게임 데이터 불러오기 오류:", error);
            }
        };
        loadGameData();
    }, [boardItem.games]);

    useEffect(() => {
        const loadCategoryData = async () => {
            if (selectedGame) {
                try {
                    const categoryData = await fetchCategoriesByGameId(selectedGame);
                    if (Array.isArray(categoryData)) {
                        setCategories(categoryData);
                        const selectedCategory = categoryData.find(cat => cat.category_name === boardItem.category_name);
                        if (selectedCategory) {
                            setSelectedCategory(selectedCategory.category_name);
                        }
                    } else {
                        console.error("카테고리 데이터 형식 오류:", categoryData);
                    }
                } catch (error) {
                    console.error("카테고리 데이터 불러오기 오류:", error);
                }
            } else {
                setCategories([]);
            }
        };
        loadCategoryData();
    }, [selectedGame, boardItem.category_name]);

    const handleSave = async () => {
            if (selectedGame === null || selectedCategory === null || !title) {
                alert("모든 필드를 채워주세요.");
                return;
            }
    
        const updatedData = {
            board_num: boardItem.board_num, // 여기에서 board_num 추가
            game_id: selectedGame,
            category_name: selectedCategory,
            title: title,
            detail: detail,
        };
    
        console.log("업데이트할 데이터:", updatedData); // 디버깅용 로그
        
    
        try {
            const response = await fetch(`http://localhost:5000/faq/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
    
            if (response.ok) {
                alert('FAQ가 수정되었습니다.');
                closeEdit();
            } else {
                const errorResponse = await response.json(); // 오류 응답을 가져오기
                console.error("FAQ 수정 실패:", errorResponse);
                alert(`FAQ 수정에 실패했습니다: ${errorResponse.error}`);
            }
        } catch (error) {
            console.error("FAQ 수정 중 오류:", error);
            alert('FAQ 수정 중 오류가 발생했습니다.');
        }
    };
    
    

    

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2 className={styles.writeTitle}>FAQ 상세(수정)</h2>
                <select
                    name="game"
                    className={styles.select}
                    onChange={(e) => setSelectedGame(Number(e.target.value))}
                    value={selectedGame ?? ""}
                >
                    <option value="">게임 선택</option>
                    {games.map((game) => (
                        <option key={game.id} value={game.id}>
                            {game.name}
                        </option>
                    ))}
                </select>
                <select
                    name="category"
                    className={styles.select}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    value={selectedCategory ?? ""}
                    disabled={!selectedGame}
                >
                    <option value="">카테고리 선택</option>
                    {categories.map((cat) => (
                        <option key={cat.category_name} value={cat.category_name}>
                            {cat.category_name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    className={styles.writeTitleInput}
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <DetailEditor 
                    detail={detail} // content를 detail로 변경
                    setDetail={setDetail} // onChange를 setDetail로 변경
                />
                <div className={styles.btnContainer}>
                    <button className={styles.close} onClick={closeEdit}>닫기</button>
                    <button className={styles.save} onClick={handleSave}>수정</button>
                </div>
            </div>
        </div>
    );
};
