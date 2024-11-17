import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, ListItemButton, ListItemIcon, ListItemText, colors, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

type IItem = {
    title: string,
    route: string,
    icon?: JSX.Element
}

interface ItemProps extends IItem {
    children?: IItem[]
}

const DashboardSidebar = ({ open, item }: { open: boolean, item: ItemProps }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const handleNavigation = (route: string) => {
        // navigate to route
        navigate(route);
    }
    return (
        <>
            {
                (item?.children?.length ?? 0) > 0 ? (
                    <>
                        {
                            open ? <Accordion sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                boxShadow: 'none',
                                backgroundImage: 'none',
                                ":hover": {
                                    backgroundColor: theme.palette.mode === 'dark' ? colors.grey[900] : colors.grey[200],
                                },
                            }}

                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    sx={{
                                        minHeight: 48,
                                        p: 0,
                                        pl: 2.5,
                                        pr: 1,
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {item?.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.title} sx={{ display: open ? 'block' : 'hidden', }} />
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails
                                    sx={
                                        {
                                            display: 'block',
                                            p: 0,
                                            m: 0,
                                            mt: -2,
                                        }
                                    }
                                >
                                    {
                                        item?.children?.map((child, index) => (
                                            <ListItemButton
                                                key={index}
                                                onClick={() => handleNavigation(child.route)}
                                                sx={{
                                                    // minHeight: 48,
                                                    m: 0,
                                                    justifyContent: open ? 'initial' : 'center',
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        mr: open ? 3 : 'auto',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {child.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={child.title} sx={{ opacity: open ? 1 : 0 }} />
                                            </ListItemButton>
                                        ))
                                    }
                                </AccordionDetails>
                            </Accordion> :
                                <>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,

                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {item?.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </>
                        }
                    </>
                ) : (
                    <>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: open ? 5 : 2.5,
                            }}
                            onClick={() => handleNavigation(item.route)}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                {item?.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </>
                )
            }

        </>
    );
}
export default DashboardSidebar;