import { useState, useEffect } from 'react';
import styles from './ForumManage.module.css';
import ForumAdd from '../../modal/forumModal/ForumAdd';
import Comment from '../../modal/forumModal/Comment';
import Reply from '../../modal/forumModal/Reply';
import ForumEdit from '../../modal/forumModal/ForumEdit';
import { fetchForum } from '../../utils/forum';
import { useTranslation } from 'react-i18next';

interface Forum {
    FB_idx: number;
    ServiceCode: string;  // 변경
    Category: string;      // 변경
    LanguageCode: string;
    Title: string;
    HaveFile: string;
    UserId: string;
    UserIp: string;            // UserIp는 문자열입니다
    CreatedAt: string;
    UserStatus: string;
}

const ForumManage: React.FC = () => {
    const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
    const [forums, setForums] = useState<Forum[]>([]);
    const {t} = useTranslation();
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false)
    const [isReplyOpen, setIsReplyOpen] = useState<boolean>(false)

    useEffect(() => {
        const loadForums = async () => {
            try {
                const forumData = await fetchForum();
                setForums(forumData); // 가져온 데이터를 상태에 저장
            } catch (error) {
                console.error(error);
            }
        };

        loadForums();
    }, []);

    const openAdd = () => {
        setIsAddOpen(true);
    };

    const closeAdd = () => {
        setIsAddOpen(false);
    };

    const openEdit= () => {
        setIsEditOpen(true)
    }
    const closeEdit = () => {
        setIsEditOpen(false)
    }

    const openComment = () => {
        setIsCommentOpen(true)
    }
    const closeComment = () => {
        setIsCommentOpen(false)
    }

    const openReply = () => {
        setIsReplyOpen(true)
    }

    const closeReply = () => {
        setIsReplyOpen(false)
    }

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
                                        <button className={styles.editBtn} onClick={openEdit}>{t('edit') }</button>
                                        <button className={styles.replyBtn} onClick={openReply}>{t('reply')}</button>
                                        <button className={styles.commentBtn} onClick={openComment}>{t('comment_check')}</button>
                                    </td>
                                    <td>{forum.UserStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isAddOpen && <ForumAdd closeAdd={closeAdd} />}
            {isEditOpen && <ForumEdit closeEdit={closeEdit}/>}
            {isCommentOpen && <Comment closeComment={closeComment}/>}
            {isReplyOpen && <Reply closeReply={closeReply}/>}
        </div>
    );
}

export default ForumManage;
