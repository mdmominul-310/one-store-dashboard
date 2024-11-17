import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { AddCircleOutline, Clear } from "@mui/icons-material";
import { useUploadImageMutation } from "../../store/services/uploadApiSlice";
import toast from "react-hot-toast";
import { useFieldArray, useForm } from "react-hook-form";
import UseCustomToast from "../../hooks/UseCustomToast";
import { useCreateBannerMutation, useGetBannerQuery } from "../../store/services/bannerApiSlice"
import { useEffect } from "react";

export default function Banner() {
    const { control, getValues, setValue, handleSubmit } = useForm({
        // defaultValues: {}; you can populate the fields by this attribute 
        defaultValues: {
            images: ['e']
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "images" as never
    });

    const [uploadImage] = useUploadImageMutation();
    const [createBanner] = useCreateBannerMutation();
    const { data, isLoading } = useGetBannerQuery({});
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

    const onSubmit = (data: { images: string[] }) => {
        data.images.pop();
        UseCustomToast(createBanner({ meadia: data.images }), 'uploading banner')
    }

    useEffect(() => {
        if (data?.data?.meadia?.length > 0) {
            setValue('images', data?.data?.meadia);
            append('e');
        }

    }, [data, append, setValue]);

    const fieldData = getValues("images");
    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <Box>
            <Typography variant="h6" component="h6">Banner Images</Typography>
            <Box sx={{ display: 'grid', gridColumn: 2, gap: 2 }}>
                {fields.map((field, index) => {
                    return (
                        <Box key={field.id}
                            sx={{ position: 'relative', mt: 2 }}
                        >
                            <section className={"section"} key={field.id}>

                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="text"
                                    tabIndex={-1}


                                >
                                    <Avatar
                                        variant="square"
                                        src={getValues("images")?.[index] as string}
                                        sx={{ objectFit: 'contain', width: '75vw', height: 200 }}
                                    >


                                        <AddCircleOutline />
                                        <Typography variant="caption">(1910x666)</Typography>
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
                                                append('e')
                                            }
                                        }

                                    } />
                                </Button>
                                {/* <button type="button" onClick={() => remove(index)}>
                                DELETE
                            </button> */}
                                <IconButton onClick={() => remove(index)}
                                    sx={{ position: 'absolute', top: 0, right: 0, display: fieldData[index] === 'e' ? 'none' : 'block' }}
                                    disabled={fields.length === 1}
                                >
                                    <Clear color="warning" />
                                </IconButton>
                            </section>
                        </Box>
                    );
                })}



            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Button type="submit">Submit</Button>
            </form>
        </Box>
    );
}
