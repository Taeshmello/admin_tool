import React, { useEffect, useState } from "react";
import styles from './FaqEdit.module.css';
import { fetchGames, fetchCategoriesByGameId } from "../../utils/faq.ts";
import Editor from "../../components/Editor.tsx";
import { useTranslation } from "react-i18next";

interface Game {
    id: number;
    name: string;
}

interface Category {
    category_name: string;
}

interface FaqEditProps {
    closeEdit: () => void;
}

export const FaqEdit: React.FC<FaqEditProps> = ({ closeEdit }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<number | null>(null);
    const [title, setTitle] = useState<string>('');
    const [detail, setDetail] = useState<string>('');
    const [selectedDetail, setSelectedDetail] = useState<string | null>("");
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

    useEffect(() => {
        const loadCategoryData = async () => {
            if (selectedGame) {
                try {
                    const categoryData = await fetchCategoriesByGameId(selectedGame);
                    if (Array.isArray(categoryData)) {
                        setCategories(categoryData);
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
    }, [selectedGame]);


    

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2 className={styles.writeTitle}>{t('edit_faq')}</h2>
                <select
                    name="game"
                    className={styles.select}
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
                <select
                    name="category"
                    className={styles.select}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    value={selectedCategory ?? ""}
                    disabled={!selectedGame}
                >
                    <option value="">{t('category_select')}</option>
                    {categories.map((cat) => (
                        <option key={cat.category_name} value={cat.category_name}>
                            {cat.category_name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    className={styles.writeTitleInput}
                    placeholder={t('title')}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                
                    
                    <div className={styles.btnContainer}>
                    <button className={styles.close} onClick={closeEdit}>{t('close')}</button>
                    <button className={styles.save}>{t('save')}</button>
                </div>
                </div>
                
            </div>
        
    );
};
