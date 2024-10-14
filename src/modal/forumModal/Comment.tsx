import commentStyles from "./Comment.module.css"
import { useTranslation } from "react-i18next";
interface ForumCommentProp {
    closeComment: ()=> void
}

const Comment:React.FC<ForumCommentProp> = ({closeComment}) => {
    const { t } = useTranslation();
    return(
        <div className={commentStyles.modal}>
            <div className={commentStyles.modalContent}>
            <button className={commentStyles.close} onClick={closeComment}>{t('close')}</button>
            </div>
        </div>
    )
}

export default Comment;