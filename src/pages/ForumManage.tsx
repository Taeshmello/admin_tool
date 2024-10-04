import { useState, useEffect } from 'react';
import styles from './ForumManage.module.css';
import ForumAdd from '../modal/ForumAdd';
import { fetchForum } from '../utils/forum';

interface Forum {
    FB_idx: number;
    ServiceCodeName: string;  // 변경
    CategoryName: string;      // 변경
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

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageContent}>
                <button className={styles.addBtn} onClick={openAdd}>신규 등록</button>

                <div className={styles.tableContainer}>
                    <table className={styles.forumTable}>
                        <thead>
                            <tr>
                                <th>글 번호</th>
                                <th>서비스코드</th>
                                <th>카테고리</th>
                                <th>언어코드</th>
                                <th>제목</th>
                                <th>첨부파일 여부</th>
                                <th>작성자 ID</th>
                                <th>User IP</th>
                                <th>Create Datetime</th>
                                <th>편집</th>
                                <th>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forums.map(forum => (
                                <tr key={forum.FB_idx}>
                                    <td>{forum.FB_idx}</td>
                                    <td>{forum.ServiceCodeName}</td>
                                    <td>{forum.CategoryName}</td>
                                    <td>{forum.LanguageCode}</td>
                                    <td>{forum.Title}</td>
                                    <td>{forum.HaveFile}</td>
                                    <td>{forum.UserId}</td>
                                    <td>{forum.UserIp}</td>
                                    <td>{forum.CreatedAt}</td>
                                    <td>
                                        <button>편집</button>
                                        <button>답변</button>
                                        <button>댓글 확인</button>
                                    </td>
                                    <td>{forum.UserStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isAddOpen && <ForumAdd closeAdd={closeAdd} />}
        </div>
    );
}

export default ForumManage;
