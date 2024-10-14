import EditStyles from './ForumEdit.module.css'
import { useTranslation } from "react-i18next";
interface ForumEditProp {
    closeEdit: () => void
}
const ForumEdit: React.FC<ForumEditProp> = ({ closeEdit }) => {
    const { t } = useTranslation();
    return (
        <div >
            <div className={EditStyles.modal}>
                <div className={EditStyles.modalContent}>


                    
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