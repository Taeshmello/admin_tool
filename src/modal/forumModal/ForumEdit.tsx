import EditStyles from './ForumEdit.module.css'
import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';
import { fetchLanguage, fetchMenuByServiceCodeId } from "../../utils/forum";
import { fetchBoardUserStatus } from "../../utils/menu";
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

const ForumEdit: React.FC<ForumEditProp> = ({ closeEdit }) => {
    const { t } = useTranslation();


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
            <tbody>
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