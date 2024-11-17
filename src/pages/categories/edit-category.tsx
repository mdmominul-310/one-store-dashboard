import { Box, Button, Container, styled, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetSingleCategoryQuery, useUpdateCategoryMutation } from "../../store/services/categoryApiSlice";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UseCustomToast from "../../hooks/UseCustomToast";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CatalogSkeletons from "../../component/ui/skeletons/calatog-skeletons";
import { useUploadImageMutation } from "../../store/services/uploadApiSlice";
type Category = {
    name: string;
    description: string;
}
const EditCategory = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<Category>();
    const catid = useParams<{ id: string }>().id;
    const { data, isLoading, isError } = useGetSingleCategoryQuery(catid);
    const [file, setFile] = useState<File[] | null>(null);
    const [image, setImage] = useState<string | null>(null);
    // eslint-disable-next-line no-unsafe-optional-chaining
    const [updateCategory] = useUpdateCategoryMutation();
    const [uploadImage, { data: imgData, isError: imgError }] = useUploadImageMutation();
    const onSubmit: SubmitHandler<Category> = (data: Category) => {
        UseCustomToast(updateCategory({ ...data, image, id: catid }), 'updating Category');
    }

    useEffect(() => {
        if (data?.data) {
            setValue('name', data.data.name);
            setValue('description', data.data.description);
            setImage(data?.data?.image);
        }
    }, [data, setValue]);


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
        if (!imgError && imgData) {
            setImage(imgData?.data[0]);
        }
    }, [imgData, imgError])

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
    if (isError || !data?.data && !isLoading) {
        return <Typography variant="h6">Something went wrong</Typography>
    }



    return (
        <Container>
            <Typography variant="h6" fontWeight={600}>Edit Category</Typography>
            {
                isLoading ? <CatalogSkeletons /> :
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Name"
                            fullWidth
                            margin="normal"
                            {...register('name', { required: 'Name is required' })}
                            error={errors.name ? true : false}
                            helperText={errors.name ? errors.name.message : ''}
                        />
                        <TextField
                            label="Description"
                            fullWidth
                            margin="normal"
                            {...register('description', { required: 'Description is required' })}
                            error={errors.description ? true : false}
                            helperText={errors.description ? errors.description.message : ''}
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

                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </form>
            }

        </Container>
    );
}

export default EditCategory;
