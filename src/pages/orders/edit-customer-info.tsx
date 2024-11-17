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
import { FormControl, Select } from '@mui/material';

export default function EditCustomerInfo({ orders }: { orders: IOrders }) {
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
                Edit Customer Info
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
                        const formJson: Record<string, string> = {};
                        formData.forEach((value, key) => {
                            formJson[key] = value.toString();
                        });
                        UseCustomToast(updateOrder({ data: formJson, id: orders._id as string }), 'Order Updated Successfully',)
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
                        defaultValue={orders.fullName}
                        margin="dense"
                        id="name"
                        name="fullName"
                        label=" name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        defaultValue={orders.phoneNumber}
                        margin="dense"
                        id="phone"
                        name="phoneNumber"
                        label=" Phone Number"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    {/* <TextField
                        required
                        defaultValue={orders.em}
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email"
                        type="text"
                        fullWidth
                        variant="standard"
                    /> */}
                    <FormControl fullWidth variant='standard'>
                        <Select
                            native
                            defaultValue={orders.status}
                            inputProps={{
                                name: 'status',
                                id: 'status',
                            }}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </Select>
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
