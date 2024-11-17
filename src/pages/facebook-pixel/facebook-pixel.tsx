import { Box, Button, TextField, Typography } from "@mui/material"
import { useGetSystemConfigQuery, useUpdateSystemConfigMutation } from "../../store/services/systemConfigApiSlice"
import { useState } from "react";
import UseCustomToast from "../../hooks/UseCustomToast";

const FacebookPixel = () => {
    const { data, isLoading, isError } = useGetSystemConfigQuery({});
    const [updateSystemConfig] = useUpdateSystemConfigMutation();
    const [fbPixelId, setFbPixelId] = useState<string>(data?.data?.fbPixelId);

    if (isLoading) return <Box>Loading...</Box>
    if (isError) return <Box>Something wrong!</Box>
    return (
        <Box>
            <Typography variant="h6" color={"text.secondary"}>Facebook Pixel</Typography>
            <Typography variant="body2" color={"text.secondary"}>Facebook Pixel is a tool that helps you track conversions from your Facebook ads, optimize ads, build targeted audiences for future ads, and remarket to people who have already taken some kind of action on your website.</Typography>

            <TextField
                label="Facebook Pixel ID"
                defaultValue={data?.data?.fbPixelId}
                onChange={(e) => setFbPixelId(e.target.value)}

                fullWidth
                margin="normal"
                variant="outlined"
            />
            <Button variant="contained" color="primary" sx={{ mt: 2 }}
                onClick={() => UseCustomToast(updateSystemConfig({ fbPixelId: fbPixelId }), 'Updating Facebook Pixel')}
            >Save</Button>
        </Box>
    )
}

export default FacebookPixel