import commentStyles from "./Comment.module.css";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { fetchComments } from "../../utils/forum";

interface ForumCommentProp {
    closeComment: () => void;
    FB_idx: number;
}

const Comment: React.FC<ForumCommentProp> = ({ closeComment, FB_idx }) => {
    const { t } = useTranslation();
    const [comments, setComments] = useState<any[]>([]); // 댓글 상태 초기화

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
    }, [FB_idx]);

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
                                    <td>{comment.Images ? <img src={comment.Images} alt="comment" /> : '-'}</td>
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