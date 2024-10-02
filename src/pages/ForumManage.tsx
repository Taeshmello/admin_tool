import { useState } from 'react';
import styles from './ForumManage.module.css'
import ForumAdd from '../modal/ForumAdd';
const ForumManage:React.FC = () => {
    const [isAddOpen, setIsAddOpen] = useState<boolean>(false);

    const openAdd = () => {
        setIsAddOpen(true)
    }

    const closeAdd = () =>{
        setIsAddOpen(false)
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageContent}>
                <button className={styles.addBtn} onClick={openAdd}>신규 등록</button>
            </div>

        <table>
            <thead>
                <tr>글 번호</tr>
                <tr>서비스코드</tr>
                <tr>카테고리</tr>
                <tr>언어코드</tr>
                <tr>제목</tr>
                <tr>첨부파일 여부</tr>
                <tr>작성자 ID</tr>
                <tr>User IP</tr>
                <tr>Create Datetime</tr>
                <tr>편집</tr>
                <tr>상태</tr>

                    
            </thead>
        </table>

            {isAddOpen && <ForumAdd closeAdd = {closeAdd}/>}
        </div>
    )
}

export default ForumManage;