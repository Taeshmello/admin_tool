import React, { useEffect, useState } from 'react';
import './User_details.css';
import { fetchGames, userPermissions, assignPermissions, deletePermissions } from '../utils/api';

interface User {
    idx: number;
}

interface Permission {
    permissions: string;
    id: number;
}

interface UserDetailsProps {
    user: User | null;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
    const [games, setGames] = useState<{ name: string; id: string }[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<boolean[]>([]);
    const [allSelected, setAllSelected] = useState(false);
    const [selectedGameId, setSelectedGameId] = useState<string>('');

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

        loadGames();
        loadPermissions();
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
            alert('선택된 권한이 삭제되었습니다.');
        } catch (error) {
            console.error('권한 삭제 중 오류 발생:', error);
            alert('권한 삭제에 실패했습니다.');
        }
    };

    const handleSavePermissions = async () => {
        if (!user || !user.idx) {
            alert('사용자 ID를 불러오는 데 실패했습니다.');
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
            alert('권한이 성공적으로 저장되었습니다.');
        } catch (error) {
            console.error('권한 저장 중 오류 발생:', error);
            alert('권한 저장에 실패했습니다.');
        }
    };

    return (
        <div className="modify-user-container">
            <h4>권한 보유 게임</h4>
            <h4>게임명</h4>

            <select className="game-select" onChange={handleGameChange}>
                {games.map((game, index) => (
                    <option key={index} value={game.name}>
                        {game.name}
                    </option>
                ))}
            </select>

            <div className="button-group">
                <button className="button" onClick={handleSelectAll}>
                    {allSelected ? '전체 선택 해제' : '전체 선택'}
                </button>
                <button className="button" onClick={handleDeletePermissions}>
                    권한 삭제
                </button>
                <button className="button" onClick={handleSavePermissions}>
                    저장
                </button>
            </div>

            <h4>권한</h4>
            <div className="permissions">
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
        </div>
    );
};

export default UserDetails;