import { useEffect } from 'react';
import MenuEditStyle from './MenuEdit.module.css';
import { fetchBoardUserStatus, fetchBoardAdminStatus } from '../../utils/menu';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import {useAtom } from 'jotai';
import { statusAtom,
    adminStatusAtom, 
    selectedUserStatusAtom, 
    selectedAdminStatusAtom 
} from '../../atoms/store';
import { ForumMenuDetailBoard } from '../../atoms/menu';

interface EditProps {
    closeModal: () => void;
    menuItem: ForumMenuDetailBoard;
}

const MenuEdit: React.FC<EditProps> = ({ closeModal, menuItem }) => {
    const [status, setStatus] = useAtom(statusAtom);
    const [adminStatus, setAdminStatus] = useAtom(adminStatusAtom);
    const [selectedUserStatus, setSelectedUserStatus] = useAtom(selectedUserStatusAtom);
    const [selectedAdminStatus, setSelectedAdminStatus] = useAtom(selectedAdminStatusAtom);
    const { t } = useTranslation();
    
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
        setSelectedUserStatus(menuItem.UserStatus);
        setSelectedAdminStatus(menuItem.AdminStatus);
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
    }, [setStatus, 
        setAdminStatus, 
        menuItem, 
        setSelectedUserStatus, 
        setSelectedAdminStatus]);
    
    const updatedData = {
        CM_idx: menuItem.CM_idx,
        AdminStatus: selectedAdminStatus,
        UserStatus: selectedUserStatus,
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put("http://localhost:5000/menu/statusUpdate", updatedData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                alert(`${t('menu_edited')}`);
                closeModal();
                window.location.reload();
            } else {
                const errorResponse = response.data;
                console.error("메뉴 상태 수정 실패:", errorResponse);
                alert(`${t("menu_edited_failed")} ${errorResponse.error}`);
            }
        } catch (error) {
            console.error("메뉴 상태 수정 중 오류:", error);
            alert(`${t('menu_edited_error')}`);
        }
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
                            <th>{t('show_select')}</th>
                            <td>
                                <select
                                    name="status"
                                    value={selectedUserStatus ?? ""}
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
                            <th>{t('admin_status')}</th>
                            <td>
                                <select
                                    name="adminStatus"
                                    value={selectedAdminStatus ?? ""}
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
                    <button className={MenuEditStyle.close} onClick={closeModal}>{t('close')}</button>
                    <button className={MenuEditStyle.save} onClick={handleUpdate}>{t('update')}</button>
                </div>
            </div>
        </div>
    );
};

export default MenuEdit;
