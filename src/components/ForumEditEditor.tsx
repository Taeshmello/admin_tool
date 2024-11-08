import { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './ForumEdit.module.css';
import { useTranslation } from 'react-i18next';

interface EditorProps {
    detail: string;
    setDetail: (detail: string) => void;
}

const ForumEditEditor: React.FC<EditorProps> = ({ detail, setDetail }) => {
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);


    const modules = {
        toolbar: [
            ['undo', 'redo'],
            [{ 'font': [] }, { 'size': ['10', '12', '14', '18', '20', '22', 'default'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            ['link'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['indent', '-1', '+1'],
            ['clean'],
            ['image'],
            ['table'],
        ],
    };

    const editorConfig = {
        placeholder: `${t('detail')}`,
    };

    return (
        <div>
            <div className={styles.mainContainer}>
                <div className={`${styles.editorContainer_classicEditor} editorContainer`}>
                    <div className={`${styles.editorContainer__editor} editorContainer__editor`}>
                        {isLayoutReady && (
                            <ReactQuill
                                value={detail}
                                onChange={(value: string) => setDetail(value)}
                                modules={modules}
                                placeholder={editorConfig.placeholder}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForumEditEditor;
