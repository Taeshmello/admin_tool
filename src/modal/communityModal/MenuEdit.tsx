    import { useState,useEffect } from 'react';
import MenuEditStyle from './MenuEdit.module.css';
import { fetchBoardUserStatus, fetchBoardAdminStatus, updateMenuStatus } from '../../utils/menu';

interface Board{
    CM_idx:number;
    service_code:string;
    SectionCode:string;
    LanguageCode:string;
    Title:string;
    UserStatus:string;
    AdminStatus:string;
}


interface EditProps {
    closeModal: () => void;
    menuItem: Board;

}

interface userStatus {
    check_status: string;
}
interface adminStatus {
    admin_status: string;
}

const MenuEdit: React.FC<EditProps> = ({ closeModal, menuItem }) => {
    const [status, setStatus] = useState<userStatus[]>([]);
    const [adminStatus, setAdminStatus] = useState<adminStatus[]>([]);
    const [selectedUserStatus, setSelectedUserStatus] = useState<string>(menuItem.UserStatus);
    const [selectedAdminStatus, setSelectedAdminStatus] = useState<string>(menuItem.AdminStatus);

    useEffect(() => {
        const loadStatusData = async () => {
            try {
                const statusData = await fetchBoardUserStatus();
                if (statusData && Array.isArray(statusData)) {
                    setStatus(statusData);
                } else {
                    console.error("상태 데이터 형식 오류:", statusData);
                }
            } catch (error) {
                console.error("상태 데이터 불러오기 오류:", error);
            }
        };

        loadStatusData();
    }, []);

    useEffect(() => {
        const loadAdminStatusData = async () => {
            try {
                const statusData = await fetchBoardAdminStatus();
                if (statusData && Array.isArray(statusData)) {
                    setAdminStatus(statusData);
                } else {
                    console.error("상태 데이터 형식 오류:", statusData);
                }
            } catch (error) {
                console.error("상태 데이터 불러오기 오류:", error);
            }
        };

        loadAdminStatusData();
    }, []);

    const updatedData = {
        CM_idx: menuItem.CM_idx,
        AdminStatus: selectedAdminStatus,
        UserStatus: selectedUserStatus,
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:5000/menu/statusUpdate`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
    
            if (response.ok) {
                alert('메뉴 상태가 수정되었습니다.');
                closeModal();
                window.location.reload();
            } else {
                const errorResponse = await response.json(); // 오류 응답을 가져오기
                console.error("메뉴 상태 수정 실패:", errorResponse);
                alert(`메뉴 상태 수정에 실패했습니다: ${errorResponse.error}`);
            }
        } catch (error) {
            console.error("메뉴 상태 수정 중 오류:", error);
            alert('메뉴 상태 수정 중 오류가 발생했습니다.');
        }
        console.log(updatedData);
    };

    return (
        <div className={MenuEditStyle.modal}>
            <div className={MenuEditStyle.modalContent}>
                <input type="text" className={MenuEditStyle.select} placeholder={menuItem.service_code} disabled />
                <input type="text" className={MenuEditStyle.select} placeholder={menuItem.Title} disabled />
                <input type="text" className={MenuEditStyle.select} placeholder={menuItem.SectionCode} disabled />
                <input type="text" className={MenuEditStyle.select} placeholder={menuItem.LanguageCode} disabled />
                <table className={MenuEditStyle.verticalTable}>
                    <tbody>
                        <tr>
                            <th>공개/비공개</th>
                            <td>
                                <select
                                    name="status"
                                    value={selectedUserStatus}
                                    onChange={(e) => setSelectedUserStatus(e.target.value)}
                                >
                                    {status.map((status, index) => (
                                        <option key={index} value={status.check_status}>
                                            {status.check_status}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>관리자전용</th>
                            <td>
                                <select
                                    name="adminStatus"
                                    value={selectedAdminStatus}
                                    onChange={(e) => setSelectedAdminStatus(e.target.value)}
                                >
                                    {adminStatus.map((admin, index) => (
                                        <option key={index} value={admin.admin_status}>
                                            {admin.admin_status}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className={MenuEditStyle.btnContainer}>
                    <button className={MenuEditStyle.close} onClick={closeModal}>닫기</button>
                    <button className={MenuEditStyle.save} onClick={handleUpdate}>수정</button>
                </div>
            </div>
        </div>
    );
};

export default MenuEdit;