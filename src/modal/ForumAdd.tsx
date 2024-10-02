import { useEffect, useState } from "react";
import styles from "./ForumAdd.module.css"
import { fetchLanguage } from "../utils/forum";
interface ForumAddProp {
    closeAdd: () => void
}

interface languages {
    Lang_idx: number;
    Lang: string;
}

const ForumAdd: React.FC<ForumAddProp> = ({ closeAdd }) => {
    const [languages, setLanguages] = useState<languages[]>([]);


    useEffect(() => {
        const loadLanguageData = async () => {
            try {
                const languageData = await fetchLanguage();
                if (languageData && Array.isArray(languageData)) {
                    setLanguages(languageData);
                } else {
                    console.error("언어 데이터 형식 오류:", languageData)
                }

            } catch (error) {
                console.error("언어 데이터 불러오기 오류:", error)
            }
        }

        loadLanguageData();
    }, [])
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.checkBoxContainer}>
                    {languages.map((lang, index) => (
                        <div key={index}>
                            <input type="checkbox" id={`lang-${index}`} value={lang.Lang} />
                            <label htmlFor={`lang-${index}`}>{lang.Lang}</label>
                        </div>
                    ))}
                </div>
                <div className={styles.btnContainer}>
                    <button className={styles.close} onClick={closeAdd}>닫기</button>
                    <button className={styles.save}>저장</button>
                </div>

            </div>

        </div>
    )
};


export default ForumAdd;            