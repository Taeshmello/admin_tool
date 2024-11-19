import { useEffect } from 'react';
import styles from './ForumManage.module.css';
import ForumAdd from '../../modal/forumModal/ForumAdd';
import Comment from '../../modal/forumModal/Comment';
import Reply from '../../modal/forumModal/Reply';
import ForumEdit from '../../modal/forumModal/ForumEdit';
import { fetchForum } from '../../utils/forum';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import {
    forumsAtom,
    isCommentOpenAtom,
    isReplyOpenAtom,
    selectedFBidxAtom,
    selectedForumBoardItemAtom
} from '../../atoms/forum';
import { 
    isAddOpenAtom,
    isEditModalOpenAtom 
} from '../../atoms/store';


const ForumManage: React.FC = () => {
    const [forums, setForums] = useAtom(forumsAtom);
    const [isAddOpen, setIsAddOpen] = useAtom(isAddOpenAtom);
    const [isEditOpen, setIsEditOpen] = useAtom(isEditModalOpenAtom);
    const [isCommentOpen, setIsCommentOpen] = useAtom(isCommentOpenAtom);
    const [isReplyOpen, setIsReplyOpen] = useAtom(isReplyOpenAtom);
    const [selectedFBidx, setSelectedFBidx] = useAtom(selectedFBidxAtom);
    const [selectedBoardItem, setSelectedBoardItem] = useAtom(selectedForumBoardItemAtom);
    const { t } = useTranslation();

    const handleEdit = async (FB_idx: number) => {
        try {
            const response = await fetch(`http://localhost:5000/forum/details/${FB_idx}`);
            if (response.ok) {
                const boardItem = await response.json();
                setSelectedBoardItem(boardItem);
                setIsEditOpen(true);
            } else {
                alert('게시물 조회에 실패했습니다.');
            }
        } catch (error) {
            console.error("게시물 조회 오류:", error);
            alert('게시물 조회에 실패했습니다.');
        }
    };


    useEffect(() => {
        const loadForums = async () => {
            try {
                const forumData = await fetchForum();
                setForums(forumData);
            } catch (error) {
                console.error(error);
            }
        };

        loadForums();
    }, [setForums]);

    const openAdd = () => {
        setIsAddOpen(true);
    };

    const closeAdd = () => {
        setIsAddOpen(false);
    };


    const closeEdit = () => {
        setIsEditOpen(false);
    };

    const openComment = (FB_idx: number) => {
        setSelectedFBidx(FB_idx);
        setIsCommentOpen(true);
    };

    const closeComment = () => {
        setIsCommentOpen(false);
        setSelectedFBidx(null);
    };

    const openReply = (FB_idx: number) => {
        setSelectedFBidx(FB_idx);
        setIsReplyOpen(true);
    };

    const closeReply = () => {
        setIsReplyOpen(false);
        setSelectedFBidx(null);
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageContent}>
                <button className={styles.addBtn} onClick={openAdd}>{t('new_registration')}</button>

                <div className={styles.tableContainer}>
                    <table className={styles.forumTable}>
                        <thead>
                            <tr>
                                <th>{t('post_number')}</th>
                                <th>{t('service_code')}</th>
                                <th>{t('category_name')}</th>
                                <th>{t('language_code')}</th>
                                <th>{t('title')}</th>
                                <th>{t('have_file')}</th>
                                <th>{t('author_id')}</th>
                                <th>{t('user_ip')}</th>
                                <th>{t('registration_date')}</th>
                                <th>{t('option')}</th>
                                <th>{t('status')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forums.map(forum => (
                                <tr key={forum.FB_idx}>
                                    <td>{forum.FB_idx}</td>
                                    <td>{forum.ServiceCode}</td>
                                    <td>{forum.Category}</td>
                                    <td>{forum.LanguageCode}</td>
                                    <td>{forum.Title}</td>
                                    <td>{forum.HaveFile}</td>
                                    <td>{forum.UserId}</td>
                                    <td>{forum.UserIp}</td>
                                    <td>{forum.CreatedAt}</td>
                                    <td>
                                        <button className={styles.editBtn} onClick={() => handleEdit(forum.FB_idx)}>{t('edit')}</button>
                                        <button className={styles.replyBtn} onClick={() => openReply(forum.FB_idx)}>{t('reply')}</button>
                                        <button className={styles.commentBtn} onClick={() => openComment(forum.FB_idx)}>{t('comment_check')}</button>
                                    </td>
                                    <td>{forum.UserStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isAddOpen && <ForumAdd closeAdd={closeAdd} />}
            {isEditOpen && <ForumEdit closeEdit={closeEdit} boardItem={selectedBoardItem} />}
            {isCommentOpen && selectedFBidx !== null && (
                <Comment closeComment={closeComment} FB_idx={selectedFBidx} />
            )}
            {isReplyOpen && selectedFBidx !== null && (
                <Reply closeReply={closeReply} FB_idx={selectedFBidx} />
            )}
        </div>
    );
}

export default ForumManage;
