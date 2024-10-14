import EditStyles from './ForumEdit.module.css'
import { useTranslation } from "react-i18next";
interface ForumEditProp {
    closeEdit: () => void
}
const ForumEdit: React.FC<ForumEditProp> = ({closeEdit}) => {
    const { t } = useTranslation();
    return(
        <div >
            <div className={EditStyles.modal}>
            <div className={EditStyles.modalContent}>
             <button className={EditStyles.close} onClick={closeEdit}>{t('close')}</button>
            </div>
        </div>
        </div>
    )
}

export default ForumEdit;