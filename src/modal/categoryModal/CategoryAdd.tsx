import React, { useEffect, useState } from "react";
import './CategoryAdd.css';
import { fetchGames } from "../../utils/faq.ts";
import { useTranslation } from "react-i18next";

interface Game {
    id: number;
    name: string;
}



interface CategoryProps {
    closeModal: () => void; // closeModal 프롭 추가
}

export const CategoryAdd: React.FC<CategoryProps> = ({ closeModal }) => { // 수정된 부분
    
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<number | null>(null);
    const [category, setCategory] = useState<string | any>("");
    const {t} = useTranslation();

    useEffect(() => {
        const loadGameData = async () => {
            try {
                const gamesData = await fetchGames();
                if (Array.isArray(gamesData)) {
                    setGames(gamesData);
                } else {
                    console.error("게임 데이터 형식 오류:", gamesData);
                }
            } catch (error) {
                console.error("게임 데이터 불러오기 오류:", error);
            }
        };
        loadGameData();
    }, []);

    

    const handleSubmit = async () => {
        if (selectedGame === null || !category) {
            alert(`${t("plz_fill_space")}`);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/category/insert", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    game_id: selectedGame,
                    category:category,
                    
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("카테고리 생성 성공:", result);
                alert(`${t('category_created')}`);
                location.reload();
            } 
        } catch (error) {
            console.error("카테고리 생성 오류:", error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2 className="write-title">{t('add_category')}</h2>
                <select
                    name="game"
                    className='select'
                    onChange={(e) => setSelectedGame(Number(e.target.value))}
                    value={selectedGame ?? ""}
                >
                    <option value="">{t('game_select')}</option>
                    {games.map((game) => (
                        <option key={game.id} value={game.id}>
                            {game.name}
                        </option>
                    ))}
                </select>
               
                    <input
                    type="text"
                    className="write-input"
                    placeholder={t('category')}
                    value={category}
                    onChange={(e) => setCategory(e.target.value) }
                />
                
                <button className="write-button" onClick={handleSubmit}>
                {t('add_category')}
                </button>
            </div>
        </div>
    );
};
