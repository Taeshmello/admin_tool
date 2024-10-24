import React, { useEffect } from "react";
import './CategoryAdd.css';
import { fetchGames } from "../../utils/faq.ts";
import { useTranslation } from "react-i18next";
import axios from 'axios'; // Axios import 추가
import { atom, useAtom } from 'jotai';

interface Game {
    id: number;
    name: string;
}

interface CategoryProps {
    closeModal: () => void; 
}

// Define Jotai atoms
const gamesAtom = atom<Game[]>([]);
const selectedGameAtom = atom<number | null>(null);
const categoryAtom = atom<string>("");

export const CategoryAdd: React.FC<CategoryProps> = ({ closeModal }) => {
    const [selectedGame, setSelectedGame] = useAtom(selectedGameAtom);
    const [games, setGames] = useAtom(gamesAtom);
    const [category, setCategory] = useAtom(categoryAtom);
    const { t } = useTranslation();

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
    }, [setGames]);

    const handleSubmit = async () => {
        if (selectedGame === null || !category) {
            alert(`${t("plz_fill_space")}`);
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/category/insert", {
                game_id: selectedGame,
                category: category,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                const result = response.data;
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
                    onChange={(e) => setCategory(e.target.value)}
                />
                
                <button className="write-button" onClick={handleSubmit}>
                    {t('add_category')}
                </button>
            </div>
        </div>
    );
};
