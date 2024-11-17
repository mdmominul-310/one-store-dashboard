import { Box, Skeleton } from "@mui/material";

const CatalogSkeletons = () => {
    return (
        <Box>
            <Skeleton variant="rectangular" width="100%" height={40} />
            <Skeleton variant="rectangular" width="100%" height={120} sx={{ my: 4 }} />
            <Skeleton variant="rectangular" width="10%" height={20} />
        </Box>
    );
}

export default CatalogSkeletons;