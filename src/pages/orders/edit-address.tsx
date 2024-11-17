import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IOrders } from './orders.interface';
import { useUpdateOrderMutation } from '../../store/services/orderApiSlice';
import UseCustomToast from '../../hooks/UseCustomToast';

export default function EditAddress({ orders }: { orders: IOrders }) {
    const [open, setOpen] = React.useState(false);
    const [updateOrder] = useUpdateOrderMutation()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Edit Address
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData).entries());
                        const address: string = formJson?.address?.toString() || orders.address;
                        const deliveryArea: string = formJson?.deliveryArea?.toString() || orders.deliveryArea;
                        UseCustomToast(updateOrder({ data: { address, deliveryArea }, id: orders._id as string }), 'Order Updated Successfully',)
                        // handleClose();
                    },
                }}
            >
                <DialogTitle>Edit Adress</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {/* To subscribe to this website, please enter your email address here. We
                        will send updates occasionally. */}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        defaultValue={orders.address}
                        margin="dense"
                        id="address"
                        name="address"
                        label=" Address"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        defaultValue={orders.deliveryArea}
                        margin="dense"
                        id="deliveryArea"
                        name="deliveryArea"
                        label="Delivery Area"
                        type="text"
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
