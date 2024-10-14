import { useEffect, useState } from "react";
import styles from "./ForumAdd.module.css"
import { fetchLanguage, fetchMenuByServiceCodeId } from "../../utils/forum";
import { fetchServiceCode, fetchBoardUserStatus } from "../../utils/menu";
import { useTranslation } from "react-i18next";
import ForumEditor from "../../components/ForumEditor";
import { useCookies } from 'react-cookie';
import { refreshAccessToken, fetchData } from "../../utils/api";
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
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    const [userInfo, setUserInfo] = useState<{ name: string } | null>(null);
    const [selecetedLanguage, setSelectedLanguage] = useState<string[]>([]);
    const [serviceCode, setServiceCode] = useState<serviceCode[]>([]);
    const [selectedServiceCode, setSelectedServiceCode] = useState<number | null>(null);
    const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
    const [menu, setMenu] = useState<menu[]>([]);
    const [selectedUserStatus, setSelectedUserStatus] = useState<string | null>("");
    const [status, setStatus] = useState<userStatus[]>([]);
    const { t } = useTranslation();
    const [title, setTitle] = useState<string>('');
    const [detail, setDetail] = useState<string>('');


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
        const fetchUser = async () => {
            try {
                if (!cookies.accessToken) {
                    await refreshAccessToken(setCookie);
                }

                if (cookies.accessToken) {
                    const userData = await fetchData(cookies.accessToken);
                    setUserInfo(userData);
                }
            } catch (error) {
                console.error("유저 정보를 가져오는 중 오류 발생:", error);
            }
        };

        fetchUser();
        loadServiceMenu();
        loadLanguageData();
        loadServiceCode();
        loadStatusData();
    }, [selectedServiceCode, cookies.accessToken, setCookie, removeCookie])

    const handleSubmit = async () => {
        if (!selectedMenu || !selectedServiceCode || !selecetedLanguage.length || !selectedUserStatus || !title || !detail) {
            alert(`${t('plz_fill_space')}`);
            return;
        }


        try {
            const selectedLanguageCode = languages.find(lang => lang.Lang === selecetedLanguage[0])?.Lang_idx; // 선택된 언어 코드 가져오기

            const response = await fetch("http://localhost:5000/forum/insert", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    ServiceCode: selectedServiceCode,
                    Category: selectedMenu, // 숫자로 변환
                    LanguageCode: selectedLanguageCode, // 이제 int 타입으로 전송
                    title: title,
                    contents: detail,
                    UserId: userInfo?.name || 'unknown', // 기본값 설정
                    UserStatus: selectedUserStatus
                })
            });


            if (!response.ok) {
                throw new Error('서버 응답 오류');
            }

            const result = await response.json();
            alert("게시물 작성 완료")
            console.log(result);
        } catch (error) {
            console.error("게시물 작성 중 오류:", error);
        }
    };
    const handleCheckboxChange = (lang: string) => {
        setSelectedLanguage(prevSelectedLanguages => {
            if (prevSelectedLanguages.includes(lang)) {
                // 이미 선택된 언어라면 배열에서 제거
                return prevSelectedLanguages.filter(selectedLang => selectedLang !== lang);
            } else {
                // 선택되지 않은 언어라면 배열에 추가
                return [...prevSelectedLanguages, lang];
            }
        });
    };

   


    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <select className={styles.selectMenu}
                    onChange={(e) => setSelectedServiceCode(Number(e.target.value))}
                >
                    <option>{t('servicecode_select')}</option>
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
                    <option value="">{t('menu_select')}</option>
                    {menu.map((menu) => (
                        <option key={menu.sectionCode} value={menu.sectionCode}>
                            {menu.sectionCode}
                        </option>
                    ))}
                </select>
                <div className={styles.languageContainer}>
                    {languages.map((lang, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                id={`lang-${index}`}
                                value={lang.Lang}
                                onChange={() => handleCheckboxChange(lang.Lang)}
                                checked={selecetedLanguage.includes(lang.Lang)} // 선택된 언어 상태 반영
                            />
                            <label htmlFor={`lang-${index}`}>{lang.Lang}</label>
                        </div>
                    ))}     
                </div>
                <div className={styles.statusContainer}>
                    <h4>{t('show_select')}</h4>
                    <select name="status" className={styles.selectStatus}
                        value={selectedUserStatus || ""}
                        onChange={(e) => setSelectedUserStatus(e.target.value)}
                    >
                        <option value="">{t('status_select')}</option>
                        {status.map((status, index) => (
                            <option key={index} value={status.check_status}>
                                {status.check_status}
                            </option>
                        ))}
                    </select>
                </div>


                <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder={t('input_title')} className={styles.inputTitle}></input>
                <div className={styles.editorContainer}>
                    <ForumEditor detail={detail} setDetail={setDetail} />
                </div>
                <div className={styles.btnContainer}>

                    <button className={styles.close} onClick={closeAdd}>{t('close')}</button>
                    <button className={styles.save} onClick={handleSubmit}>{t('save')}</button>
                </div>
            </div>
        </div>
    )
};


export default ForumAdd;            