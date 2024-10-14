import ReplyStyles from "./Reply.module.css"
import { useTranslation } from "react-i18next";
interface ForumReplyProp {
    closeReply: () => void
}
const Reply: React.FC<ForumReplyProp> = ({ closeReply }) => {
    const { t } = useTranslation();
    return (
        <div className={ReplyStyles.modal}>
            <div className={ReplyStyles.modalContent}>


            <input className={ReplyStyles.inputReply} type="text" />

                <div className={ReplyStyles.btnContainer}>
                    <button className={ReplyStyles.close} onClick={closeReply}>{t('close')}</button>
                    <button className={ReplyStyles.save}>{t('save')}</button>
                </div>

            </div>
        </div>
    )
}

export default Reply;