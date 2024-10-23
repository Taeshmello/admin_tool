import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    AccessibilityHelp,
    Autoformat,
    Autosave,
    Bold,
    Essentials,
    FontBackgroundColor,
    FontColor,
    FontSize,
    Indent,
    IndentBlock,
    Italic,
    Link,
    Paragraph,
    SelectAll,
    Strikethrough,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextTransformation,
    Underline,
    Undo
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import styles from './ForumEdit.module.css'
import { useTranslation } from 'react-i18next';
interface EditorProps {
    detail: string;
    setDetail: (detail: string) => void;
}



const ForumEditor: React.FC<EditorProps> = ({ detail, setDetail }) => {

    const editorContainerRef = useRef(null)
    const editorRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const {t} = useTranslation()
    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);

    const editorConfig = {
        toolbar: {
            items: [
                'undo',
                'redo',
                '|',
                'fontSize',
                'fontColor',
                'fontBackgroundColor',
                '|',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                '|',
                'link',
                'insertTable',
                '|',
                'outdent',
                'indent'
            ],
            shouldNotGroupWhenFull: false
        },
        plugins: [
            AccessibilityHelp,
            Autoformat,
            Autosave,
            Bold,
            Essentials,
            FontBackgroundColor,
            FontColor,
            FontSize,
            Indent,
            IndentBlock,
            Italic,
            Link,
            Paragraph,
            SelectAll,
            Strikethrough,
            Table,
            TableCaption,
            TableCellProperties,
            TableColumnResize,
            TableProperties,
            TableToolbar,
            TextTransformation,
            Underline,
            Undo
        ],
        fontSize: {
            options: [10, 12, 14, 'default', 18, 20, 22],
            supportAllValues: true
        },
        initialData: '',
        link: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://',
            decorators: {
                toggleDownloadable: {
                    mode: 'manual' as 'manual',
                    label: 'Downloadable',
                    attributes: {
                        download: 'file'
                    }
                }
            }
        },
        placeholder: `${t('detail')}`,
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        }
    };

    return (
        <div>
            <div className={styles.mainContainer}>
                <div className={`${styles.editorContainer_classicEditor} editorContainer`}>
                    <div className={`${styles.editorContainer__editor} editorContainer__editor`}
                        ref = {editorContainerRef}>
                        <div ref={editorRef}>
                            {isLayoutReady && (
                                <CKEditor
                                    editor={ClassicEditor}
                                    config={editorConfig}
                                    data={detail}
                                    onChange={(e:any, editor: any) => {
                                        const data = editor.getData();
                                        setDetail(data)
                                    }}

                                />
                            )}
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForumEditor;	
