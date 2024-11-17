import { Box, Container, Tab, Tabs, Typography } from "@mui/material"
import React from "react";
import GeneralSettings from "./general-settings";
import SocialLinks from "./socail-links";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}


const ShopSettings = () => {
    const [value, setValue] = React.useState(1);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container >
            <Typography color={"text.secondary"}>
                Shop Settings
            </Typography>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab label="General" />
                <Tab label="Footer" />
                <Tab label="Social Links" />
                <Tab label="Shipping & Charges" />
            </Tabs>

            <Box>
                <CustomTabPanel value={value} index={0}>
                    <GeneralSettings />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    Item Two
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <SocialLinks />
                </CustomTabPanel>
            </Box>


        </Container>
    )
}

export default ShopSettings;