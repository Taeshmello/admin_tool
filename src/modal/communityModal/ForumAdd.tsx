import { useEffect, useState } from "react";
import styles from "./ForumAdd.module.css"
import { fetchLanguage, fetchMenuByServiceCodeId } from "../../utils/forum";
import { fetchServiceCode, fetchBoardUserStatus } from "../../utils/menu";
interface ForumAddProp {
    closeAdd: () => void
}

interface languages {
    Lang_idx: number;
    Lang: string;
}

interface serviceCode {
    service_idx: number;
    service_code: string;
}

interface menu {
    sectionCode: string;

}

interface userStatus {
    check_status: string;
}

const ForumAdd: React.FC<ForumAddProp> = ({ closeAdd }) => {
    const [languages, setLanguages] = useState<languages[]>([]);
    const [serviceCode, setServiceCode] = useState<serviceCode[]>([]);
    const [selectedServiceCode, setSelectedServiceCode] = useState<number | null>(null);
    const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
    const [menu, setMenu] = useState<menu[]>([]);
    const [selectedUserStatus, setSelectedUserStatus] = useState<string | null>("");
    const [status, setStatus] = useState<userStatus[]>([]);
    useEffect(() => {
        const loadLanguageData = async () => {
            try {
                const languageData = await fetchLanguage();
                if (languageData && Array.isArray(languageData)) {
                    setLanguages(languageData);
                } else {
                    console.error("언어 데이터 형식 오류:", languageData)
                }

            } catch (error) {
                console.error("언어 데이터 불러오기 오류:", error)
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

        const loadServiceMenu = async () => {
            if (selectedServiceCode) {
                try {
                    const menuData = await fetchMenuByServiceCodeId(selectedServiceCode);
                    if (Array.isArray(menuData)) {
                        setMenu(menuData)
                    } else {
                        console.error("메뉴 데이터 형식 오류:", menuData)
                    }
                } catch (error) {
                    console.error("메뉴 데이터 불러오기 오류:", error)
                }
            } else {
                setMenu([]);
            }
        }

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
        loadServiceMenu();
        loadLanguageData();
        loadServiceCode();
        loadStatusData();
    }, [selectedServiceCode])
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <select className={styles.selectMenu}
                    onChange={(e) => setSelectedServiceCode(Number(e.target.value))}
                >
                    <option>서비스코드 선택</option>
                    {serviceCode.map((serviceCode, index) => (
                        <option key={index} value={serviceCode.service_idx}>
                            {serviceCode.service_code}
                        </option>
                    ))}
                </select>
                <select className={styles.selectMenu}
                    onChange={(e) => setSelectedMenu(e.target.value)}
                    value={selectedMenu ?? ""}
                    disabled={!selectedServiceCode}
                >
                    <option value="">메뉴 선택</option>
                    {menu.map((menu) => (
                        <option key={menu.sectionCode} value={menu.sectionCode}>
                            {menu.sectionCode}
                        </option>
                    ))}
                </select>
                <div className={styles.checkBoxContainer}>
                    {languages.map((lang, index) => (
                        <div key={index}>
                            <input type="checkbox" id={`lang-${index}`} value={lang.Lang} />
                            <label htmlFor={`lang-${index}`}>{lang.Lang}</label>
                        </div>
                    ))}
                </div>
                <select className={styles.selectMenu}></select>
                <div className={styles.statusContainer}>
                    <h4>공개/비공개 선택</h4>
                    <select name="status" className={styles.selectStatus}
                        value={selectedUserStatus || ""} // null 대신 빈 문자열로 설정
                        onChange={(e) => setSelectedUserStatus(e.target.value)}
                    >
                        <option value="">상태 선택</option> {/* 기본 옵션 추가 */}
                        {status.map((status, index) => (
                            <option key={index} value={status.check_status}>
                                {status.check_status}
                            </option>
                        ))}
                    </select>
                </div>

                <input type="text" placeholder="제목 입력" className={styles.inputTitle}></input>
                <div className={styles.btnContainer}>
                    <button className={styles.close} onClick={closeAdd}>닫기</button>
                    <button className={styles.save}>저장</button>
                </div>
            </div>
        </div>
    )
};


export default ForumAdd;            