import React, { useEffect, useState } from 'react';
import './User_details.css';
import { fetchGames, userPermissions } from '../utils/api';

const UserDetails: React.FC = () => {
  const [games, setGames] = useState<{ id: string; name: string }[]>([]);
  const [permissions, setPermissions] = useState<{ permissions: string }[]>([]);

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
      try {
        const permissionsList = await userPermissions();
        setPermissions(permissionsList);
      } catch (error) {
        console.error('권한 목록을 불러오는 데 실패했습니다:', error);
      }
    };

    loadGames();
    loadPermissions();
  }, []);

  return (
    <div className="modify-user-container">
      <h4>권한 보유 게임</h4>
      <div>
        {/* 여기에 게임 목록 표시할 수 있습니다. */}
      </div>

      <h4>게임명</h4>

      <select className="game-select">
        {games.map((game, index) => (
          <option key={index} value={game.id}>
            {game.name}
          </option>
        ))}
      </select>

      <div className="button-group">
        <button className="button">전체 선택</button>
        <button className="button">권한 삭제</button>
      </div>

      <h4>권한</h4>
      <div className="permissions">
        {permissions.map((permission) => (
          <div className="permission-item" key={permission.permissions}>
            <input type="checkbox" value={permission.permissions} />
            {permission.permissions}
          </div>
        ))}
      </div>

    </div>
  );
};

export default UserDetails;
