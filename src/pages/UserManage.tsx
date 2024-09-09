import './UserManage.css';

let date = new Date();

const UserManage = () => {
    return (
        <div className="page-container">
            <div className="page-content">
                <div className='user-container'>
                    <h3>Game</h3>
                    <select name="" className='select'>
                        <option value="">All</option>
                        <option value="">PC</option>
                        <option value="">ios</option>
                        <option value="">Android</option>
                    </select>
                    <select name="" className='select'>
                        <option value="">All</option>
                        <option value="">RPG</option>
                        <option value="">FPS</option>
                        <option value="">Casual action</option>
                        <option value="">MMORPG</option>
                        <option value="">SLG</option>
                        <option value="">Action</option>
                        <option value="">Casual</option>
                        <option value="">Casino,Card,Simulation Gambling</option>
                        <option value="">MORPG</option>
                    </select>
                    <select name="" className='select' id='games'>
                        <option value="">All</option>
                        <option value="">KRITIKA:ZERO</option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                    <div className='user-search'>
                        <h3 className='search-title'>Search:</h3>
                        <input type="text" />
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
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserManage;
