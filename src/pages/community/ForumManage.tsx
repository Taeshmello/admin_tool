import { useEffect } from 'react';
import styles from './ForumManage.module.css';
import ForumAdd from '../../modal/forumModal/ForumAdd';
import Comment from '../../modal/forumModal/Comment';
import Reply from '../../modal/forumModal/Reply';
import ForumEdit from '../../modal/forumModal/ForumEdit';
import { fetchForum } from '../../utils/forum';
import { useTranslation } from 'react-i18next';
import { atom, useAtom } from 'jotai';

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

// Define Jotai atoms
const forumsAtom = atom<Forum[]>([]);
const isAddOpenAtom = atom<boolean>(false);
const isEditOpenAtom = atom<boolean>(false);
const isCommentOpenAtom = atom<boolean>(false);
const isReplyOpenAtom = atom<boolean>(false);
const selectedFBidxAtom = atom<number | null>(null);

const ForumManage: React.FC = () => {
    const [forums, setForums] = useAtom(forumsAtom);
    const [isAddOpen, setIsAddOpen] = useAtom(isAddOpenAtom);
    const [isEditOpen, setIsEditOpen] = useAtom(isEditOpenAtom);
    const [isCommentOpen, setIsCommentOpen] = useAtom(isCommentOpenAtom);
    const [isReplyOpen, setIsReplyOpen] = useAtom(isReplyOpenAtom);
    const [selectedFBidx, setSelectedFBidx] = useAtom(selectedFBidxAtom);
    const { t } = useTranslation();

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

    const openEdit = () => {
        setIsEditOpen(true);
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
                                        <button className={styles.editBtn} onClick={openEdit}>{t('edit')}</button>
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
            {isEditOpen && <ForumEdit closeEdit={closeEdit} forumItem={forums.find(forum => forum.FB_idx === selectedFBidx) || null} />}
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
