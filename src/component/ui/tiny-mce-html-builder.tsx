/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useTheme } from '@mui/material';


export default function TinyMceHtmlBuilder({ setValue, getValue }: { register: any, setValue: any, getValue?: any }) {
    // const [defaultData, setDefaultValue] = useState<string>("write here your description");
    const editorRef = useRef<any>(null);
    const theme = useTheme();
    const log = () => {
        if (editorRef.current) {
            setValue("description", editorRef.current.getContent());
        }
    };

    // useEffect(() => {
    //     if (getValue) {
    //         setDefaultValue(getValue("description"));
    //     }
    // }
    //     , [getValue]);

    return (
        <>
            <label htmlFor="description">Description</label>
            <Editor
                apiKey='3zhb7mjekf938wtp2cdu0c82lm5bz4yf5dbwtrar26yyzgq6'
                onInit={(_evt, editor) => {
                    editorRef.current = editor
                }}
                onChange={log}
                initialValue={getValue("description") || "write here your description"}
                init={{
                    color_cols: 10,
                    color_cols_foreground: 10,
                    skin: theme.palette.mode === 'dark' ? 'oxide-dark' : 'oxide',
                    content_css: theme.palette.mode === 'dark' ? 'dark' : 'default',
                    browser_spellcheck: true,
                    plugins:
                        "anchor autolink charmap codesample emoticons forecolor backcolor image link lists media searchreplace table fullscreen visualblocks wordcount insertdatetime directionality",
                    toolbar:
                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough forecolor backcolor | link image media table | numlist bullist indent outdent align lineheight | fullscreen ltr rtl insertdatetime | emoticons charmap | removeformat",
                    toolbar_mode: "wrap",
                }}
            />

        </>
    );
}