/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete } from '@mui/material';
import { useGetCategoryQuery } from '../../store/services/categoryApiSlice';
import dataResolver from '../../utils/data-resolver';
import { useAddMenuMutation } from '../../store/services/menuApiSlice';
import UseCustomToast from '../../hooks/UseCustomToast';

export default function AddMenu({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    // const [open, setOpen] = React.useState(false);
    const { data } = useGetCategoryQuery({});
    const [addMenu] = useAddMenuMutation();
    const [catData, setCatData] = React.useState<any>([]);
    const categories = dataResolver.resolveCatalogAutoComplete(data?.data || []);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        UseCustomToast(addMenu({ name: formJson.title, children: catData }), 'Menu Added Successfully');
                        // handleClose();
                    },
                }}
            >
                <DialogTitle>Add Menu</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="title"
                        required
                        label="Menu Title"
                        fullWidth
                        variant="standard"
                    />

                    <Autocomplete
                        options={categories || []}
                        getOptionLabel={(option) => option.title}
                        multiple
                        id="categories"
                        value={catData}
                        onChange={(_event, newValue) => {
                            setCatData(newValue);
                        }}
                        filterOptions={(options, params) => {
                            const filtered = options.filter((option) => {
                                return option.title.toLowerCase().includes(params.inputValue.toLowerCase());
                            });
                            if (filtered.length === 0) {
                                return options;
                            }
                            return filtered;
                        }}
                        renderInput={(params) => <TextField {...params} label="Categories" variant='standard' />}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
