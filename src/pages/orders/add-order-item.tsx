import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { IOrderProducts, IOrders } from './orders.interface';
import { useUpdateOrderMutation } from '../../store/services/orderApiSlice';
import UseCustomToast from '../../hooks/UseCustomToast';
import { Box, Grid } from '@mui/material';
import { useGetProductsQuery } from '../../store/services/productsApiSlice';
import ProductCard from './product-card';

export default function AddOrderItem({ orders }: { orders: IOrders }) {
    const [open, setOpen] = React.useState(false);
    const [updateOrder] = useUpdateOrderMutation()
    const { data, isLoading } = useGetProductsQuery({})


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Item
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
                <DialogTitle>Add Product</DialogTitle>
                <DialogContent>
                    <Box>
                        {isLoading ? 'Loading...' :
                            <Grid container spacing={2} columns={12}>
                                {data?.data?.map((product: IOrderProducts) => {
                                    return <Grid item key={product._id} xs={4} >
                                        <ProductCard product={product} />
                                    </Grid>
                                })}
                            </Grid>}
                        {/* data?.d
                        ata?.map((product: IProducts) => {
                            return <Box key={product._id}>
                                <ProductCard product={product} />
                            </Box>
                        })} */}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
