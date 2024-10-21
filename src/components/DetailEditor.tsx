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
import EditorStyle from './Editor.module.css';


interface EditorProps {
    detail: string;
    setDetail: (detail: string) => void;
}



const DetailEditor: React.FC<EditorProps> = ({detail,setDetail}) => {
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
		table: {
			contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
		}
	};

	return (
        <div>
            <div className={EditorStyle.mainContainer}>
                <div className={`${EditorStyle.editorContainer_classicEditor} editorContainer`}>
                    <div className={`${EditorStyle.editorContainer__editor} editorContainer__editor`} ref={editorRef}>
                        <CKEditor
                            editor={ClassicEditor}
                            config={editorConfig}
                            data={detail} 
                            onChange={(event: any, editor: any) => {
                                const data = editor.getData();
                                setDetail(data);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailEditor;	
