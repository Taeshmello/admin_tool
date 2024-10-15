import EditStyles from './ForumEdit.module.css'
import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';
import { fetchLanguage, fetchMenuByServiceCodeId } from "../../utils/forum";
import {fetchBoardUserStatus } from "../../utils/menu";
import ForumEditor from "../../components/ForumEditor";

interface ForumEditProp {
    closeEdit: () => void
}
interface Forum {
    FB_idx: number;
    ServiceCode: string;
    Category: string;
    LanguageCode: string;
    Title: string;
    HaveFile: string;
    UserId: string;
    UserIp: string;
    CreatedAt: string;
    UserStatus: string;
}
interface menu {
    sectionCode: string;

}
interface languages {
    Lang_idx: number;
    Lang: string;
}
interface userStatus {
    check_status: string;
}

const ForumEdit: React.FC<ForumEditProp> = ({ closeEdit }) => {
    const [forums, setForums] = useState<Forum[]>([]);
    const [languages, setLanguages] = useState<languages[]>([]);
    const [selecetedLanguage, setSelectedLanguage] = useState<string[]>([]);
    const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
    const [menu, setMenu] = useState<menu[]>([]);
    const [selectedUserStatus, setSelectedUserStatus] = useState<string | null>("");
    const [status, setStatus] = useState<userStatus[]>([]);
    const [title, setTitle] = useState<string>('');
    const [detail, setDetail] = useState<string>('');
    const { t } = useTranslation();

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
        
        
        loadLanguageData();
        loadServiceMenu();
        loadStatusData();
    }, [])
    return (
        <div >
            <div className={EditStyles.modal}>
                <div className={EditStyles.modalContent}>
                <select className={EditStyles.selectMenu}
                >
                </select>
                <select className={EditStyles.selectMenu}
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
                <div className={EditStyles.languageContainer}>
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
                <div className={EditStyles.statusContainer}>
                    <h4>{t('show_select')}</h4>
                    <select name="status" className={EditStyles.selectStatus}
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
                <div className={EditStyles.editorContainer}>
                    <ForumEditor detail={detail} setDetail={setDetail} />
                </div>

                    
                    <div className={EditStyles.btnContainer}>
                        <button className={EditStyles.close} onClick={closeEdit}>{t('close')}</button>
                        <button className={EditStyles.save}>{t('save')}</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ForumEdit;