import MenuAddStyle from './MenuAdd.module.css';
import { fetchBoardAdminStatus, fetchBoardUserStatus, fetchServiceCode, fetchMenuName } from '../../utils/menu';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { atom, useAtom } from 'jotai';

interface UserStatus {
    check_status: string;
}

interface AdminStatus {
    admin_status: string;
}

interface ServiceCode {
    service_idx: number;
    service_code: string;
}

interface MenuName {
    section: number;
    menu_name: string;
    menu_code: string;
    lang_code: string;
}

interface AddProps {
    closeAdd: () => void;
}


const statusAtom = atom<UserStatus[]>([]);
const adminStatusAtom = atom<AdminStatus[]>([]);
const serviceCodeAtom = atom<ServiceCode[]>([]);
const menuNameAtom = atom<MenuName[]>([]);
const selectedUserStatusAtom = atom<string | undefined>(undefined);
const selectedAdminStatusAtom = atom<string | undefined>(undefined);
const selectedServiceCodeAtom = atom<number | null>(null);
const selectedMenuNameAtom = atom<number[]>([]);

const MenuAdd: React.FC<AddProps> = ({ closeAdd }) => {
    const [status, setStatus] = useAtom(statusAtom);
    const [adminStatus, setAdminStatus] = useAtom(adminStatusAtom);
    const [serviceCode, setServiceCode] = useAtom(serviceCodeAtom);
    const [menuName, setMenuName] = useAtom(menuNameAtom);
    const [selectedUserStatus, setSelectedUserStatus] = useAtom(selectedUserStatusAtom);
    const [selectedAdminStatus, setSelectedAdminStatus] = useAtom(selectedAdminStatusAtom);
    const [selectedServiceCode, setSelectedServiceCode] = useAtom(selectedServiceCodeAtom);
    const [selectedMenuName, setSelectedMenuName] = useAtom(selectedMenuNameAtom);
    const { t } = useTranslation();

    useEffect(() => {
        const loadStatusData = async () => {
            try {
                const statusData = await fetchBoardUserStatus();
                if (Array.isArray(statusData)) {
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
                if (Array.isArray(serviceCodeData)) {
                    setServiceCode(serviceCodeData);
                } else {
                    console.error("서비스코드 형식 오류:", serviceCodeData);
                }
            } catch (error) {
                console.error("서비스 코드 불러오기 오류:", error);
            }
        };

        const loadMenuName = async () => {
            try {
                const menuNameData = await fetchMenuName();
                if (Array.isArray(menuNameData)) {
                    setMenuName(menuNameData);
                } else {
                    console.error("메뉴 이름 형식 오류:", menuNameData);
                }
            } catch (error) {
                console.error("메뉴 이름 불러오기 오류:", error);
            }
        };

        loadServiceCode();
        loadMenuName();
        loadAdminStatusData();
        loadStatusData();
    }, [setStatus, setAdminStatus, setServiceCode, setMenuName]);

    const handleSave = async () => {
        if (selectedServiceCode == null || selectedMenuName.length === 0 || selectedAdminStatus == null || selectedUserStatus == null) {
            alert(`${t('plz_fill_space')}`);
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/menu/insert", {
                ServiceCode: selectedServiceCode,
                Classify: selectedMenuName[0],
                SectionCode: selectedMenuName[2],
                LanguageCode: selectedMenuName[3], 
                Title: selectedMenuName[1],
                AdminStatus: selectedAdminStatus,
                UserStatus: selectedUserStatus,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                alert(`${t('menu_created')}`);
                location.reload();
            } else {
                console.error("게시물 작성 실패:", response.statusText);
            }
        } catch (error) {
            console.error("게시물 작성 중 오류:", error);
        }
    };

    return (
        <div className={MenuAddStyle.modal}>
            <div className={MenuAddStyle.modalContent}>
                <select className={MenuAddStyle.selectMenu}
                    value={selectedServiceCode ?? ""}
                    onChange={(e) => setSelectedServiceCode(Number(e.target.value))}
                >
                    <option>{t('servicecode_select')}</option>
                    {serviceCode.map((serviceCode, index) => (
                        <option key={index} value={serviceCode.service_idx}>
                            {serviceCode.service_code}
                        </option>
                    ))}
                </select>
                <select
                    className={MenuAddStyle.selectMenu}
                    value={JSON.stringify(selectedMenuName) || ""}
                    onChange={(e) => {
                        const selectedValue = JSON.parse(e.target.value);
                        setSelectedMenuName(selectedValue);
                    }}
                >
                    <option value="">{t('menu_select')}</option>
                    {menuName.map((menu, index) => (
                        <option key={index} value={JSON.stringify([menu.section, menu.menu_name, menu.menu_code, menu.lang_code])}>
                            {menu.menu_name}
                        </option>
                    ))}
                </select>
                <select
                    className={MenuAddStyle.selectMenu}
                    value={selectedAdminStatus || ""}
                    onChange={(e) => setSelectedAdminStatus(e.target.value)}
                >
                    <option value="">{t('admin_status')}</option>
                    {adminStatus.map((admin, index) => (
                        <option key={index} value={admin.admin_status}>
                            {admin.admin_status}
                        </option>
                    ))}
                </select>
                <select
                    className={MenuAddStyle.selectMenu}
                    value={selectedUserStatus || ""}
                    onChange={(e) => setSelectedUserStatus(e.target.value)}
                >
                    <option value="">{t('show_select')}</option>
                    {status.map((status, index) => (
                        <option key={index} value={status.check_status}>
                            {status.check_status}
                        </option>
                    ))}
                </select>

                <div className={MenuAddStyle.btnContainer}>
                    <button className={MenuAddStyle.close} onClick={closeAdd}>{t('close')}</button>
                    <button className={MenuAddStyle.saveBtn} onClick={handleSave}>{t('save')}</button>
                </div>
            </div>
        </div>
    );
};

export default MenuAdd;
