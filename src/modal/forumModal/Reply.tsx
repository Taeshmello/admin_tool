import ReplyStyles from "./Reply.module.css";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { fetchData, refreshAccessToken } from "../../utils/api";
import { useCookies } from 'react-cookie';
import { atom, useAtom } from 'jotai';

interface ForumReplyProp {
    closeReply: () => void;
    FB_idx: number;
}

// Define Jotai atoms
const fileAtom = atom<File | null>(null);
const detailsAtom = atom<string>("");
const userInfoAtom = atom<{ name: string } | null>(null);

const Reply: React.FC<ForumReplyProp> = ({ closeReply, FB_idx }) => {
    const { t } = useTranslation();
    const [file, setFile] = useAtom(fileAtom);
    const [details, setDetails] = useAtom(detailsAtom);
    const [cookies, setCookie] = useCookies(['accessToken']);
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!cookies.accessToken) {
                    await refreshAccessToken(setCookie);
                }

                if (cookies.accessToken) {
                    const userData = await fetchData(cookies.accessToken);
                    setUserInfo(userData);
                }
            } catch (error) {
                console.error("유저 정보를 가져오는 중 오류 발생:", error);
            }
        };

        fetchUser();
    }, [cookies.accessToken, setCookie, setUserInfo]);

    const handleSubmit = async () => {
        const formData = new FormData();
        
        formData.append("FB_idx", FB_idx.toString());
        formData.append("UserId", userInfo?.name || "");
        formData.append("NickName", userInfo?.name || "");
        formData.append("details", details);
        formData.append("check_status", "Y");
    
        if (file) {
            formData.append("image", file);
        }
    
        try {
            const response = await fetch(`http://localhost:5000/forum/insertComment/${FB_idx}`, {
                method: "POST",
                body: formData,
            });
    
            if (response.ok) {
                closeReply(); 
            } else {
                // Handle error response if needed
            }
        } catch (error) {
            console.error("에러 발생:", error);
        }
    };

    return (
        <div className={ReplyStyles.modal}>
            <div className={ReplyStyles.modalContent}>
                <div className={ReplyStyles.form}>
                    <label>{t('content')}</label>
                    <textarea
                        className={ReplyStyles.textarea}
                        placeholder={t('pleaseFillReplyContent')}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    ></textarea>
                </div>

                <div className={ReplyStyles.forGroup}>
                    <label>{t('image')}</label>
                    <div className={ReplyStyles.imageUpload}>   
                        <img
                            src={file ? URL.createObjectURL(file) : "/asset/no_image.jpg"}
                            className={ReplyStyles.imagePreview}
                        />
                        <input
                            className={ReplyStyles.fileInput}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                <div className={ReplyStyles.btnContainer}>
                    <button className={ReplyStyles.close} onClick={closeReply}>
                        {t('close')}
                    </button>
                    <button className={ReplyStyles.save} onClick={handleSubmit}>
                        {t('save')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reply;
