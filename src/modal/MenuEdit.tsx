import { useState,useEffect } from 'react';
import MenuEditStyle from './MenuEdit.module.css';
import { fetchBoardUserStatus } from '../utils/menu';

interface Board{
    CM_idx:number;
    service_code:string;
    SectionCode:string;
    LanguageCode:string;
    Title:string;
    UserStatuse:string;
    AdminStatus:string;
}


interface EditProps {
    closeModal: () => void;
    menuItem: Board;

}

interface userStatus {
    check_status: string;
}

const MenuEdit:React.FC<EditProps> = ({closeModal, menuItem}) => {
    const [status, setStatus] = useState<userStatus[]>([]);

    useEffect(()=>{
        const loadStatusData = async () => {
            try{
                const statusData = await fetchBoardUserStatus()
                if (statusData && Array.isArray(statusData)){
                    setStatus(statusData)
                }else{
                    console.error("상태 데이터 형식 오류:",statusData)
                }
            }catch(error){
                console.error("상태 데이터 불러오기 오류:", error)
            }
        }

        loadStatusData();

    },[])
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
                                <select name="status">
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
                                <select name="adminStatus">
                                    {status.map((admin, index) => (
                                        <option key={index} value={admin.check_status}>
                                            {admin.check_status}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className={MenuEditStyle.btnContainer}>
                    <button className={MenuEditStyle.close} onClick={closeModal}>닫기</button>
                    <button className={MenuEditStyle.save}>수정</button>
                </div>
            </div>
        </div>
    );
}

export default MenuEdit;