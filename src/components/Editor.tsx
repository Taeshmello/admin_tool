import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorStyle from './Editor.module.css';
import { useTranslation } from 'react-i18next';

interface EditorProps {
    detail: string;
    setDetail: (detail: string) => void;
}

const Editor: React.FC<EditorProps> = ({ detail, setDetail }) => {
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
            ['link', 'image'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['indent', '-1', '+1'],
            ['clean'],
            ['table'],
        ],
    };

    const editorConfig = {
        placeholder: `${t('detail')}`,
    };

    return (
        <div>
            <div className={EditorStyle.mainContainer}>
                <div className={`${EditorStyle.editorContainer_classicEditor} editorContainer`}>
                    <div className={`${EditorStyle.editorContainer__editor} editorContainer__editor`}>
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
}

export default Editor;
