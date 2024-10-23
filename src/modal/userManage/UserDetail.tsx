import React, { useState, useEffect } from "react";
import UserDetailStyles from './UserDetail.module.css';
import { fetchGames, userPermissions, assignPermissions, deletePermissions, fetchUserPermissionGames } from "../../utils/api";
import { useTranslation } from "react-i18next";

interface User {
    idx: number;
    id: string;
}

interface Permission {
    permissions: string;
    id: number;
}

interface DetailProps {
    closeModal: () => void;
    user: User | null;
}


interface UserGame {
    game_name: string;
    permission_name: string;
}   

const UserDetail: React.FC<DetailProps> = ({ closeModal, user }) => {
    const [games, setGames] = useState<{ name: string; id: string }[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<boolean[]>([]);
    const [allSelected, setAllSelected] = useState(false);
    const [selectedGameId, setSelectedGameId] = useState<string>('');
    const [userGames, setUserGames] = useState<UserGame[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        const loadGames = async () => {
            try {
                const gameList = await fetchGames();
                setGames(gameList);
            } catch (error) {
                console.error('게임 목록을 불러오는 데 실패했습니다:', error);
            }
        };

        const loadPermissions = async () => {
            if (!user) return;
            try {
                const permissionsList: { permissions: string; id?: number }[] = await userPermissions();
                const permissionsWithId: Permission[] = permissionsList.map((perm, index) => ({
                    permissions: perm.permissions,
                    id: index + 1,
                }));
                setPermissions(permissionsWithId);

                const currentPermissions = permissionsWithId.map(perm =>
                    permissionsList.some(userPerm => userPerm.permissions === perm.permissions)
                );
                setSelectedPermissions(currentPermissions);
                setAllSelected(currentPermissions.every(Boolean));
            } catch (error) {
                console.error('권한 목록을 불러오는 데 실패했습니다:', error);
            }


        };

        const loadUserGames = async () => {
            if (!user) return;
            try {
                const userGameList = await fetchUserPermissionGames(user.idx);
                setUserGames(userGameList);
            } catch (error) {
                console.error('유저가 보유한 권한 게임을 불러오는 데 실패했습니다:', error);
            }
        };

        loadGames();
        loadPermissions();
        loadUserGames();
    }, [user]);

    const handleSelectAll = () => {
        const newSelection = selectedPermissions.map(() => !allSelected);
        setSelectedPermissions(newSelection);
        setAllSelected(!allSelected);
    };

    const handlePermissionChange = (index: number) => {
        const newSelection = [...selectedPermissions];
        newSelection[index] = !newSelection[index];
        setSelectedPermissions(newSelection);
    };

    const handleGameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGame = games.find(game => game.name === event.target.value);
        setSelectedGameId(selectedGame ? selectedGame.id : '');
    };

    const handleDeletePermissions = async () => {
        if (!user || !selectedGameId) return;

        const selectedIds = permissions
            .filter((_, index) => selectedPermissions[index])
            .map(permission => permission.id);

        try {
            for (const id of selectedIds) {
                await deletePermissions({ userId: user.idx, gameId: Number(selectedGameId), permissionId: id });
            }
            setSelectedPermissions(new Array(permissions.length).fill(false));
            setAllSelected(false);
            alert(`${t('selected_per_delete')}`);
            window.location.reload()
        } catch (error) {
            console.error('권한 삭제 중 오류 발생:', error);
            alert(`${t('deleted_per_failed')}`);
        }
    };

    const handleSavePermissions = async () => {
        if (!user || !user.idx) {
            return;
        }

        const selectedIds = permissions
            .filter((_, index) => selectedPermissions[index])
            .map(permission => Number(permission.id));

        const requestBody: any = {
            userId: user.idx,
            gameId: Number(selectedGameId),
            permissions: selectedIds,
        };

        try {
            await assignPermissions(requestBody);
            alert(`${t('per_saved')}`);
            window.location.reload()
        } catch (error) {
            console.error('권한 저장 중 오류 발생:', error);
            alert(`${t('per_saved_failed')}`);
        }
    };

    return (
        <div className={UserDetailStyles.modal}>
            <div className={UserDetailStyles.modalContent}>
                {/* User ID */}
                <div className={UserDetailStyles.userId}>
                    <label>{t('userId')}:</label>
                    <span>{user?.id}</span>
                </div>

                {/* 유저가 권한을 가진 게임 목록 */}
                <div className={UserDetailStyles.userGames}>
                    <label>{t('userGames')}:</label>
                    {userGames.length > 0 ? (
                        <div className={UserDetailStyles.ownedGame}>
                            {Array.from(new Set(userGames.map(game => game.game_name))).map((gameName, index) => (
                                <div className={UserDetailStyles.perGames} key={index}>
                                    {gameName}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <span>{t('noGamesWithPermissions')}</span>
                    )}
                </div>

                <div className={UserDetailStyles.ownedGames}>
                    <select className={UserDetailStyles.gameSelect} onChange={handleGameChange}>
                        <option value="">{t('select_game')}</option>
                        {games.map((game, index) => (
                            <option key={index} value={game.name}>
                                {game.name}
                                </option>
                            ))}
                    </select>
                </div>

                <div className={UserDetailStyles.perActions}>
                    <button className={UserDetailStyles.gameButton} onClick={handleSelectAll}>
                        {allSelected ? `${t('allselect_off')}` : `${t('all_select')}`}
                    </button>
                    <button className={UserDetailStyles.gameButton} onClick={handleDeletePermissions}>
                        {t('delete_per')}
                    </button>
                </div>

                <div className={UserDetailStyles.permissions}>
                    <h4>{t("permission")}</h4>
                    {permissions.map((permission, index) => (
                        <div className="permission-item" key={permission.id}>
                            <input
                                type="checkbox"
                                checked={selectedPermissions[index]}
                                onChange={() => handlePermissionChange(index)}
                            />
                            {permission.permissions}
                        </div>
                    ))}
                </div>

                <div className={UserDetailStyles.actions}>
                    <button className={UserDetailStyles.cancelButton} onClick={closeModal}>
                        {t('close')}
                    </button>
                    <button className={UserDetailStyles.saveButton} onClick={handleSavePermissions}>
                        {t('save')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
