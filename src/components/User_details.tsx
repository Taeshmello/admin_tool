import React, { useState, useEffect } from 'react';
import './User_details.css'; 

interface Game {
  id: number;
  name: string;
  permissions: string[]; // 게임과 관련된 권한
}

const UserDetails: React.FC = () => {
  const [userId, setUserId] = useState<string>('');  // 사용자 ID
  const [games, setGames] = useState<Game[]>([]);     // 게임 목록
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const permissions = [
    '사용자 관리',
    '고객센터 관리',
    '메인화면 관리',
  ];

  useEffect(() => {
    // 실제 API 호출을 통해 userId와 games 데이터를 가져올 수 있습니다.
    setUserId('');
    setGames([
      { id: 1, name: 'KRITIKA:ZERO', permissions: [] },
      { id: 2, name: 'ATLANTIKA Global', permissions: [] },
      { id: 3, name: 'C9 Global', permissions: [] },
    ]);
    setSelectedGame('Select Games');
  }, []);

  const handleSelectAll = () => {
    setSelectedPermissions(permissions);
  };

  const handleRemoveSelected = () => {
    setSelectedPermissions([]);
  };

  const handleCheckboxChange = (permission: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  // 선택된 권한에 따라 게임 필터링
  const displayedGames = selectedPermissions.length > 0
    ? games.filter(game =>
        game.permissions.some(permission => selectedPermissions.includes(permission))
      )
    : [];

  return (
    <div className="modify-user-container">
      <h3>유저 아이디: <span className="user-id">{userId || 'Loading...'}</span></h3>
      <h4>권한 보유 게임</h4>
      <div>
        {displayedGames.length > 0 ? (
          displayedGames.map(game => (
            <span key={game.id} className="game-tag">
              {game.name}
            </span>
          ))
        ) : (
          <span>권한이 있는 게임이 없습니다.</span>
        )}
      </div>

      <h4>게임명</h4>
      <select
        value={selectedGame}
        onChange={(e) => setSelectedGame(e.target.value)}
        className="game-select"
        
      >
        {games.map(game => (
          <option key={game.id} value={game.name}>
            {game.name}
          </option>
        ))}
      </select>

      <div className="button-group">
        <button onClick={handleSelectAll} className="button">전체 선택</button>
        <button onClick={handleRemoveSelected} className="button">권한 삭제</button>
      </div>

      <h4>권한</h4>
      <div className="permissions">
        {permissions.map(permission => (
          <label key={permission} className="permission-label">
            <input
              type="checkbox"
              checked={selectedPermissions.includes(permission)}
              onChange={() => handleCheckboxChange(permission)}
            />
            {permission}
          </label> 
        ))}
      </div>
    </div>
  );
};

export default UserDetails;
