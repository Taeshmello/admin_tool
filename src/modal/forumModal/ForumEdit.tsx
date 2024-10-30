import EditStyles from './ForumEdit.module.css'
import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';
import ForumEditor from "../../components/ForumEditor";
import { fetchMenuByServiceCodeId } from '../../utils/forum';

interface ForumEditProp {
    closeEdit: () => void
    forumItem: Forum
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

const ForumEdit: React.FC<ForumEditProp> = ({ closeEdit, forumItem }) => {
    const { t } = useTranslation();
    const [selectedServiceCode, setSelectedServiceCode] = useState<string | null>(forumItem.ServiceCode);


    return (

        <div className={EditStyles.modal}>
            <div className={EditStyles.modalContent}>
                <table className={EditStyles.table}>
                    <thead className={EditStyles.thead}>
                        <th className={EditStyles.th}>{t('service_code')}</th>
                        <th className={EditStyles.th}>{t('category')}</th>
                        <th className={EditStyles.th}>{t('date')}</th>
                        <th className={EditStyles.th}>{t('top_fixed')}</th>
                        <th className={EditStyles.th}>{t('status')}</th>
                        <th className={EditStyles.th}>{t('title')}</th>
                        <th className={EditStyles.th}>{t('detail')}</th>
                    </thead>
                    <tbody className={EditStyles.tbody}>
                        <tr className={EditStyles.tr}>
                            <td className={EditStyles.td}>
                                <select ></select>
                            </td>
                            <td className={EditStyles.td}>
                                <select name="" id=""></select>
                            </td>
                        </tr>
                    </tbody>
                </table>
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