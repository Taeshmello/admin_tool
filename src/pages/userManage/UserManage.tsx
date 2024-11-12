import React, { useEffect} from 'react';
import UserManageStyle from './UserManage.module.css';
import { fetchUserData, fetchGameGenres, fetchGames } from '../../utils/api';
import UserDetail from '../../modal/userManage/UserDetail';
import { useTranslation } from 'react-i18next';
import { atom, useAtom } from 'jotai';

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


const usersAtom = atom<User[]>([]);
const filteredUsersAtom = atom<User[]>([]);
const searchTermAtom = atom<string>('');
const selectedUserAtom = atom<User | null>(null);
const isModalOpenAtom = atom<boolean>(false);
const genresAtom = atom<Genre[]>([]);
const gamesAtom = atom<Game[]>([]);
const selectedGenreAtom = atom<string>('');
const selectedGameAtom = atom<string>('');

const UserManage: React.FC = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useAtom(usersAtom);
    const [filteredUsers, setFilteredUsers] = useAtom(filteredUsersAtom);
    const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
    const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);
    const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
    const [genres, setGenres] = useAtom(genresAtom);
    const [games, setGames] = useAtom(gamesAtom);
    const [selectedGenre, setSelectedGenre] = useAtom(selectedGenreAtom);
    const [selectedGame, setSelectedGame] = useAtom(selectedGameAtom);

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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={UserManageStyle.pageContainer}>
            <div className={UserManageStyle.pageContent}>
                <div className={UserManageStyle.userContainer}>
                <h3 className={UserManageStyle.searchTitle}>{t('search')}</h3>
                    <select
                        name="genre"
                        className={UserManageStyle.genreSearch}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        value={selectedGenre}
                    >
                        <option value="">{t('all')}</option>
                        {genres.map((genre, index) => (
                            <option key={index} value={genre.genre_name}>
                                {genre.genre_name}
                            </option>
                        ))}
                    </select>
                    <select
                        name="game"
                        className={UserManageStyle.gameSearch}
                        onChange={(e) => setSelectedGame(e.target.value)}
                        value={selectedGame}
                    >
                        <option value="">{t('all')}</option>
                        {games.map((game, index) => (
                            <option key={index} value={game.name}>
                                {game.name}
                            </option>
                        ))}
                    </select>
                    <div className={UserManageStyle.userSearch}>
                        
                        <input
                        className={UserManageStyle.searchInput}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={t('search_placeholder')}
                        />
                    </div>
                </div>
                <div className={UserManageStyle.tableContainer}>
                    <table className={UserManageStyle.userTable}>
                        <thead>
                            <tr>
                                {/* <th>{t('registration_number')}</th> */}
                                <th>{t('user_id')}</th>
                                <th>{t('registration_date')}</th>
                                <th>{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => {
                                const signupDate = user.signup_date
                                    ? new Date(user.signup_date).toLocaleString('ko-KR')
                                    : ' ';
                                return (
                                    <tr key={index}>
                                        {/* <td>{user.idx}</td> */}
                                        <td>{user.id}</td>
                                        <td>{signupDate}</td>
                                        <td>
                                            <button className={UserManageStyle.editBtn} onClick={() => {
                                                setSelectedUser(user);
                                                openModal();
                                            }}>{t('edit')}</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && selectedUser && (
                <UserDetail
                    closeModal={closeModal}
                    user={selectedUser}
                />
            )}
        </div>
    );
};

export default UserManage;
