import FaqManageStyle from './FaqManage.module.css';
import { useEffect } from 'react';
import { fetchGames } from '../../utils/api';
import { fetchBoard, deleteBoardItem, fetchBoardItem } from '../../utils/faq';
import { Write } from '../../modal/faqModal/FaqAdd';
import { FaqEdit } from '../../modal/faqModal/FaqEdit';
import { useTranslation } from 'react-i18next';
import { atom, useAtom } from 'jotai';

interface Game {
    name: string;
    genre_name: string;
}

interface Board {
    board_num: number;
    games: string;
    category_name: string;
    title: string;
    created_at: string;
    detail: string;
}

const searchTermAtom = atom<string>('');
const boardAtom = atom<Board[]>([]);
const filteredBoardAtom = atom<Board[]>([]);
const gamesAtom = atom<Game[]>([]);
const selectedGameAtom = atom<string>('');
const isModalOpenAtom = atom<boolean>(false);
const isEditOpenAtom = atom<boolean>(false);
const selectedBoardItemAtom = atom<Board | null>(null);

const FaqManage = () => {
    const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
    const [board, setBoard] = useAtom(boardAtom);
    const [filteredBoard, setFilteredBoard] = useAtom(filteredBoardAtom);
    const [games, setGames] = useAtom(gamesAtom);
    const [selectedGame, setSelectedGame] = useAtom(selectedGameAtom);
    const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
    const [isEditOpen, setIsEditOpen] = useAtom(isEditOpenAtom);
    const [selectedBoardItem, setSelectedBoardItem] = useAtom(selectedBoardItemAtom);
    const { t } = useTranslation();


    const handleEdit = async (boardNum: number) => {
        try {
            const boardItem = await fetchBoardItem(boardNum);
            setSelectedBoardItem(boardItem); 
            setIsEditOpen(true); 
        } catch (error) {
            console.error("게시물 조회 오류:", error);
            alert('게시물 조회에 실패했습니다.');
        }
    };

    useEffect(() => {
        const loadBoardData = async () => {
            try {
                const boardData = await fetchBoard();
                if (boardData && Array.isArray(boardData)) {
                    setBoard(boardData);
                    setFilteredBoard(boardData);
                } else {
                    console.error("Board 데이터 형식 오류:", boardData);
                }
            } catch (error) {
                console.error("게시판 목록 불러오기 오류:", error);
            }
        };
        loadBoardData();
    }, []);

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
        const filtered = board.filter(item => {
            const matchesGame = selectedGame ? item.games === selectedGame : true;
            const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesGame && matchesSearch;
        });
        setFilteredBoard(filtered);
    }, [board, selectedGame, searchTerm]);

    const handleDelete = async (boardNum: number) => {
        const confirmDelete = window.confirm(`${("check_menu_delete")}`);
        if (confirmDelete) {
            try {
                await deleteBoardItem(boardNum);
                const updatedBoard = board.filter(item => item.board_num !== boardNum);
                setBoard(updatedBoard);
                setFilteredBoard(updatedBoard);
                alert(`${("menu_deleted")}`);
            } catch (error) {
                console.error("삭제 오류:", error);
                alert(`${('menu_deleted_failed')}`);
            }
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const closeEdit = () => setIsEditOpen(false);

    return (
        <div className={FaqManageStyle.pageContainer}>
            <div className={FaqManageStyle.pageContent}>
                <div className={FaqManageStyle.searchContainer}>
                    <div className={FaqManageStyle.gamesContainer}>
                        <h3 className={FaqManageStyle.gameTitle}>Game</h3>
                        <select
                            name="game"
                            className={FaqManageStyle.selectGame}
                            onChange={(e) => setSelectedGame(e.target.value)}
                            value={selectedGame}
                        >
                            <option value="">All</option>
                            {games.map((game, index) => (
                                <option key={index} value={game.name}>
                                    {game.name}
                                </option>
                            ))}
                        </select>
                        <h3 className={FaqManageStyle.search}>Search:</h3>
                        <input
                            className={FaqManageStyle.find}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className={FaqManageStyle.faqAdd} onClick={openModal}>{t('add_faq')}</button>
                    </div>
                </div>

                <div className={FaqManageStyle.tableContainer}>
                    <table className={FaqManageStyle.boardTable}>
                        <thead>
                            <tr>
                                <th>{t('post_number')}</th>
                                <th>{t('game_name')}</th>
                                <th>{t('category_name')}</th>
                                <th>{t('language')}({t('default_language')})</th>
                                <th>{t('registration_date')}</th>
                                <th>{t('option')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBoard.map((boardItem, index) => {
                                const created_date = boardItem.created_at
                                    ? new Date(boardItem.created_at).toLocaleString('ko-KR', { timeZone: 'UTC' })
                                    : ' ';
                                return (
                                    <tr key={index}>
                                        <td className={FaqManageStyle.boardNum}>{boardItem.board_num}</td>
                                        <td className={FaqManageStyle.game_name}>{boardItem.games}</td>
                                        <td className={FaqManageStyle.category_name}>{boardItem.category_name}</td>
                                        <td className={FaqManageStyle.title}>{boardItem.title}</td>
                                        <td className={FaqManageStyle.created_at}>{created_date}</td>
                                        <td className={FaqManageStyle.btnTable}>
                                            <button 
                                                className={FaqManageStyle.editBtn} 
                                                onClick={() => handleEdit(boardItem.board_num)}
                                            >
                                                {t('info')}
                                            </button>
                                            <button 
                                                className={FaqManageStyle.deleteBtn} 
                                                onClick={() => handleDelete(boardItem.board_num)}
                                            >
                                                {t('delete')}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && <Write closeModal={closeModal} />}
            {isEditOpen && selectedBoardItem && (
                <FaqEdit closeEdit={closeEdit} boardItem={selectedBoardItem} />
            )}
        </div>
    );
}

export default FaqManage;
