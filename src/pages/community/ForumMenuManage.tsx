import ForumMenuManageStyle from './ForumMenuManage.module.css';
import { useEffect } from 'react';
import { fetchMenuBoard, fetchBoardUserStatus, fetchMenuBoardItem, fetchServiceCode } from '../../utils/menu';
import MenuEdit from '../../modal/communityMenuModal/MenuEdit';
import MenuAdd from '../../modal/communityMenuModal/MenuAdd';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { isModalOpenAtom } from '../../atoms/store';
import {
    statusAtom,
} from '../../atoms/store';
import {
    ForumMenuBoardAtom,
    filteredForumMenuBoardAtom,
    selectedForumMenuItemAtom,
    serviceCodeAtom,
    selectedServiceCodeAtom,
    isAddOpenAtom
} from '../../atoms/menu';



const ForumMenuManage: React.FC = () => {
    const [board, setBoard] = useAtom(ForumMenuBoardAtom);
    const [filteredBoard, setFilteredBoard] = useAtom(filteredForumMenuBoardAtom);
    const [status, setStatus] = useAtom(statusAtom);
    const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
    const [selectedMenuItem, setSelectedBoardMenuItem] = useAtom(selectedForumMenuItemAtom);
    const [isAddOpen, setIsAddOpen] = useAtom(isAddOpenAtom);
    const [serviceCode, setServiceCode] = useAtom(serviceCodeAtom);
    const [selectedServiceCode, setSelectedServiceCode] = useAtom(selectedServiceCodeAtom);
    const { t } = useTranslation();

    useEffect(() => {
        const loadMenuData = async () => {
            try {
                const boardData = await fetchMenuBoard();
                if (boardData && Array.isArray(boardData)) {
                    setBoard(boardData);
                    setFilteredBoard(boardData);
                } else {
                    console.error("Board 데이터 형식 오류:", boardData);
                }
            } catch (error) {
                console.error("게시판 목록 불러오기 오류:", error);
            }
        };

        const loadServiceCodeData = async () => {
            try {
                const servicecodeData = await fetchServiceCode();
                if (servicecodeData && Array.isArray(servicecodeData)) {
                    setServiceCode(servicecodeData);
                }
            } catch (error) {
                console.error("서비스코드 목록 불러오기 오류:", error);
            }
        };

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
        loadMenuData();
        loadServiceCodeData();
    }, [setBoard, setFilteredBoard, setServiceCode, setStatus]);

    useEffect(() => {
        const filtered = board.filter(item => {
            const matchesServiceCode = selectedServiceCode ? item.service_code === selectedServiceCode : true;
            return matchesServiceCode;
        });
        setFilteredBoard(filtered);
    }, [board, selectedServiceCode, setFilteredBoard]);

    const handelEdit = async (CM_idx: number) => {
        try {
            const menuItem = await fetchMenuBoardItem(CM_idx);
            setSelectedBoardMenuItem(menuItem);
            setIsModalOpen(true);
        } catch (error) {
            console.error("메뉴 조회 오류", error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openAdd = () => {
        setIsAddOpen(true);
    };

    const closeAdd = () => {
        setIsAddOpen(false);
    };

    return (
        <div className={ForumMenuManageStyle.pageContainer}>
            <div className={ForumMenuManageStyle.pageContent}>
                <div className={ForumMenuManageStyle.searchContainer}>
                    <div className={ForumMenuManageStyle.scFind}>
                        <h3 className={ForumMenuManageStyle.scTitle}>ServiceCode:</h3>
                        <select
                            onChange={(e) => setSelectedServiceCode(e.target.value)}
                            value={selectedServiceCode}
                            className={ForumMenuManageStyle.scContainer}
                        >
                            <option value="">All</option>
                            {serviceCode.map((sc, index) => (
                                <option key={index} value={sc.service_code}>
                                    {sc.service_code}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className={ForumMenuManageStyle.add} onClick={openAdd}>{t('add_menu')}</button>
                </div>

                <div className={ForumMenuManageStyle.tableContainer}>
                    <table className={ForumMenuManageStyle.boardTable}>
                        <thead>
                            <tr>
                                <th>{t('post_number')}</th>
                                <th>{t('service_code')}</th>
                                <th>{t('title')}</th>
                                <th>{t('registration_date')}</th>
                                <th>{t('option')}</th>
                                <th>{t('status')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBoard.map((boardItem, index) => {
                                const created_date = boardItem.CreatedAt
                                    ? new Date(boardItem.CreatedAt).toLocaleString('ko-KR', { timeZone: "UTC" })
                                    : ' ';
                                return (
                                    <tr key={index}>
                                        <td>{boardItem.CM_idx}</td>
                                        <td>{boardItem.service_code}</td>
                                        <td>{boardItem.Title}</td>
                                        <td>{created_date}</td>
                                        <td><button className={ForumMenuManageStyle.editBtn} onClick={() => { handelEdit(boardItem.CM_idx) }} >{t('edit')}</button></td>
                                        <td>
                                            <select name="status" className={ForumMenuManageStyle.selectStatus}>
                                                {status.map((status, index) => (
                                                    <option key={index} value={status.check_status}>
                                                        {status.check_status}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && <MenuEdit closeModal={closeModal} menuItem={selectedMenuItem} />}
            {isAddOpen && <MenuAdd closeAdd={closeAdd} />}
        </div>
    );
}

export default ForumMenuManage;
