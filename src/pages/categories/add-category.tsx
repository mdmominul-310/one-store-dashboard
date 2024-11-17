import { Box, Button, CircularProgress, Container, styled, TextField, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddCategoryMutation } from "../../store/services/categoryApiSlice";
import UseCustomToast from "../../hooks/UseCustomToast";
import { useEffect, useState } from "react";
import { useUploadImageMutation } from "../../store/services/uploadApiSlice";
type Category = {
    name: string;
    description: string;
}
const AddCategory = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Category>();
    const [file, setFile] = useState<File[] | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [uploadImage, { data, isSuccess }] = useUploadImageMutation();
    const [addCategory] = useAddCategoryMutation();
    const onSubmit: SubmitHandler<Category> = (data: Category) => {
        UseCustomToast(addCategory({ ...data, image }), 'Adding Category');
    }

    useEffect(() => {
        if (file) {
            const formData = new FormData();
            formData.append('files', file[0]);
            UseCustomToast(uploadImage(formData), 'Uploading Image');

        }
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [file])

    useEffect(() => {
        if (isSuccess && data) {
            setImage(data?.data[0]);
        }
    }, [data, isSuccess])



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
    return (
        <Container>
            <Typography variant="h6" fontWeight={600}>Add Category</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Category Name"
                    placeholder="Enter category name"
                    {...register('name', { required: true })}
                    size="small"
                    error={errors.name ? true : false}
                    fullWidth
                />
                <TextField
                    sx={{ mt: 2 }}
                    label="Description"
                    placeholder="Enter description"
                    multiline

                    error={errors.description ? true : false}
                    minRows={4}
                    {...register('description', { required: true })}
                    fullWidth
                />
                <Box
                    sx={{
                        width: '30%',
                        margin: 'auto',
                    }}
                >
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        // fullWidth
                        sx={{
                            mt: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '150px',

                        }}
                        startIcon={<CloudUploadIcon />}
                    >
                        {
                            image ? <img src={image} alt="category" style={{ width: '100%', height: '100%', objectFit: 'cover', }} /> : 'Upload Image'
                        }
                        <VisuallyHiddenInput type="file" onChange={(e) => setFile(e.target.files ? Array.from(e.target.files) : null)} />
                    </Button>
                </Box>



                <Button type="submit" variant="contained" sx={{ mt: 4, float: 'right' }} >
                    <CircularProgress sx={{ color: 'white', display: 'none' }} />
                    Add Category
                </Button>
                {/* <LoadingButton>dkfj</LoadingButton> */}
            </form>

        </Container>
    );
}

export default AddCategory;
