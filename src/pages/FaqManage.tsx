import './FaqManage.css'
import { useState, useEffect } from 'react';
import { fetchGames, fetchBoard, deleteBoardItem } from '../utils/api';
import { Write } from '../modal/Write';
import { FaqEdit } from '../modal/FaqEdit';


interface Game {
    name: string;
    genre_name: string;
}


interface Board {
    board_num: number,
    games: string,
    category_name: string,
    title: string,
    created_at: string,
}


const FaqManage = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [board, setBoard] = useState<Board[]>([]);
    const [filteredBoard, setFilteredBoard] = useState<Board[]>([]);
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

    useEffect(() => {

        const loadBoardData = async () => {
            try {
                const boardData = await fetchBoard();
                if (boardData && Array.isArray(boardData)) {
                    setBoard(boardData);
                    setFilteredBoard(boardData);
                } else {
                    console.error("Board 데이터 형식 오류:", boardData)
                }
            } catch (error) {
                console.error("게시판 목록 불러오기 오류:", error)
            }
        }
        loadBoardData();
    }, [])


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

    const handleDelete = async (boardNum: number) => {
        const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
        if (confirmDelete) {
            try {
                await deleteBoardItem(boardNum);
                // 삭제 후 게시판 데이터 다시 불러오기
                const updatedBoard = board.filter(item => item.board_num !== boardNum);
                setBoard(updatedBoard);
                setFilteredBoard(updatedBoard);
                alert('게시물이 삭제되었습니다.');
            } catch (error) {
                console.error("삭제 오류:", error);
                alert('게시물 삭제에 실패했습니다.');
            }
        }
    };


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openEdit = () => {
        setIsEditOpen(true);
    };

    const closeEdit = () => {
        setIsEditOpen(false);
    };

    return (
        <div className="page-container">
            <div className="page-content">
                <div className='search-container'>
                    <div className='games-container'>
                        <h3 className='game-title'>Game</h3>
                        <select
                            name="game"
                            className='select-game'
                            onChange={(e) => setSelectedGame(e.target.value)}
                            value={selectedGame}>
                            <option value="">All</option>
                            {games.map((game, index) => (
                                <option key={index} value={game.name}>
                                    {game.name}
                                </option>
                            ))}
                        </select>
                        <h3 className='search'>Search:</h3>
                        <input
                        className='find'
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className='faqAdd' onClick={openModal}>FAQ 추가</button>
                    </div>
                </div>

                <div className="table-container">
                    <table className="board-table">
                        <thead>
                            <tr>
                                <th>글 번호</th>
                                <th>게임명</th>
                                <th>카테고리명</th>
                                <th>제목(기본언어)</th>
                                <th>등록일</th>
                                <th>옵션</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBoard.map((board, index) => {
                                const created_date = board.created_at
                                    ? new Date(board.created_at).toLocaleString('ko-KR', { timeZone: 'UTC' })
                                    : ' ';
                                return (
                                    <tr key={index}>
                                        <td className='board-num'>{board.board_num}</td>
                                        <td className='game_name'>{board.games}</td>
                                        <td className='category_name'>{board.category_name}</td>
                                        <td className='title'>{board.title}</td>
                                        <td className='created_at'>{created_date}</td>
                                        <td className='btnTable'>
                                            <button className='editBtn' onClick={openEdit}>상세</button>
                                            <button className='deleteBtn' onClick={() => handleDelete(board.board_num)}>삭제</button>
                                        </td>
                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>

                </div>
            </div>
            {isModalOpen && <Write closeModal={closeModal} />}
            {isEditOpen && <FaqEdit closeEdit={closeEdit} />}
        </div>
    )
}

export default FaqManage;