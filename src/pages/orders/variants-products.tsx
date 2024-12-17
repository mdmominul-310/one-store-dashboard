import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { Box, Card, Grid, Typography } from "@mui/material";
import { IOrderStock, IVariantProducts } from "./orders.interface";
import { useUpdateOrderMutation } from "../../store/services/orderApiSlice";
import UseCustomToast from "../../hooks/UseCustomToast";

export default function VariantProducts({
  product,
  order,
  open,
  setOpen,
}: IVariantProducts) {
  const [select, setSelect] = React.useState<IOrderStock | null>(null);
  // console.log(product)
  const [updateOrder] = useUpdateOrderMutation();
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
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.stopPropagation();
            event.preventDefault();
            if (!select) {
              return;
            }
            const attData = select.variant.split(">>");
            const attributesData = attData?.map((value) => {
              const matchingKey = product.attributes.find((item) =>
                item.values.some((v) => v.title === value)
              );
              return {
                key: matchingKey ? matchingKey.name : value,
                value,
              };
            });

            const data = {
              id: product._id,
              title: product.title,
              price: Number(select?.salePrice),
              regularPrice: Number(select?.regularPrice),
              qty: 1,
              image: product?.images?.[0],
              attributes: attributesData,
            };
            const updatedOrder = {
              ...order,
              products: [...order.products, data],
            };

            UseCustomToast(
              updateOrder({ data: updatedOrder, id: order._id as string }),
              "Order Updated Successfully"
            );
            setOpen(false);
          },
        }}
      >
        <DialogTitle> Variants</DialogTitle>
        <DialogContent>
          <Box>
            <Grid container spacing={3} columns={12}>
              {product?.stock?.map((variant) => {
                return (
                  <Grid item key={variant._id} xs={4}>
                    <Card
                      sx={{
                        cursor: "pointer",
                        border:
                          select === variant
                            ? "1px solid green"
                            : "1px solid #ccc",
                        p: 1,
                      }}
                      onClick={() => setSelect(variant)}
                    >
                      <Typography>
                        {variant.variant}, {variant.salePrice}
                      </Typography>
                      <Typography
                        sx={{
                          textAlign: "center",
                          bgcolor: "green",
                          borderRadius: 5,
                        }}
                      >
                        <span>{variant.quantity}</span>
                      </Typography>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
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
