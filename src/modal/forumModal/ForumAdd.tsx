import { useEffect } from "react";
import { useAtom } from "jotai";
import styles from "./ForumAdd.module.css"
import { fetchLanguage, fetchMenuByServiceCodeId } from "../../utils/forum";
import { fetchServiceCode, fetchBoardUserStatus } from "../../utils/menu";
import { useTranslation } from "react-i18next";
import ForumEditor from "../../components/ForumEditor";
import { useCookies } from 'react-cookie';
import { refreshAccessToken, fetchData } from "../../utils/api";
import axios from "axios";
import 'react-datepicker/dist/react-datepicker.css';
import {
    languagesAtom,
    selectedLanguagesAtom,
    menuAtom,
    userInfoAtom,
    selectedMenuAtom
} from "../../atoms/forum";
import {
    serviceCodeAtom,
    selectedServiceCodeIdxAtom,
    titleAtom,
    detailAtom,
    selectedUserStatusAtom,
    statusAtom
} from "../../atoms/store";

interface ForumAddProp {
    closeAdd: () => void
}

const ForumAdd: React.FC<ForumAddProp> = ({ closeAdd }) => {
    const [languages, setLanguages] = useAtom(languagesAtom);
    const [selecetedLanguage, setSelectedLanguage] = useAtom(selectedLanguagesAtom);
    const [cookies, setCookie] = useCookies(['accessToken']);
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);
    const [serviceCode, setServiceCode] = useAtom(serviceCodeAtom);
    const [selectedServiceCode, setSelectedServiceCode] = useAtom(selectedServiceCodeIdxAtom);
    const [selectedMenu, setSelectedMenu] = useAtom(selectedMenuAtom);
    const [menu, setMenu] = useAtom(menuAtom);
    const [selectedUserStatus, setSelectedUserStatus] = useAtom(selectedUserStatusAtom);
    const [status, setStatus] = useAtom(statusAtom);
    const { t } = useTranslation();
    const [title, setTitle] = useAtom(titleAtom);
    const [detail, setDetail] = useAtom(detailAtom);
    
    useEffect(() => {
        const loadLanguageData = async () => {
            try {
                const languageData = await fetchLanguage();
                if (languageData && Array.isArray(languageData)) {
                    setLanguages(languageData);
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
    }, [selectedServiceCode, cookies.accessToken, setCookie])
    const handleSubmit = async () => {
        if (!selectedMenu || !selectedServiceCode || !selecetedLanguage.length || !selectedUserStatus || !title || !detail) {
            alert(`${t('plz_fill_space')}`);
            return;
        }
        try {
            const selectedLanguageCode = languages.find(lang => lang.Lang === selecetedLanguage[0])?.Lang_idx;
            const response = await axios.post("http://localhost:5000/forum/insert", {
                ServiceCode: selectedServiceCode,
                Category: selectedMenu,
                LanguageCode: selectedLanguageCode,
                title: title,
                contents: detail,
                UserId: userInfo?.name || 'unknown',
                UserStatus: selectedUserStatus
            });
            if (response.status === 200) {
                alert(`${t("forum_add_complete")}`)
                location.reload()
            } else {
                console.error("게시물 작성 실패", response.statusText)
            }


        } catch (error) {
            console.error("게시물 작성 중 오류:", error);
        }
        closeAdd();
        window.location.reload()
    };
    const handleCheckboxChange = (lang: string) => {
        setSelectedLanguage(prevSelectedLanguages => {
            if (prevSelectedLanguages.includes(lang)) {

                return prevSelectedLanguages.filter(selectedLang => selectedLang !== lang);
            } else {

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
                {/* <div className={styles.dateSelect}>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}   
                />
                <h4>~</h4>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                />
                </div> */}

                <div className={styles.languageContainer}>
                    {languages.map((lang, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                id={`lang-${index}`}
                                value={lang.Lang}
                                onChange={() => handleCheckboxChange(lang.Lang)}
                                checked={selecetedLanguage.includes(lang.Lang)}
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