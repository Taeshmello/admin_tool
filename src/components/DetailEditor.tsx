import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 기본 툴바 스타일
import EditorStyle from './Editor.module.css'; // 기존 스타일 유지

import { useTranslation } from 'react-i18next';

interface EditorProps {
    detail: string;
    setDetail: (detail: string) => void;
}

const DetailEditor: React.FC<EditorProps> = ({ detail, setDetail }) => {
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);

    // Quill의 툴바 옵션 설정
    const modules = {
        toolbar: [
            [{ 'font': [] }, { 'size': ['10', '12', '14', '18', '20', '22', 'default'] }],
            [{ 'align': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image', 'blockquote', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['indent', '-1', '+1'],
            ['clean'], // 서식 초기화
            ['table'] // 테이블 삽입 기능
        ],
    };

    // Quill 에디터 설정
    const editorConfig = {
        placeholder: `${t('detail')}`, // 초기 텍스트 설정
    };

    return (
        <div>
            <div className={EditorStyle.mainContainer}>
                <div className={`${EditorStyle.editorContainer_classicEditor} editorContainer`}>
                    <div className={`${EditorStyle.editorContainer__editor} editorContainer__editor`}>
                        {/* React Quill 에디터 */}
                        <ReactQuill
                            value={detail}
                            onChange={(value: string) => setDetail(value)}
                            modules={modules}
                            placeholder={editorConfig.placeholder}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailEditor;
