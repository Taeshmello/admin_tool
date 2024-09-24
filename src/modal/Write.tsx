import React, { useEffect, useState } from "react";
import styles from './Write.module.css'; // 수정된 부분
import { fetchGames, fetchCategoriesByGameId } from "../utils/faq.ts";

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
    const [detail, setDetail] = useState<string>('');

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
                const result = await response.json();
                console.log("게시물 작성 성공:", result);
                alert("게시물 등록 완료");
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
        <h2 className={styles.writeTitle}>FAQ 생성하기</h2>
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
            className={styles.writeInput}
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <div
            className={styles.detailInput}
            contentEditable
            onInput={(e) => setDetail((e.target as HTMLElement).innerHTML)} // 내용 업데이트
            dangerouslySetInnerHTML={{ __html: detail }} // 기존 내용 보여줌
        >
        </div>
        <button className={styles.writeButton} onClick={handleSubmit}>
            글쓰기
        </button>
    </div>
</div>
    );
};