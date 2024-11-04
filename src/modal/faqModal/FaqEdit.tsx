import React, { useEffect } from "react";
import styles from './FaqEdit.module.css';
import axios from 'axios';
import { fetchGames, fetchCategoriesByGameId } from "../../utils/faq.ts"; 
import DetailEditor from "../../components/DetailEditor.tsx";
import { useTranslation } from "react-i18next";
import { atom, useAtom } from 'jotai';

interface Game {
    id: number;
    name: string;
}

interface Category {
    category_name: string;
}

interface Board {
    board_num: number; 
    games: number;
    category_name: string;
    title: string;
    detail: string;
}

interface FaqEditProps {
    closeEdit: () => void;
    boardItem: Board;
}

const categoriesAtom = atom<Category[]>([]);
const selectedCategoryAtom = atom<string | null>(null);
const gamesAtom = atom<Game[]>([]);
const selectedGameAtom = atom<number | null>(null);
const titleAtom = atom<string>("");
const detailAtom = atom<string>("");

export const FaqEdit: React.FC<FaqEditProps> = ({ closeEdit, boardItem }) => {
    const [categories, setCategories] = useAtom(categoriesAtom);
    const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
    const [games, setGames] = useAtom(gamesAtom);
    const [selectedGame, setSelectedGame] = useAtom(selectedGameAtom);
    const [title, setTitle] = useAtom(titleAtom);
    const [detail, setDetail] = useAtom(detailAtom);
    const { t } = useTranslation();
    
    useEffect(() => {
        setTitle(boardItem.title);
        setDetail(boardItem.detail);
        setSelectedCategory(boardItem.category_name);
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
    }, [boardItem, setGames, setSelectedGame, setTitle, setDetail, setSelectedCategory]);

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
    }, [selectedGame, boardItem.category_name, setCategories, setSelectedCategory]);

    const handleSave = async () => {
        if (selectedGame === null || selectedCategory === null || !title) {
            alert(`${t('plz_fill_space')}`);
            return;
        }

        const updatedData = {
            board_num: boardItem.board_num,
            game_id: selectedGame,
            category_name: selectedCategory,
            title: title,
            detail: detail,
        };

        try {
            const response = await axios.put(`http://localhost:5000/faq/update`, updatedData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                alert(`${t("faq_edited")}`);
                closeEdit();
            } else {
                console.error("FAQ 수정 실패:", response.data);
                alert(`${t("faq_edited_failed")} ${response.data.error}`);
            }
        } catch (error) {
            console.error("FAQ 수정 중 오류:", error);
            alert(`${t("faq_edited_error")}`);
        }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2 className={styles.writeTitle}>{t('faq_detail')}({t('edit')})</h2>
                <select 
                    name="game"
                    className={styles.select}
                    onChange={(e) => setSelectedGame(Number(e.  target.value))}
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
                    placeholder={t("title")}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <DetailEditor 
                    detail={detail}
                    setDetail={setDetail} 
                />
                <div className={styles.btnContainer}>
                    <button className={styles.close} onClick={closeEdit}>{t('close')}</button>
                    <button className={styles.save} onClick={handleSave}>{t('edit')}</button>
                </div>
            </div>
        </div>
    );
};
