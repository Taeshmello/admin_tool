import MenuAddStyle from './MenuAdd.module.css';
import { fetchBoardAdminStatus, fetchBoardUserStatus, fetchServiceCode, fetchMenuName } from '../utils/menu';
import { useState, useEffect } from 'react';
interface userStatus {
    check_status: string;
}
interface adminStatus {
    admin_status: string;
}
interface serviceCode {
    service_idx:number;
    service_code: string;
}
interface menuName {
    menu_name: string;
}
interface AddProps {
    closeAdd: () => void;
}
const MenuAdd: React.FC<AddProps> = ({ closeAdd }) => {
    const [status, setStatus] = useState<userStatus[]>([]);
    const [adminStatus, setAdminStatus] = useState<adminStatus[]>([]);
    const [serviceCode, setServiceCode] = useState<serviceCode[]>([]);
    const [menuName, setMenuName] = useState<menuName[]>([]);
    const [selectedUserStatus, setSelectedUserStatus] = useState<string>();
    const [selectedAdminStatus, setSelectedAdminStatus] = useState<string>();
    const [selectedServiceCode, setSelectedServiceCode] = useState<number | null>(null);
    const [selectedMenuName, setSelectedMenuName] = useState<string>();

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
        const loadAdminStatusData = async () => {
            try {
                const statusData = await fetchBoardAdminStatus();
                if (Array.isArray(statusData)) {
                    setAdminStatus(statusData);
                } else {
                    console.error("상태 데이터 형식 오류:", statusData);
                }
            } catch (error) {
                console.error("상태 데이터 불러오기 오류:", error);
            }
        };

        const loadServiceCode = async () => {
            try {
                const serviceCodeData = await fetchServiceCode();
                if (serviceCodeData && Array.isArray(serviceCodeData)) {
                    setServiceCode(serviceCodeData);
                } else {
                    console.error("서비스코드 형식 오류:", serviceCodeData);
                }
            } catch (error) {
                console.error("서비스 코드 불러오기 오류:", error)
            }
        };
        const loadMenuName = async () => {
            try {
                const menuNameData = await fetchMenuName();
                if (menuNameData && Array.isArray(menuNameData)) {
                    setMenuName(menuNameData);
                } else {
                    console.error("서비스코드 형식 오류:", menuNameData);
                }
            } catch (error) {
                console.error("서비스 코드 불러오기 오류:", error)
            }
        };

        loadServiceCode();
        loadMenuName();
        loadAdminStatusData();
        loadStatusData();
    }, []);


    const handleSave = async () => {
        if(selectedServiceCode == null || selectedMenuName == null || selectedAdminStatus == null || selectedUserStatus == null){
            alert("모든 항목을 선택해주세요.")
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/menu/insert", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ServiceCode: selectedServiceCode,
                    Title: selectedMenuName,
                    AdminStatus: selectedAdminStatus,
                    UserStatus: selectedUserStatus,
                }),
            });


            if (response.ok) {
                
                
                alert("FAQ 추가 완료");
                location.reload();
            } else {
                console.error("게시물 작성 실패:", response.statusText);
            }
        } catch (error) {
            console.error("게시물 작성 중 오류:", error);
        }
    }




    return (
        <div className={MenuAddStyle.modal}>
            <div className={MenuAddStyle.modalContent}>
                <select className={MenuAddStyle.selectMenu}
                    value={selectedServiceCode ?? ""}
                    onChange={(e) => setSelectedServiceCode(Number(e.target.value))}
                >
                    <option>서비스코드 선택</option>
                    {serviceCode.map((serviceCode, index) => (
                        <option key={index} value={serviceCode.service_idx}>
                            {serviceCode.service_code}
                        </option>
                    ))}
                </select>
                <select 
                className={MenuAddStyle.selectMenu}
                value={selectedMenuName}
                onChange={(e)=> setSelectedMenuName(e.target.value)}
                >
                    <option value="">메뉴 선택</option>
                    {menuName.map((menu_name, index)=>(
                        <option key={index} value={menu_name.menu_name}>
                            {menu_name.menu_name}
                        </option>
                    ))}
                </select>
                <select 
                className={MenuAddStyle.selectMenu}
                value={selectedAdminStatus}
                onChange={(e)=> setSelectedAdminStatus(e.target.value)}
                >
                    <option value="">관리자 전용 상태 선택</option>
                    {adminStatus.map((admin_status, index)=>(
                        <option key={index} value={admin_status.admin_status}>
                            {admin_status.admin_status}
                        </option>
                    ))}
                </select>
                <select 
                className={MenuAddStyle.selectMenu}
                value={selectedUserStatus}
                onChange={(e)=> setSelectedUserStatus(e.target.value)}
                >
                    <option value="">유저 공개/비공개 선택</option>
                    {status.map((status, index)=>(
                        <option key={index} value={status.check_status}>
                            {status.check_status}
                        </option>
                    ))}
                </select>


                <div className={MenuAddStyle.btnContent}>
                    <button className={MenuAddStyle.close} onClick={closeAdd}>닫기</button>
                    <button className={MenuAddStyle.saveBtn} onClick={handleSave}>저장</button>
                </div>
            </div>
        </div>
    )
}

export default MenuAdd;