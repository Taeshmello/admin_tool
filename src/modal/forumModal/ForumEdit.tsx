import EditStyles from './ForumEdit.module.css'
import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';
import ForumEditEditor from '../../components/ForumEditEditor';
import { fetchLanguage } from '../../utils/forum';
import DatePicker from 'react-datepicker';
import { fetchMenuName, fetchBoardUserStatus } from '../../utils/menu'
import { atom, useAtom } from 'jotai';


interface languages {
    Lang_idx: number;
    Lang: string;
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

interface ForumEditProp {
    closeEdit: () => void
    boardItem: Forum;
}

interface MenuName {
    section: number;
    menu_name: string;
    menu_code: string;
    lang_code: string;
}

interface UserStatus {
    check_status: string;
}
const statusAtom = atom<UserStatus[]>([]);
const selectedMenuNameAtom = atom<number[]>([]);
const menuNameAtom = atom<MenuName[]>([]);
const selectedUserStatusAtom = atom<string | null>(null);
const detailAtom = atom<string>("");

const ForumEdit: React.FC<ForumEditProp> = ({ closeEdit, boardItem }) => {
    const { t } = useTranslation();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [languages, setLanguages] = useState<languages[]>([]);
    const [selectedMenuName, setSelectedMenuName] = useAtom(selectedMenuNameAtom);
    const [menuName, setMenuName] = useAtom(menuNameAtom);
    const [selectedUserStatus, setSelectedUserStatus] = useAtom(selectedUserStatusAtom);
    const [status, setStatus] = useAtom(statusAtom);
    const [detail, setDetail] = useAtom(detailAtom);
    const [isClosing, setIsClosing] = useState(false);

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
    }, [setMenuName, setLanguages, setStatus]);


    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            closeEdit();
        }, 300); 
    };

    return (
        <div className={`${EditStyles.modal} ${isClosing ? EditStyles.closing : ''}`}>
            <div className={EditStyles.modalContent}>
                <div className={EditStyles.selectContainer}>
                    <input type="text" className={EditStyles.ServiceCode} placeholder={boardItem.ServiceCode} disabled />

                    <select
                        className={EditStyles.classification}
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

                    <div className={EditStyles.dateSelect}>
                        <DatePicker
                            selected={startDate}
                            onChange={(date:any) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            className={EditStyles.startDate}
                        /><h4>~</h4>
                        <DatePicker
                            selected={endDate}
                            onChange={(date:any) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            className={EditStyles.endDate}
                        />
                    </div>

                    <div className={EditStyles.languageContainer}>
                        {languages.map((lang, index) => (
                            <div key={index}>
                                <input type="checkbox" id={`lang-${index}`} value={lang.Lang} />
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

                    <input className={EditStyles.title} placeholder={t("input_title")} />
                </div>

                <ForumEditEditor detail={detail} setDetail={setDetail} />

                <div className={EditStyles.btnContainer}>
                    <button className={EditStyles.close} onClick={handleClose}>
                        {t('close')}
                    </button>
                    <button className={EditStyles.save}>
                        {t('save')}
                    </button>
                </div>          
            </div>
        </div>
    );
};

export default ForumEdit;   