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
import { useUpdateMenuMutation } from '../../store/services/menuApiSlice';
import UseCustomToast from '../../hooks/UseCustomToast';
import { IMenuChildren, IMenus } from './menus.interface';

export default function EditMenu({ open, setOpen, defaultData }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, defaultData: IMenus }) {
    // const [open, setOpen] = React.useState(false);
    const { data } = useGetCategoryQuery({});
    const [updateMenu] = useUpdateMenuMutation();
    const [catData, setCatData] = React.useState<IMenuChildren[]>(defaultData?.children || []);
    const categories = dataResolver.resolveCatalogAutoComplete(data?.data || []);

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        setCatData(defaultData?.children || []);
    }, [defaultData])

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

                        UseCustomToast(updateMenu({ name: formJson.title, children: catData, _id: defaultData._id }), 'Menu updated Successfully');
                        // handleClose();
                    },
                }}
            >
                <DialogTitle>Edit Menu</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        defaultValue={defaultData?.name}
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
