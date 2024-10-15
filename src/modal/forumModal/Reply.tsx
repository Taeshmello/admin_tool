import ReplyStyles from "./Reply.module.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface ForumReplyProp {
    closeReply: () => void;
    FB_idx:number
}

const Reply: React.FC<ForumReplyProp> = ({ closeReply, FB_idx }) => {
    const { t } = useTranslation();
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className={ReplyStyles.modal}>
            <div className={ReplyStyles.modalContent}>
                <div className={ReplyStyles.form}>
                    <label>{t('content')}</label>
                    <textarea className={ReplyStyles.textarea} placeholder={t('pleaseFillReplyContent')}></textarea>
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
                    <button className={ReplyStyles.close} onClick={closeReply}>{t('close')}</button>
                    <button className={ReplyStyles.save}>{t('save')}</button>
                </div>
            </div>
        </div>
    );
};

export default Reply;
