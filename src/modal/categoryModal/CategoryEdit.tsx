import React, { useEffect } from "react";
import styles from './CategoryEdit.module.css';
import { fetchGames} from "../../utils/faq.ts";
import { useTranslation } from "react-i18next";
import { atom, useAtom } from 'jotai';
import axios from "axios";

interface Game {
    id: number;
    name: string;
}

interface Category {
    GC_idx: number;
    game_name: string;
    category: string;
    created_at: string;
}

interface FaqEditProps {
    closeEdit: () => void;
    boardItem: Category;
}

const gamesAtom = atom<Game[]>([]);
const selectedGameAtom = atom<number | null>(null);
const titleAtom = atom<string>('');

export const CategoryEdit: React.FC<FaqEditProps> = ({ closeEdit, boardItem }) => {
    const [games, setGames] = useAtom(gamesAtom);
    const [selectedGame, setSelectedGame] = useAtom(selectedGameAtom);

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


    const handleUpdate = async () => {
        if(selectedGame === null){
            alert(`${t('plz_fill_space')}`)
            return
        }

        const updatedData = {
            board_num: boardItem.GC_idx,
            category: title
        }

        try {
            const response = await axios.put(`http://localhost:5000/category/update`,updatedData,{
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if(response.status === 200){
                alert(`${t("category_edited")}`);
                closeEdit()
            }else {
                console.error("카테고리 수정 실패:",response.data);
                alert(`${t("category_edited_failed")} ${response.data.error}`);
            }
        } catch(error) {
            console.error("카테고리 수정 중 오류:",error)
            console.log(updatedData)
            alert(`${t("category_edited+error")}`)
        }
    }


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
                
                <input
                    type="text"
                    className={styles.writeTitleInput}
                    placeholder={t('title')}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className={styles.btnContainer}>
                    <button className={styles.close} onClick={closeEdit}>{t('close')}</button>
                    <button className={styles.save}onClick={handleUpdate}>{t('save')}</button>
                </div>
            </div>
        </div>
    );
};
