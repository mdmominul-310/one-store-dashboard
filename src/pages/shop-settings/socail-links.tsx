import { AppShortcutRounded, Facebook, Instagram, PlaylistAddRounded, Twitter, YouTube } from "@mui/icons-material";
import { Box, Button, Container, InputAdornment, TextField, Typography } from "@mui/material";

export default function SocialLinks() {
    return (
        <Container>
            <Typography color={"text.secondary"}>
                Social Links
            </Typography>
            <Box sx={{ mt: 2 }}>
                <form style={{ flexDirection: 'column', gap: 20, display: 'flex' }}>

                    <TextField
                        id="input-with-icon-textfield"
                        label="Facebook"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Facebook />
                                </InputAdornment>
                            ),
                        }}

                    />
                    <TextField
                        id="input-with-icon-textfield"
                        label="Instagram"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Instagram />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        id="input-with-icon-textfield"
                        label="Twitter"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Twitter />
                                </InputAdornment>
                            ),
                        }} />

                    <TextField
                        id="input-with-icon-textfield"
                        label="YouTube"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <YouTube />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        id="input-with-icon-textfield"
                        label="Play Store"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    M<PlaylistAddRounded />
                                </InputAdornment>
                            ),
                        }}

                    />

                    <TextField
                        id="input-with-icon-textfield"
                        label="App Store"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AppShortcutRounded />
                                </InputAdornment>
                            ),
                        }}

                    />
                    <Button variant="outlined">Save</Button>
                </form>
            </Box>
        </Container>
    )
}
