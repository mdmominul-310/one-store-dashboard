import { UploadFile } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';

function Dropzone() {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    const formData = new FormData();
    useEffect(() => {
        acceptedFiles.forEach((file) => {
            formData.append('files', file);
        });
        // Now you can use formData to send the files to the server
        // For example, using fetch:
        // fetch('/upload', { method: 'POST', body: formData });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [acceptedFiles]);
    const files = acceptedFiles.map((file: FileWithPath) => (
        <div key={file.path}>
            {file.path} - {file.size} bytes
            {file.type.startsWith('image/') && <img src={URL.createObjectURL(file)} alt="" style={{ width: '100%', objectFit: 'contain', maxHeight: 100 }} />}
        </div>
    ));


    return (
        <section className="container">
            <Box {...getRootProps({ className: 'dropzone' })}
                sx={{
                    border: '1px dashed ',
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // bgcolor: colors.blueGrey[50],

                }}
            >
                <div>
                    <input {...getInputProps()} />
                    <div style={{ display: 'block', textAlign: 'center' }}>
                        <p>Drag 'n' drop some files here, or click to select files</p>
                        <UploadFile sx={{
                            fontSize: '3rem',
                            color: "gold",
                            cursor: 'pointer',
                            textAlign: 'center',
                        }} />
                    </div>
                </div>
            </Box>
            <aside>
                <h4>Files</h4>
                <div style={{ display: 'flex', gap: 4, }}>
                    {files}
                </div>
            </aside>
        </section>
    );
}

export default Dropzone;