/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useUpdatePromotionMutation } from '../../store/services/promotionApiSlice';
import { IPromo } from './menus.interface';
import UseCustomToast from '../../hooks/UseCustomToast';

export default function EditPromo({ open, setOpen, defaultData }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, defaultData: IPromo }) {
    const [updatePromotion] = useUpdatePromotionMutation()


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
                        UseCustomToast(updatePromotion({ ...formJson, _id: defaultData._id }), "Promo Updated Successfully")
                    },
                }}
            >
                <DialogTitle>Edit Promo</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        defaultValue={defaultData?.title}
                        id="name"
                        name="title"
                        required
                        label="Title"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        defaultValue={defaultData?.url}

                        autoFocus
                        margin="dense"
                        id="url"
                        name="url"
                        required
                        label="Url"
                        fullWidth
                        variant="standard"
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
