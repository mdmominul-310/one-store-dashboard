import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form";

type IShopSettings = {
    shopName?: string,
    shopPhone?: string,
    shopEmail?: string,
    shopCategory?: string,
    shopDescription?: string,
    shopAddress?: string,
}

const GeneralSettings = () => {
    const { handleSubmit, register } = useForm<IShopSettings>({});
    const onSubmit: SubmitHandler<IShopSettings> = (data) => {
        console.log(data)
    }
    return (
        <Container >
            <Typography color={"text.secondary"}>
                General Settings
            </Typography>
            <Box sx={{ mt: 2 }}>
                <form onSubmit={handleSubmit(onSubmit)} style={{ flexDirection: 'column', gap: 20, display: 'flex' }}>
                    <TextField placeholder="Shop Name" fullWidth label="Shop Name" variant="outlined" {...register("shopName")} />
                    <TextField placeholder="Shop Phone" fullWidth label="Shop Phone" variant="outlined" {...register("shopPhone")} />
                    <TextField placeholder="Shop Email" fullWidth label="Shop Email" variant="outlined" {...register("shopEmail")} />
                    <TextField placeholder="Shop Category" fullWidth label="Shop Category" variant="outlined" {...register("shopCategory")} />
                    <TextField placeholder="Shop Description" fullWidth label="Shop Description" type="textArea" rows={3} variant="outlined" {...register("shopDescription")} />
                    <Button variant="outlined" type="submit">Save</Button>
                </form>
            </Box>
        </Container>
    )
}

export default GeneralSettings;