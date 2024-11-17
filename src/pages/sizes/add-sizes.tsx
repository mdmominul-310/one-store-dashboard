import { Button, CircularProgress, Container, TextField, Typography } from "@mui/material";

import { SubmitHandler, useForm } from "react-hook-form";
import UseCustomToast from "../../hooks/UseCustomToast";
import { useAddSizeMutation } from "../../store/services/sizeApiSlice";
type Category = {
    name: string;
    description: string;
}
const AddSize = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Category>();
    const [addSize] = useAddSizeMutation();
    const onSubmit: SubmitHandler<Category> = (data: Category) => {
        UseCustomToast(addSize(data), 'Adding Size');
    }



    return (
        <Container>
            <Typography variant="h6" fontWeight={600}>Add Size</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Size Name"
                    placeholder="Enter size name"
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
                <Button type="submit" variant="contained" sx={{ mt: 4, float: 'right' }} >
                    <CircularProgress sx={{ color: 'white', display: 'none' }} />
                    Add Category
                </Button>
                {/* <LoadingButton>dkfj</LoadingButton> */}
            </form>

        </Container>
    );
}

export default AddSize;
