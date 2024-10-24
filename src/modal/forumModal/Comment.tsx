import commentStyles from "./Comment.module.css";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { fetchComments } from "../../utils/forum";
import { atom, useAtom } from 'jotai';

// Define Jotai atom for comments
const commentsAtom = atom<any[]>([]);

interface ForumCommentProp {
    closeComment: () => void;
    FB_idx: number;
}

const Comment: React.FC<ForumCommentProp> = ({ closeComment, FB_idx }) => {
    const { t } = useTranslation();
    const [comments, setComments] = useAtom(commentsAtom);

    useEffect(() => {
        const loadComments = async () => {
            try {
                const commentData = await fetchComments(FB_idx);
                setComments(commentData);
            } catch (error) {
                console.error(error);
            }
        };
        
        loadComments();
    }, [FB_idx, setComments]);

    return (
        <div className={commentStyles.modal}>
            <div className={commentStyles.modalContent}>
                <div className={commentStyles.tableContainer}>
                    <table className={commentStyles.commentTable}>
                        <thead>
                            <tr>
                                <th>{t('user_id')}</th>
                                <th>{t('nickName')}</th>
                                <th>{t('images')}</th>
                                <th>{t('detail')}</th>
                                <th>{t('registration_date')}</th>
                                <th>{t('status')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments.map(comment => (
                                <tr key={comment.CommentID}>
                                    <td>{comment.UserId}</td>
                                    <td>{comment.NickName}</td>
                                    <td>{comment.Images ? <img src={comment.Images} alt="Comment" /> : '-'}</td>
                                    <td>{comment.details}</td>
                                    <td>{new Date(comment.CreatedAt).toLocaleString()}</td>
                                    <td>{comment.check_status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className={commentStyles.btnContainer}>
                    <button className={commentStyles.close} onClick={closeComment}>{t('close')}</button>
                </div>
            </div>
        </div>
    );
};

export default Comment;
