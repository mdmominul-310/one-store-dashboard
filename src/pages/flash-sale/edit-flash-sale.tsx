import { Autocomplete, Box, Button, styled, TextField } from "@mui/material"
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState } from "react";
import UseCustomToast from "../../hooks/UseCustomToast";
import { useUploadImageMutation } from "../../store/services/uploadApiSlice";
import { useGetProductsQuery } from "../../store/services/productsApiSlice";
import { useGetSingleFlashSaleQuery, useUpdateFlashSaleMutation } from "../../store/services/flashSaleApiSlice";
import { IFlashSale } from "./flash-sale.interface";
import { useParams } from "react-router-dom";
import dataResolver from "../../utils/data-resolver";

// import { IFlashSale } from "./flash-sale.interface";

const EditFlashSale = () => {
    const { register, handleSubmit, control, setValue } = useForm();
    const [file, setFile] = useState<File[] | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [uploadImage, { data, isSuccess }] = useUploadImageMutation();
    const { data: productsData } = useGetProductsQuery({});
    const id = useParams<{ id: string }>().id;
    const { data: flashSaleData, isLoading } = useGetSingleFlashSaleQuery(id as string);
    const [updateFlashSale] = useUpdateFlashSaleMutation();


    const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
        data.featured = false;
        data.status = true;
        const startDate = dataResolver.toLocalISOString(new Date(data.startDate));
        const endDate = dataResolver.toLocalISOString(new Date(data.endDate));
        data.startDate = startDate;
        data.endDate = endDate;
        // UseCustomToast(AddFlashSale(data as IFlashSale), 'Adding Flash Sale');

        UseCustomToast(updateFlashSale({ id: id as string, data: data as IFlashSale }), 'Updating Flash Sale');
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
            setValue("banner", data?.data[0])
        }
    }, [data, isSuccess, setValue]);

    // set default flash sale data using useEffect
    useEffect(() => {
        if (flashSaleData?.data) {
            setValue("title", flashSaleData?.data.title);
            setValue("description", flashSaleData?.data.description);
            setValue("startDate", new Date(flashSaleData?.data.startDate).toISOString().slice(0, 16))
            setValue("endDate", new Date(flashSaleData?.data.endDate).toISOString().slice(0, 16));
            setValue("discount", flashSaleData?.data.discount);
            setValue("products", flashSaleData?.data?.products?.map((item: IFlashSale) => (item._id)));
            setImage(flashSaleData?.data?.banner);
        }
    }, [flashSaleData, setValue]);

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

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <TextField
                        {...register("title", { required: true })}
                        label="Title"
                        name="title"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder="Flash Sale Title"
                    />
                </Box>
                <Box>
                    <TextField
                        {...register("description")}
                        label="Description"
                        name="description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder="Flash Sale Description"
                    />
                </Box>

                <Box
                    sx={{
                        width: '100%',
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
                            height: '200px',

                        }}
                        startIcon={<CloudUploadIcon />}
                    >
                        {
                            image ? <img src={image} alt="category" style={{ width: '100%', height: '100%', objectFit: 'cover', }} /> : 'Upload Image'
                        }
                        <VisuallyHiddenInput type="file" onChange={(e) => setFile(e.target.files ? Array.from(e.target.files) : null)} />
                    </Button>
                </Box>
                <Box sx={{
                    display: 'flex',
                    gap: 2
                }}>
                    <TextField
                        {...register("startDate", { required: true })}
                        label="Start Date"
                        name="startDate"
                        placeholder="start date"
                        variant="outlined"
                        fullWidth

                        margin="normal"
                        focused
                        type="datetime-local"
                    />

                    <TextField
                        {...register("endDate", { required: true })}
                        label="End Date"
                        name="endDate"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="datetime-local"
                        focused
                    />
                </Box>

                <Box>
                    <Controller
                        control={control}
                        name="products"
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Autocomplete
                                {...field}
                                onChange={(_event, value) => setValue("products", value.map((item) => (item._id)))}
                                multiple
                                options={productsData?.data || []}
                                value={productsData?.data?.filter((item: IFlashSale) => field?.value?.includes(item._id))}
                                getOptionLabel={(option) => option.title}
                                isOptionEqualToValue={(option, value) => {
                                    return option.title === value.title;
                                }}
                                renderInput={(params) => <TextField {...params} label="Products" />}
                            />
                        )}
                    />

                </Box>

                <Box>
                    <TextField
                        {...register("discount", { required: true })}
                        label="Discount"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder="Flash Sale Discount"
                    />


                </Box>

                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
        </Box>
    )
}

export default EditFlashSale