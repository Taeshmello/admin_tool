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
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>

                
            </thead>
        </table>

            {isAddOpen && <ForumAdd closeAdd = {closeAdd}/>}
        </div>
    )
}

export default ForumManage;