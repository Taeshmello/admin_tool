import React, { useEffect } from "react";
import styles from './Write.module.css';
import { fetchGames, fetchCategoriesByGameId } from "../../utils/faq.ts";
import Editor from "../../components/Editor.tsx";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { atom, useAtom } from 'jotai';

interface Game {
    id: number;
    name: string;
}

interface Category {
    category_name: string;  
}

interface WriteProps {
    closeModal: () => void;
}


const categoriesAtom = atom<Category[]>([]);
const selectedCategoryAtom = atom<string | null>(null);
const gamesAtom = atom<Game[]>([]);
const selectedGameAtom = atom<number | null>(null);
const titleAtom = atom<string>('');
const detailAtom = atom<string>('');

export const Write: React.FC<WriteProps> = ({ closeModal }) => {
    const [categories, setCategories] = useAtom(categoriesAtom);
    const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
    const [games, setGames] = useAtom(gamesAtom);
    const [selectedGame, setSelectedGame] = useAtom(selectedGameAtom);
    const [title, setTitle] = useAtom(titleAtom);
    const [detail, setDetail] = useAtom(detailAtom);
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

    const handleSubmit = async () => {
        if (selectedGame === null || selectedCategory === null || !title || !detail) {
            alert(`${t('plz_fill_space')}`);
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/faq/insert", {
                game_id: selectedGame,
                category_name: selectedCategory,
                title: title,
                detail: detail,
            });

            if (response.status === 200) {
                alert(`${t("faq_created")}`);
                location.reload(); // Consider refactoring this to a better state management approach
            } else {
                console.error("게시물 작성 실패:", response.statusText);
            }
        } catch (error) {
            console.error("게시물 작성 중 오류:", error);
        }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={closeModal}>&times;</span>
                <h2 className={styles.writeTitle}>{t('faq_create')}</h2>
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
                    className={styles.writeInput}
                    placeholder={t('title')}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Editor detail={detail} setDetail={setDetail} />
                <button className={styles.writeButton} onClick={handleSubmit}>
                    {t('add_faq')}
                </button>
            </div>
        </div>
    );
};
