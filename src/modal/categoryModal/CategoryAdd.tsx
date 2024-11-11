import React, { useEffect } from "react";
import './CategoryAdd.css';
import { fetchGames } from "../../utils/faq.ts";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { atom, useAtom } from 'jotai';

interface Game {
    id: number;
    name: string;
}


const gamesAtom = atom<Game[]>([]);
const selectedGameAtom = atom<number | null>(null);
const categoryAtom = atom<string>("");

interface CategoryProps {
    closeModal: () => void;
}

// 카테고리 추가 컴포넌트
export const CategoryAdd: React.FC<CategoryProps> = ({ closeModal }) => {
    // 상태 변수 정의
    const [selectedGame, setSelectedGame] = useAtom(selectedGameAtom);
    const [games, setGames] = useAtom(gamesAtom);
    const [category, setCategory] = useAtom(categoryAtom);
    const { t } = useTranslation();

    // 게임 목록 불러오기 (컴포넌트가 처음 렌더링될 때 실행)
    useEffect(() => {
        const loadGameData = async () => {
            try {
                const gamesData = await fetchGames();  // 게임 목록 fetch
                if (Array.isArray(gamesData)) {
                    setGames(gamesData);  // 성공적으로 불러온 게임 목록을 상태에 설정
                } else {
                    console.error("게임 데이터 형식 오류:", gamesData);
                }
            } catch (error) {
                console.error("게임 데이터 불러오기 오류:", error);
            }
        };
        loadGameData();
    }, [setGames]);

    // 카테고리 추가 버튼 클릭 시 실행되는 함수
    const handleSubmit = async () => {
        // 선택된 게임과 카테고리가 없으면 경고 메시지 출력
        if (selectedGame === null || !category) {
            alert(`${t("plz_fill_space")}`);
            return;
        }

        try {
            // 서버에 카테고리 추가 요청
            const response = await axios.post("http://localhost:5000/category/insert", {
                game_id: selectedGame,  // 선택된 게임 ID
                category: category,  // 입력된 카테고리명
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // 서버 응답이 성공적이면, 카테고리 생성 성공 메시지 출력
            if (response.status === 200) {
                const result = response.data;
                console.log("카테고리 생성 성공:", result);
                alert(`${t('category_created')}`);
                location.reload();  // 페이지 새로고침 (카테고리 목록 갱신)
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
