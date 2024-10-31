import EditStyles from './ForumEdit.module.css'
import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';
import ForumEditor from "../../components/ForumEditor";
import { fetchMenuByServiceCodeId, fetchLanguage } from '../../utils/forum';
import DatePicker from 'react-datepicker';
interface ForumEditProp {
    closeEdit: () => void

}

interface languages {
    Lang_idx: number;
    Lang: string;
}
const ForumEdit: React.FC<ForumEditProp> = ({ closeEdit, forumItem }) => {
    const { t } = useTranslation();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [languages, setLanguages] = useState<languages[]>([]);

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
        loadLanguageData();
    }, [])

    return (

        <div className={EditStyles.modal}>
            <div className={EditStyles.modalContent}>
                <div className={EditStyles.selectContainer}>
                    <select className={EditStyles.ServiceCode}>
                        <option>{t('servicecode_select')}</option>
                    </select>
                    <select className={EditStyles.classification}></select>
                </div>


                <div className={EditStyles.dateSelect}>
                    <DatePicker
                            selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                    /><h4>~</h4>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                </div>
                <div className={EditStyles.languageContainer}>
                    {languages.map((lang, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                id={`lang-${index}`}
                                value={lang.Lang}
                            />
                            <label htmlFor={`lang-${index}`}>{lang.Lang}</label>
                        </div>
                    ))}
                </div>
                <select className={EditStyles.selectFixed}></select>
                <select className={EditStyles.status}></select>
                <input className={EditStyles.title} placeholder={t("input_title")}/>
                <ForumEditor/>
                <div className={EditStyles.btnContainer}>
                    <button className={EditStyles.close} onClick={closeEdit}>
                        {t('close')}
                    </button>
                    <button className={EditStyles.save}>
                        {t('save')}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ForumEdit;