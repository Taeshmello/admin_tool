import React, { useEffect } from "react";
import UserDetailStyles from './UserDetail.module.css';
import {
    fetchGames,
    userPermissions,
    assignPermissions,
    deletePermissions,
    fetchUserPermissionGames,
} from "../../utils/api";
import { fetchPermissionsForGame } from '../../utils/user';
import { useTranslation } from "react-i18next";
import { atom, useAtom } from 'jotai';

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


const gamesAtom = atom<{ name: string; id: string }[]>([]);
const permissionsAtom = atom<Permission[]>([]);
const selectedPermissionsAtom = atom<boolean[]>([]);
const allSelectedAtom = atom<boolean>(false);
const selectedGameIdAtom = atom<string>('');
const userGamesAtom = atom<UserGame[]>([]);

interface UserGame {
    game_name: string;
    permission_name: string;
}

const UserDetail: React.FC<DetailProps> = ({ closeModal, user }) => {
    const [games, setGames] = useAtom(gamesAtom);
    const [permissions, setPermissions] = useAtom(permissionsAtom);
    const [selectedPermissions, setSelectedPermissions] = useAtom(selectedPermissionsAtom);
    const [allSelected, setAllSelected] = useAtom(allSelectedAtom);
    const [selectedGameId, setSelectedGameId] = useAtom(selectedGameIdAtom);
    const [userGames, setUserGames] = useAtom(userGamesAtom);
    const { t } = useTranslation();

    useEffect(() => {
        // 게임 목록을 불러오는 함수
        const loadGames = async () => {
            try {
                const gameList = await fetchGames();
                setGames(gameList);  // 게임 목록 상태 업데이트
            } catch (error) {
                console.error('게임 목록을 불러오는 데 실패했습니다:', error);
            }
        };

        // 사용자 권한 목록을 불러오는 함수
        const loadPermissions = async () => {
            if (!user) return;
            try {
                const permissionsList: { permissions: string; id?: number }[] = await userPermissions();
                // 권한 목록에 id 추가
                const permissionsWithId: Permission[] = permissionsList.map((perm, index) => ({
                    permissions: perm.permissions,
                    id: index + 1,
                }));
                setPermissions(permissionsWithId);  // 권한 목록 상태 업데이트
                setSelectedPermissions(new Array(permissionsWithId.length).fill(false)); // 선택된 권한 초기화
                setAllSelected(false); // '전체 선택' 상태 초기화
            } catch (error) {
                console.error('권한 목록을 불러오는 데 실패했습니다:', error);
            }
        };

        // 사용자가 보유한 게임과 권한을 불러오는 함수
        const loadUserGames = async () => {
            if (!user) return;
            try {
                const userGameList = await fetchUserPermissionGames(user.idx);
                setUserGames(userGameList);  // 사용자가 보유한 게임 및 권한 상태 업데이트
            } catch (error) {
                console.error('유저가 보유한 권한 게임을 불러오는 데 실패했습니다:', error);
            }
        };

        loadGames();
        loadPermissions();
        loadUserGames();
    }, [user, setGames, setPermissions, setUserGames]);

    // 특정 게임에 대한 권한을 불러오는 함수
    const loadPermissionsForGame = async (gameId: string) => {
        if (!user) return;
        try {
            const currentPermissions = new Array(permissions.length).fill(false);
            const userGamePermissions = await fetchPermissionsForGame(user.idx, gameId);

            // 사용자가 가진 권한에 해당하는 권한 ID를 선택된 권한 목록에 반영
            userGamePermissions.forEach((permId: number) => {
                const permissionIndex = permissions.findIndex(permission => permission.id === permId);
                if (permissionIndex !== -1) {
                    currentPermissions[permissionIndex] = true;  // 권한 선택
                }
            });

            setSelectedPermissions(currentPermissions);  // 권한 선택 상태 업데이트
        } catch (error) {
            console.error('권한 불러오기 중 오류 발생:', error);
        }
    };

    // 게임 선택 시 해당 게임의 권한을 불러오는 함수
    const handleGameChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGame = games.find(game => game.name === event.target.value);
        setSelectedGameId(selectedGame ? selectedGame.id : '');

        // 게임이 선택되면 해당 게임의 권한을 불러옴
        if (selectedGame?.id) {
            await loadPermissionsForGame(selectedGame.id);
        }
    };

    // '전체 선택' 체크박스를 클릭했을 때의 처리 함수
    const handleSelectAll = () => {
        const newSelection = selectedPermissions.map(() => !allSelected);
        setSelectedPermissions(newSelection);  // 권한 선택 상태 업데이트
        setAllSelected(!allSelected);  // 전체 선택 상태 반영
    };

    // 개별 권한 체크박스를 클릭했을 때의 처리 함수
    const handlePermissionChange = (index: number) => {
        const newSelection = [...selectedPermissions];
        newSelection[index] = !newSelection[index];  // 선택된 권한을 반전
        setSelectedPermissions(newSelection);  // 권한 선택 상태 업데이트
    };

    // 선택한 권한을 삭제하는 함수
    const handleDeletePermissions = async () => {
        if (!user || !selectedGameId) return;

        const selectedIds = permissions
            .filter((_, index) => selectedPermissions[index])
            .map(permission => permission.id);

        try {
            // 선택한 권한들 삭제
            for (const id of selectedIds) {
                await deletePermissions({ userId: user.idx, gameId: Number(selectedGameId), permissionId: id });
            }
            setSelectedPermissions(new Array(permissions.length).fill(false));  // 권한 선택 초기화
            setAllSelected(false);  // 전체 선택 초기화
            alert(`${t('selected_per_delete')}`);
            window.location.reload();
        } catch (error) {
            console.error('권한 삭제 중 오류 발생:', error);
            alert(`${t('deleted_per_failed')}`);  // 권한 삭제 실패 알림
        }
    };

    // 선택한 권한을 저장하는 함수
    const handleSavePermissions = async () => {
        if (!user || !user.idx || !selectedGameId) {
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
            // 권한 저장
            await assignPermissions(requestBody);
            alert(`${t('per_saved')}`);
            await loadPermissionsForGame(selectedGameId);  // 저장 후 권한 갱신
            closeModal()
        } catch (error) {
            console.error('권한 저장 중 오류 발생:', error);
            alert(`${t('per_saved_failed')}`);
        }
    };

    return (
        <div className={UserDetailStyles.modal}>
            <div className={UserDetailStyles.modalContent}>
                {/* 사용자 ID 표시 */}
                <div className={UserDetailStyles.userId}>
                    <label>{t('userId')}:</label>
                    <span>{user?.id}</span>
                </div>

                {/* 사용자가 보유한 게임 목록 표시 */}
                <div className={UserDetailStyles.userGames}>
                    <label>{t('userGames')}:</label>
                    {userGames.length > 0 ? (
                        <div className={UserDetailStyles.ownedGame}>
                            {Array.from(new Set(userGames.map(game => game.game_name))).map((gameName, index) => (
                                <div
                                    className={UserDetailStyles.perGames}
                                    key={index}>
                                    {gameName}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <span>{t('noGamesWithPermissions')}</span>
                    )}
                </div>

                {/* 게임 선택 드롭다운 */}
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

                {/* '전체 선택' 및 '삭제' 버튼 */}
                <div className={UserDetailStyles.perActions}>
                    <button className={UserDetailStyles.gameButton1} onClick={handleSelectAll}>
                        {allSelected ? `${t('allselect_off')}` : `${t('all_select')}`}
                    </button>
                    <button className={UserDetailStyles.gameButton2} onClick={handleDeletePermissions}>
                        {t('delete_per')}
                    </button>
                </div>

                {/* 권한 목록 */}
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

                {/* 취소 및 저장 버튼 */}
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
