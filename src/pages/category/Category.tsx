import { useEffect } from "react";
import { fetchCategories, deleteCategoryItem, fetchCategoryDetails } from "../../utils/category";
import { fetchGames } from "../../utils/api";
import { CategoryAdd } from "../../modal/categoryModal/CategoryAdd";
import { CategoryEdit } from "../../modal/categoryModal/CategoryEdit";
import styles from './Category.module.css';
import { useTranslation } from "react-i18next";
import { useAtom } from 'jotai';
import {
    isEditModalOpenAtom,
    isModalOpenAtom,
    gamesAtom,
    selectedGameAtom,
} from "../../atoms/store";
import {
    categoriesAtom,
    selectedCategoryBoardItemAtom
} from "../../atoms/category";

const Category:React.FC = () => {
    const [categories, setCategories] = useAtom(categoriesAtom);
    const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
    const [isEditModalOpen, setIsEditModalOpen] = useAtom(isEditModalOpenAtom);
    const [games, setGames] = useAtom(gamesAtom);
    const [selectedGame, setSelectedGame] = useAtom(selectedGameAtom);
    const { t } = useTranslation();
    const [selectedBoardItem, setSelectedBoardItem] = useAtom(selectedCategoryBoardItemAtom);
    useEffect(() => {
        const loadCategoryData = async () => {
            try {
                const categoriesData = await fetchCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error("카테고리 데이터 불러오기 오류:", error);
            }
        };
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
        loadCategoryData();
    }, [setCategories, setGames]);



    const handleEdit = async (GC_idx: number) => {
        try {
            const boardItem = await fetchCategoryDetails(GC_idx);
            setSelectedBoardItem(boardItem);
            setIsEditModalOpen(true)
        } catch (error) {
            console.error("카테고리 조회 오류:", error);
            alert('카테고리 조회 실패')
        }
    }
    // 카테고리 삭제 함수
    const handleDelete = async (GC_idx: number) => {
        const confirmDelete = window.confirm(`${t('check_category_delete')}`);
        if (confirmDelete) {
            try {
                await deleteCategoryItem(GC_idx);
                setCategories(categories.filter(item => item.GC_idx !== GC_idx));
                alert(`${t('category_deleted')}`);
            } catch (error) {
                console.error("삭제 오류:", error);
                alert(`${t('category_deleted_failed')}`);
            }
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const closeEdit = () => setIsEditModalOpen(false);

    const filteredCategories = selectedGame 
    ? categories.filter(category => category.game_name === selectedGame) : categories;

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageContent}>
                <div className={styles.searchContainer}>
                    <div className={styles.gameSearchContainer}>
                        <h3 className={styles.gameTitle}>{t('Game')}</h3>
                        <select
                            name="game"
                            className={styles.gameSelect}
                            onChange={(e) => setSelectedGame(e.target.value)}
                        >
                            <option value="">All</option>
                            {games.map((game, index) => (
                                <option key={index} value={game.name}>
                                    {game.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className={styles.categoryAdd} onClick={openModal}>{t('add_category')}</button>
                </div>

                <table className={styles.boardTable}>
                    <thead>
                        <tr>
                            <th>{t('category_number')}</th>
                            <th>{t('game_name')}</th>
                            <th>{t('category_name')}</th>
                            <th>{t('registration_date')}</th>
                            <th>{t('option')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.map((category) => {
                            const created_date = category.created_at
                                ? new Date(category.created_at).toLocaleString('ko-KR')
                                : ' ';

                            return (
                                <tr key={category.GC_idx}>
                                    <td>{category.GC_idx}</td>
                                    <td>{category.game_name}</td>
                                    <td>{category.category}</td>
                                    <td>{created_date}</td>
                                    <td>
                                        <button className={styles.info} onClick={() => handleEdit(category.GC_idx)}>{t('info')}</button>
                                        <button className={styles.deleteBtn} onClick={() => handleDelete(category.GC_idx)}>{t('delete')}</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {isModalOpen && <CategoryAdd closeModal={closeModal} />}
            {isEditModalOpen && <CategoryEdit closeEdit={closeEdit} boardItem={selectedBoardItem} />}
        </div>
    );
}

export default Category;
