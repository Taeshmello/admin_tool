import { useEffect, useState } from "react";
import styles from "./ForumAdd.module.css"
import { fetchLanguage } from "../utils/forum";
import { fetchServiceCode } from "../utils/menu";
interface ForumAddProp {
    closeAdd: () => void
}

interface languages {
    Lang_idx: number;
    Lang: string;
}

interface serviceCode {
    service_idx: number;
    service_code: string;
}

const ForumAdd: React.FC<ForumAddProp> = ({ closeAdd }) => {
    const [languages, setLanguages] = useState<languages[]>([]);
    const [serviceCode, setServiceCode] = useState<serviceCode[]>([]);

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
          };
        const loadServiceCode = async () => {
            try {
                const serviceCodeData = await fetchServiceCode();
                if (serviceCodeData && Array.isArray(serviceCodeData)) {
                    setServiceCode(serviceCodeData);
                } else {
                    console.error("서비스코드 형식 오류:", serviceCodeData);
                }
            } catch (error) {
                console.error("서비스 코드 불러오기 오류:", error)
            }
        };

        loadLanguageData();
        loadServiceCode();
    }, [])
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <select className={styles.selectMenu}>
                    <option>서비스코드 선택</option>
                    {serviceCode.map((serviceCode, index) => (
                        <option key={index} value={serviceCode.service_idx}>
                            {serviceCode.service_code}
                        </option>
                    ))}
                </select>
                <select className={styles.selectMenu}></select>
                <div className={styles.checkBoxContainer}>
                    {languages.map((lang, index) => (
                        <div key={index}>
                            <input type="checkbox" id={`lang-${index}`} value={lang.Lang} />
                            <label htmlFor={`lang-${index}`}>{lang.Lang}</label>
                        </div>
                    ))}
                </div>
                <select className={styles.selectMenu}></select>
                <select className={styles.selectMenu}></select>
                <input type="text" className={styles.inputTitle}></input>
                <div className={styles.btnContainer}>
                    <button className={styles.close} onClick={closeAdd}>닫기</button>
                    <button className={styles.save}>저장</button>
                </div>

            </div>

        </div>
    )
};


export default ForumAdd;            