import { Box } from "@mui/material";
import IntroSection from "./intro-section";
import AnalaticsChart from "./analitics-chart";

const Home = () => {
    return (
        <Box sx={{ mx: 10 }}>
            <IntroSection />
            <AnalaticsChart>
            </AnalaticsChart>
        </Box>
    )
}

export default Home;