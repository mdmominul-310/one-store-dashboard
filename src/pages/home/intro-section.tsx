import { Box, Card, CardContent, Grid, Typography, colors } from "@mui/material";
import welcome from '../../assets/images/welcome.svg';
import { ArrowUpward } from "@mui/icons-material";

const IntroSection = () => (
    <Box sx={{ my: 5, display: 'flex', gap: 4 }}>
        <Box sx={{ width: '50%' }}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 16 }} color={colors.cyan[800]} gutterBottom>
                        Good Morning, User
                    </Typography>
                    <Typography variant="h5" color="text.secondary" sx={{ fontSize: 14 }}>
                        Here’s what happening with your store today!
                    </Typography>
                    <Box sx={{ my: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                <Box>
                                    <Typography variant="h5" color="text.primary">1,00,000</Typography>
                                    <Typography variant="body2" color="text.secondary">Total visit</Typography>
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="h5" color="text.primary">$ 1,00,000</Typography>
                                    <Typography variant="body2" color="text.secondary">Total Sales</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <img src={welcome} alt="sales" style={{ width: "100%" }} />
                            </Box>
                        </Box>
                    </Box>
                </CardContent>

            </Card>
        </Box>

        <Box sx={{ width: '50%' }}>
            <Grid container columns={{ lg: 17 }} columnGap={3} rowGap={7} >
                {
                    Array.from({ length: 4 }).map((_, idx) => (
                        <Grid item key={idx} lg={8} >
                            <Card sx={{ width: '100%' }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Order
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        500,00
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                                        <Typography>
                                            9321
                                        </Typography>

                                        <Typography fontSize={14} fontWeight={300}>
                                            <ArrowUpward sx={{ fontWeight: 300, fontSize: 13 }} />   25%
                                        </Typography>
                                    </Box>
                                </CardContent>

                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    </Box>
);

export default IntroSection;
