import styles from './Department.module.css'

const Department = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageContent}>
        <button className={styles.departmentAdd}>부서생성</button>
        </div>
    </div>
  )
}

export default Department;