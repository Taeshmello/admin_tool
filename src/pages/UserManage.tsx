import React, { useEffect, useState } from 'react';
import './UserManage.css';
import { fetchUserData, fetchGameGenres, fetchGames } from '../utils/api';
import EditModal from '../components/Popup';

interface User {
    id: string;
    signup_date: string;
    // 예시로 추가한 필드
    game: string;
}

interface Game {
    name: string;
    genre_name: string;
}

interface Genre {
    genre_name: string;
}

const UserManage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const [selectedGame, setSelectedGame] = useState<string>('');

    // 사용자 목록을 불러오는 함수
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const data = await fetchUserData();
                if (data && Array.isArray(data)) {
                    setUsers(data);
                    setFilteredUsers(data); // 초기에는 모든 사용자 표시
                } else {
                    console.error("유저 데이터 형식 오류:", data);
                }
            } catch (error) {
                console.error("유저 목록 불러오기 오류:", error);
            }
        };

        loadUserData();
    }, []);

    // 게임 장르 및 게임 목록을 불러오는 함수
    useEffect(() => {
        const loadGameData = async () => {
            try {
                const genresData = await fetchGameGenres();
                const gamesData = await fetchGames();
                if (Array.isArray(genresData)) {
                    setGenres(genresData);
                } else {
                    console.error("게임 장르 데이터 형식 오류:", genresData);
                }
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

    // 검색어가 변경될 때마다 필터링
    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const filtered = users.filter(user =>
            user.id.toLowerCase().includes(lowercasedSearchTerm)
        );
        setFilteredUsers(filtered);
    }, [searchTerm, users]);

    // 장르 또는 게임이 변경될 때 필터링
    // useEffect(() => {
    //     let filtered = users;
    //     if (selectedGenre) {
    //         filtered = filtered.filter(user =>
    //             games.some(game => game.name === user.game && game.genre_name === selectedGenre)
    //         );
    //     }
    //     if (selectedGame) {
    //         filtered = filtered.filter(user => user.game === selectedGame);
    //     }
    //     setFilteredUsers(filtered);
    // }, [selectedGenre, selectedGame, games, users]);

    return (
        <div className="page-container">
            <div className="page-content">
                <div className='user-container'>
                    <h3 className='game-title'>Game</h3>
                    <select
                        name="genre"
                        className='select'
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        value={selectedGenre}
                    >
                        <option value="">All</option>
                        {genres.map((genre, index) => (
                            <option key={index} value={genre.genre_name}>
                                {genre.genre_name}
                            </option>
                        ))}
                    </select>
                    <select
                        name="game"
                        className='select'
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
                    <div className='user-search'>
                        <h3 className='search-title'>Search:</h3>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="table-container">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>유저 ID</th>
                                <th>등록일</th>
                                <th>변경</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => {
                                const signupDate = user.signup_date
                                    ? new Date(user.signup_date).toLocaleString()
                                    : ' ';
                                return (
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td>{signupDate}</td>
                                        <td>
                                            <button className="edit-btn" onClick={() => setIsModalOpen(true)}>수정</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <EditModal
                        visible={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onOk={() => setIsModalOpen(false)}
                    />
                </div>
            </div>
        </div>
    );
}

export default UserManage;
