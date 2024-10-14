declare module 'ckeditor4-react' {
    import { FC } from 'react';

    export interface CKEditorProps {
        data?: string;
        config?: any;
        onChange?: (event: any) => void;
    }

    const CKEditor: FC<CKEditorProps>;
    export default CKEditor;
}
