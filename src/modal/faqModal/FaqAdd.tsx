import React, { useEffect, useState } from "react";
import styles from './Write.module.css';
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

interface WriteProps {
    closeModal: () => void;
}

export const Write: React.FC<WriteProps> = ({ closeModal }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<number | null>(null);
    const [title, setTitle] = useState<string>('');
    const [detail, setDetail] = useState<string>(''); // CKEditor의 내용을 저장할 상태
    const {t} = useTranslation()
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
                setCategories([]); // 게임이 선택되지 않은 경우 카테고리 초기화
            }
        };
        loadCategoryData();
    }, [selectedGame]);

    const handleSubmit = async () => {
        if (selectedGame === null || selectedCategory === null || !title || !detail) {
            alert("모든 필드를 채워주세요.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/faq/insert", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    game_id: selectedGame,
                    category_name: selectedCategory,
                    title: title,
                    detail: detail,
                }),
            });


            if (response.ok) {
                
                
                alert("FAQ 추가 완료");
                location.reload();
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
                <Editor detail={detail} setDetail={setDetail} /> {/* Editor에 detail과 setDetail 전달 */}
                <button className={styles.writeButton} onClick={handleSubmit}>
                {t('add_faq')}
                </button>
            </div>
        </div>
    );
};
