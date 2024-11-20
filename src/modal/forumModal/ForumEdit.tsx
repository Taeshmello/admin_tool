import EditStyles from './ForumEdit.module.css'
import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';
import ForumEditEditor from '../../components/ForumEditEditor';
import { fetchLanguage } from '../../utils/forum';
import { fetchMenuName, fetchBoardUserStatus } from '../../utils/menu'
import {useAtom } from 'jotai';
import axios from 'axios';
import { statusAtom, detailAtom, selectedUserStatusAtom } from '../../atoms/store';
import {
    selectedMenuNameAtom,
    menuNameAtom,
    languagesAtom,
    selectedLanguagesAtom
} from '../../atoms/forum';



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

interface ForumEditProp {
    closeEdit: () => void
    boardItem: Forum;
}

const ForumEdit: React.FC<ForumEditProp> = ({ closeEdit, boardItem }) => {
    const { t } = useTranslation();
    const [languages, setLanguages] = useAtom(languagesAtom)
    const [selecetedLanguage, setSelectedLanguage] = useAtom(selectedLanguagesAtom)
    const [selectedMenuName, setSelectedMenuName] = useAtom(selectedMenuNameAtom);
    const [menuName, setMenuName] = useAtom(menuNameAtom);
    const [selectedUserStatus, setSelectedUserStatus] = useAtom(selectedUserStatusAtom);
    const [status, setStatus] = useAtom(statusAtom);
    const [detail, setDetail] = useAtom(detailAtom);
    const [isClosing, setIsClosing] = useState(false);
    const [title, setTitle] = useState(boardItem.Title);

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
        loadLanguageData();
        loadMenuName();
    }, [boardItem, setMenuName, setLanguages, setStatus]);

    const handleCheckboxChange = (lang: string) => {
        setSelectedLanguage(prevSelectedLanguages => {
            if (prevSelectedLanguages.includes(lang)) {

                return prevSelectedLanguages.filter(selectedLang => selectedLang !== lang);
            } else {

                return [...prevSelectedLanguages, lang];
            }
        });
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            closeEdit();
        }, 300);
    };

    const handleSubmit = async () => {
        if (!selectedMenuName || !selectedUserStatus || !title || !detail) {
            alert(`${t('plz_fill_space')}`);
            return;
        }

        try {
            const selectedLanguageCode = languages.find(lang => lang.Lang === selecetedLanguage[0])?.Lang_idx;
            const isFixed = "N";

            const response = await axios.put("http://localhost:5000/forum/update", {
                FB_idx: boardItem.FB_idx,
                Category: selectedMenuName,
                LanguageCode: selectedLanguageCode,
                Title: title,
                contents: detail,
                isFixed: isFixed,
                UserStatus: selectedUserStatus,
            });



            if (response.status === 200) {
                alert(`${t("forum_update_complete")}`);
                closeEdit();
                window.location.reload;
            } else {
                console.error("게시물 수정 실패", response.statusText);
            }
        } catch (error) {
            console.error("게시물 수정 중 오류:", error);
        }

    };

    return (
        <div className={`${EditStyles.modal} ${isClosing ? EditStyles.closing : ''}`}>
            <div className={EditStyles.modalContent}>
                <div className={EditStyles.selectContainer}>
                    <input type="text" className={EditStyles.ServiceCode} placeholder={boardItem.ServiceCode} disabled />

                    <select
                        className={EditStyles.classification}
                        value={selectedMenuName ?? ""}
                        onChange={(e) => {
                            setSelectedMenuName(e.target.value)
                        }}
                    >
                        <option value="">{t('menu_select')}</option>
                        {menuName.map((menu, index) => (
                            <option key={index} value={menu.menu_code}>
                                {menu.menu_name}
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
                                    checked={selecetedLanguage.includes(lang.Lang)}
                                />
                                <label htmlFor={`lang-${index}`}>{lang.Lang}</label>
                            </div>
                        ))}
                    </div>

                    <select className={EditStyles.selectFixed}>
                        <option>{t('top_fixed')}</option>
                        <option>Y</option>
                        <option>N</option>
                    </select>

                    <select
                        className={EditStyles.status}
                        value={selectedUserStatus ?? ""}
                        onChange={(e) => setSelectedUserStatus(e.target.value)}
                    >
                        {status.map((status, index) => (
                            <option key={index} value={status.check_status}>
                                {status.check_status}
                            </option>
                        ))}
                    </select>

                    <input
                        type='text'
                        className={EditStyles.title}
                        placeholder={t("input_title")}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <ForumEditEditor
                    detail={detail}
                    setDetail={setDetail}
                />
                <div className={EditStyles.btnContainer}>
                    <button className={EditStyles.close} onClick={handleClose}>{t('close')}</button>
                    <button className={EditStyles.save} onClick={handleSubmit}>{t('save')}</button>
                </div>
            </div>
        </div>
    );
};

export default ForumEdit;
