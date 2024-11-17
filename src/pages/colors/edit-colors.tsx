import { Button, Container, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateCategoryMutation } from "../../store/services/categoryApiSlice";
import UseCustomToast from "../../hooks/UseCustomToast";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetSingleColorQuery } from "../../store/services/colorsApiSlice";
import CatalogSkeletons from "../../component/ui/skeletons/calatog-skeletons";
type Category = {
    name: string;
    description: string;
}
const EditColors = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<Category>();
    const catid = useParams<{ id: string }>().id;
    const { data, isLoading, isError } = useGetSingleColorQuery(catid);
    // eslint-disable-next-line no-unsafe-optional-chaining
    const [updateCategory] = useUpdateCategoryMutation();
    const onSubmit: SubmitHandler<Category> = (data: Category) => {
        UseCustomToast(updateCategory({ ...data, id: catid }), 'updating Category');
    }

    useEffect(() => {
        if (data?.data) {
            setValue('name', data?.data?.name);
            setValue('description', data?.data?.description);
        }
    }, [data, setValue]);

    if (isError || !data?.data && !isLoading) {
        return <Typography variant="h6" sx={{ color: 'red' }}>Something went wrong!</Typography>
    }

    return (
        <Container>
            <Typography variant="h6" fontWeight={600}>Edit Color</Typography>
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
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </form>
            }

        </Container>
    );
}

export default EditColors;
