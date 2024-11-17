import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { AddCircleOutline, Clear } from "@mui/icons-material";
import { useUploadImageMutation } from "../../store/services/uploadApiSlice";
import toast from "react-hot-toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DynamicMeaida({ fields, append, remove, setValue, getValues, }: { fields: any[], errors: any, append: any, remove: any, setValue: any, getValues: any }) {
    const [uploadImage] = useUploadImageMutation()
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const fieldData = getValues("images");
    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            {fields.map((field, index) => {
                return (
                    <Box key={field.id}
                        sx={{ position: 'relative' }}
                    >
                        <section className={"section"} key={field.id}>

                            <Button
                                component="label"
                                role={undefined}
                                variant="text"
                                tabIndex={-1}


                            >
                                <Avatar variant="square" src={getValues("images")?.[index]} sx={{ objectFit: 'contain', flexDirection: 'column', width: 100, height: 150 }}
                                >
                                    <Box>
                                        <AddCircleOutline />
                                    </Box>

                                    <Typography variant="caption" component="p">1700x1800</Typography>
                                </Avatar>
                                <VisuallyHiddenInput type="file" onChange={
                                    (e) => {
                                        const file = e.target.files?.[0];

                                        if (file) {
                                            const formData = new FormData();
                                            formData.append("files", file);
                                            toast.promise(uploadImage(formData), {
                                                loading: 'Uploading Image',
                                                success: 'Image Uploaded',
                                                error: 'Error Uploading Image'
                                            })
                                                .then((result: { data: { data: string[] } } | { error: unknown }) => {
                                                    if ('data' in result) {
                                                        setValue(`images.${index}`, result.data.data?.[0]);
                                                    } else {
                                                        console.log(result.error);
                                                    }
                                                });
                                            append({
                                                images: "e"
                                            })
                                        }
                                    }

                                } />
                            </Button>
                            {/* <button type="button" onClick={() => remove(index)}>
                                DELETE
                            </button> */}
                            <IconButton onClick={() => remove(index)}
                                sx={{ position: 'absolute', top: 0, right: 0, display: fieldData[index] === 'e' || fieldData[index]?.images === 'e' ? 'none' : 'block' }}
                                disabled={fields.length === 1}
                            >
                                <Clear color="warning" />
                            </IconButton>
                        </section>
                    </Box>
                );
            })}



        </Box>
    );
}
