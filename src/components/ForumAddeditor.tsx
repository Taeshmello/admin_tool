import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill의 기본 스타일
import styles from './ForumEdit.module.css';
import { useTranslation } from 'react-i18next';

interface EditorProps {
    detail: string;
    setDetail: (detail: string) => void;
}

const ForumAddEditor: React.FC<EditorProps> = ({ detail, setDetail }) => {
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);

    // Quill의 툴바 옵션 설정
    const modules = {
        toolbar: [
            ['undo', 'redo'], // Undo, Redo
            [{ 'font': [] }, { 'size': ['10', '12', '14', '18', '20', '22', 'default'] }], // 폰트 크기 및 스타일
            ['bold', 'italic', 'underline', 'strike'], // 텍스트 스타일
            [{ 'color': [] }, { 'background': [] }], // 텍스트 색상 및 배경
            ['link'], // 링크
            [{ 'list': 'ordered' }, { 'list': 'bullet' }], // 리스트
            [{ 'align': [] }], // 텍스트 정렬
            ['indent', '-1', '+1'], // 들여쓰기
            ['clean'], // 서식 초기화
            ['image'], // 이미지 삽입
            ['table'], // 테이블 삽입
        ],
    };

    const editorConfig = {
        placeholder: `${t('detail')}`, // 초기 텍스트
    };

    return (
        <div>
            <div className={styles.mainContainer}>
                <div className={`${styles.editorContainer_classicEditor} editorContainer`}>
                    <div className={`${styles.editorContainer__editor} editorContainer__editor`}>
                        {isLayoutReady && (
                            <ReactQuill
                                value={detail}
                                onChange={(value: string) => setDetail(value)} // Quill에서 텍스트 변경 시 호출
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

export default ForumAddEditor;
