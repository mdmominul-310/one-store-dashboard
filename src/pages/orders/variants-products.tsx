import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Box, Card, Grid, Typography } from '@mui/material';
import { IOrderStock, IVarinatProducts } from './orders.interface';
import { useUpdateOrderMutation } from '../../store/services/orderApiSlice';
import UseCustomToast from '../../hooks/UseCustomToast';



export default function VarinatProducts({ product, open, setOpen }: IVarinatProducts) {
    const [select, setSelect] = React.useState<IOrderStock | null>(null);
    // console.log(product)
    const [updateOrder] = useUpdateOrderMutation()
    const handleClose = () => {
        setOpen(false);
    };



    return (
        <React.Fragment>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.stopPropagation();
                        event.preventDefault();
                        const data = {
                            id: product._id,
                            title: product.title,
                            price: select?.salePrice as string,
                            regularPrice: select?.regularPrice as string,
                            qty: 1,
                            variant: select?.variant as string,
                            attributes: [{
                                key: select?.variant,
                                value: select?.variant
                            }]
                        }

                        UseCustomToast(updateOrder({ data: data, id: product._id as string }), 'Order Updated Successfully',)

                    },
                }}
            >
                <DialogTitle> variants</DialogTitle>
                <DialogContent>
                    <Box>
                        {
                            product?.stock?.map((variant) => {
                                return <Grid container spacing={2} columns={12}>
                                    <Grid item key={variant._id} xs={3} >
                                        <Card sx={{
                                            cursor: 'pointer',
                                            border: select === variant ? '1px solid green' : '1px solid #ccc',
                                            p: 1
                                        }}
                                            onClick={() => setSelect(variant)}
                                        >
                                            <Typography>
                                                {variant.variant}, {variant.salePrice}
                                            </Typography>
                                            <Typography sx={{ textAlign: 'center', bgcolor: 'green', borderRadius: 5 }}>
                                                <span>{variant.quantity}</span>
                                            </Typography>

                                        </Card>
                                    </Grid>
                                </Grid>
                            }
                            )
                        }
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
