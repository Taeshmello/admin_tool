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
                <th className={EditStyles.th}>서비스코드</th>
                <th className={EditStyles.th}>분류</th>
                <th className={EditStyles.th}>기간???</th>
                <th className={EditStyles.th}>상단 고정</th>
                <th className={EditStyles.th}>상태</th>
                <th className={EditStyles.th}>제목</th>
                <th className={EditStyles.th}>내용</th>
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