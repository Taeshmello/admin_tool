import React, { useEffect, useState } from 'react';
import './UserManage.css';
import { fetchUserData, fetchGameGenres, fetchGames } from '../utils/api';
import EditModal from '../modal/Popup';

interface User {
    idx: number;
    id: string;
    signup_date: string;
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
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const [selectedGame, setSelectedGame] = useState<string>('');

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const data = await fetchUserData();
                if (data && Array.isArray(data)) {
                    setUsers(data);
                    setFilteredUsers(data);
                } else {
                    console.error("유저 데이터 형식 오류:", data);
                }
            } catch (error) {
                console.error("유저 목록 불러오기 오류:", error);
            }
        };

        loadUserData();
    }, []);

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

    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const filtered = users.filter(user =>
            user.id.toLowerCase().includes(lowercasedSearchTerm)
        );
        setFilteredUsers(filtered);
    }, [searchTerm, users]);

    return (
        <div className="page-container">
            <div className="page-content">
                <div className='user-container'>
                    <h3 className='game-title'>Game</h3>
                    <select
                        name="genre"
                        className='game-select'
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
                        className='game-select'
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
                                <th>등록 번호</th>
                                <th>유저 ID</th>
                                <th>등록일</th>
                                <th>변경</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => {
                                const signupDate = user.signup_date
                                    ? new Date(user.signup_date).toLocaleString('ko-KR')
                                    : ' ';
                                return (
                                    <tr key={index}>
                                        <td>{user.idx}</td>
                                        <td>{user.id}</td>
                                        <td>{signupDate}</td>
                                        <td>
                                            <button className="edit-btn" onClick={() => {
                                                setSelectedUser(user);
                                                setIsModalOpen(true);
                                            }}>수정</button>
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
                        user={selectedUser} // Pass the selected user to the modal
                    />
                </div>
            </div>
        </div>
    );
}

export default UserManage;
