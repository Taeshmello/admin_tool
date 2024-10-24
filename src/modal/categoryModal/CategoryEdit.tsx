import React, { useEffect } from "react";
import styles from './CategoryEdit.module.css';
import { fetchGames, fetchCategoriesByGameId } from "../../utils/faq.ts";
import { useTranslation } from "react-i18next";
import { atom, useAtom } from 'jotai';

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

// Define Jotai atoms
const gamesAtom = atom<Game[]>([]);
const selectedGameAtom = atom<number | null>(null);
const categoriesAtom = atom<Category[]>([]);
const selectedCategoryAtom = atom<string | null>(null);
const titleAtom = atom<string>('');

export const CategoryEdit: React.FC<FaqEditProps> = ({ closeEdit }) => {
    const [games, setGames] = useAtom(gamesAtom);
    const [selectedGame, setSelectedGame] = useAtom(selectedGameAtom);
    const [categories, setCategories] = useAtom(categoriesAtom);
    const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
    const [title, setTitle] = useAtom(titleAtom);
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
    }, [selectedGame, setCategories]);

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
