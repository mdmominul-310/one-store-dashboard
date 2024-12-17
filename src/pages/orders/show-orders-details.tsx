import { Delete, Print } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  useDeleteOrderMutation,
  useGetSingleOrderQuery,
} from "../../store/services/orderApiSlice";
import { generateOrderInvoice } from "./order-invoice";
import EditAddress from "./edit-address";
import EditCustomerInfo from "./edit-customer-info";
import React from "react";
import ConfirmationDialog from "../../component/ui/confirmation-dialog";
import UseCustomToast from "../../hooks/UseCustomToast";
import AddOrderItem from "./add-order-item";

const ShowOrdersDetails = () => {
  const [open, setOpen] = React.useState(false);
  const id = useParams().id;
  const { data, isLoading } = useGetSingleOrderQuery(id);
  const [deleteOrder] = useDeleteOrderMutation();
  const createDate = new Date(data?.data?.createdAt).toLocaleDateString();
  if (isLoading) {
    return <div>...loading</div>;
  }

  type IProducts = {
    title: string;
    qty: number;
    price: number;
  };

  const handleDelete = () => {
    UseCustomToast(deleteOrder(id), "Order Deleted Successfully");
    setOpen(false);
  };
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" color={"text.secondary"}>
          Order Details
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.primary">Orders</Typography>
          <Typography color="text.primary">Order Details</Typography>
        </Breadcrumbs>
      </Box>
      <Box component={"section"}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="text.secondary" variant="h6">
              Orders and Account Information
            </Typography>
            <IconButton
              color="primary"
              onClick={() => generateOrderInvoice(data?.data)}
            >
              <Print />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ width: "50%" }}>
              <Typography sx={{ fontSize: 17, fontWeight: 500 }}>
                Order Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>Order ID:</Typography>
                  <Typography>Order Date: </Typography>
                  <Typography>Order Status: </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography> {data?.data?.id}</Typography>
                  <Typography>{createDate}</Typography>

                  <Typography
                    sx={
                      data?.data?.status === "Pending"
                        ? { color: "warning.main" }
                        : data?.data?.status === "Processing"
                        ? { color: "info.main" }
                        : data?.data?.status === "Delivered"
                        ? { color: "success.main" }
                        : { color: "error.main" }
                    }
                  >
                    {" "}
                    {data?.data?.status}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>Payment Method:</Typography>
                  <Typography>Shipping Method</Typography>
                  <Typography>Currency</Typography>
                  <Typography>Currency Rate</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {" "}
                    {data?.data?.paymentMethod || "Cash On Delivery"}
                  </Typography>
                  <Typography>
                    {" "}
                    {data?.data?.shippingMethod || "Standard Shipping"}
                  </Typography>
                  <Typography> {data?.data?.currency || "BDT"}</Typography>
                  <Typography> {data?.data?.currencyRate || "1"}</Typography>
                </Grid>
                <EditCustomerInfo orders={data?.data} />
              </Grid>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography sx={{ fontSize: 17, fontWeight: 500 }}>
                Account Information
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <Typography>Customer Name</Typography>
                  <Typography>Email</Typography>
                  <Typography>Customer Phone</Typography>
                  <Typography>Customer Group</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography> {data?.data?.fullName}</Typography>
                  <Typography> {data?.data?.email || "N/A"}</Typography>
                  <Typography> {data?.data?.phoneNumber || "BDT"}</Typography>
                  <Typography>
                    {" "}
                    {data?.data?.customerGroup || "GUEST"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box sx={{ my: 2 }}>
            <Typography color="text.secondary" variant="h6">
              Address Information
            </Typography>
            <Divider />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 17, fontWeight: 550 }}>
                  Shipping Address
                </Typography>
                <Typography>{data?.data?.address}</Typography>
                <Typography>{data?.data?.deliveryArea}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 17, fontWeight: 550 }}>
                  Billing Address
                </Typography>
                <Typography>{data?.data?.address}</Typography>
                <Typography>{data?.data?.deliveryArea}</Typography>
              </Grid>
            </Grid>
            <EditAddress orders={data?.data} />{" "}
          </Box>

          <Box sx={{ my: 2 }}>
            <Typography color="text.secondary" variant="h6">
              Product Information
            </Typography>
            <Divider />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: 17, fontWeight: 550 }}>
                    Product Name
                  </Typography>
                  <Typography sx={{ fontSize: 17, fontWeight: 550 }}>
                    Quantity
                  </Typography>
                  <Typography sx={{ fontSize: 17, fontWeight: 550 }}>
                    Price
                  </Typography>
                  <Typography sx={{ fontSize: 17, fontWeight: 550 }}>
                    Action
                  </Typography>
                </Box>
                {data?.data?.products.map(
                  (product: IProducts, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography>{product.title}</Typography>
                      <Typography>{product.qty}</Typography>
                      <Typography>{product.price}</Typography>
                      <IconButton
                        disabled={index === 0 ? true : false}
                        onClick={() => {
                          // setSelectedId(params.row._id);
                          setOpen(true);
                        }}
                      >
                        <Delete color="error" />
                      </IconButton>
                    </Box>
                  )
                )}
              </Grid>
            </Grid>

            <AddOrderItem order={data?.data}/>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Box>
                <Typography sx={{ fontSize: 17, fontWeight: 550 }}>
                  Shipping Cost: {data?.data?.deliveryCharge}
                </Typography>
                <Typography sx={{ fontSize: 17, fontWeight: 550 }}>
                  Subtotal:{" "}
                  {parseInt(data.data.total) -
                    parseInt(data?.data?.deliveryCharge)}
                </Typography>
                <Typography sx={{ fontSize: 17, fontWeight: 550 }}>
                  Total Price: {data?.data?.total}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
      <ConfirmationDialog
        open={open}
        setOpen={setOpen}
        title="Are you sure you want to delete this order?"
        aggre={handleDelete}
      />
    </Box>
  );
};

export default ShowOrdersDetails;
