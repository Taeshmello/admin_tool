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
	Undo,
	
} from 'ckeditor5';



import 'ckeditor5/ckeditor5.css';
import EditorStyle from './Editor.module.css';


interface EditorProps {
    detail: string;
    setDetail: (detail: string) => void;
}



const Editor: React.FC<EditorProps> = ({detail,setDetail}) => {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);

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
		placeholder: '내용',
		image: {
            toolbar: [
                'imageTextAlternative', // 이미지 대체 텍스트
                'imageStyle:inline', 'imageStyle:block', 'imageStyle:side' // 이미지 스타일
            ]
        },
		table: {
			contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
		}
	};

	return (
		<div>
            <div className={EditorStyle.mainContainer}>
                <div className={`${EditorStyle.editorContainer_classicEditor} editorCcontainer`}>
                    <div className={`${EditorStyle.editorContainer__editor} editorContainer__editor`} ref={editorContainerRef}>
                        <div ref={editorRef}>
                            {isLayoutReady && (
                                <CKEditor
                                    editor={ClassicEditor}
                                    config={editorConfig}
                                    data={detail} // 에디터에 초기 데이터 설정
                                    onChange={(e:any, editor:any) => {
                                        const data = editor.getData();
                                        setDetail(data); // 에디터 내용이 변경될 때마다 상태 업데이트
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

export default Editor;	
