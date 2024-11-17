import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../component/ui/data-table";
import { useDeleteOrderMutation, useGetOrdersQuery } from "../../store/services/orderApiSlice";
import { Box, IconButton, Typography } from "@mui/material";
import { Delete, Download, Edit, Print } from "@mui/icons-material";
import { generateOrderInvoice } from "./order-invoice";
import { IOrders } from "./orders.interface";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../component/ui/confirmation-dialog";
import UseCustomToast from "../../hooks/UseCustomToast";
import React from "react";

const ManageOrders = () => {
    const { data, isLoading } = useGetOrdersQuery({});
    const [deleteOrder] = useDeleteOrderMutation();
    const [open, setOpen] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState<string>('');
    const [selectedRows, setSelectedRows] = React.useState<IOrders[]>([]);
    const navigate = useNavigate();

    const handleDelete = () => {
        UseCustomToast(deleteOrder(selectedId), 'Order Deleted Successfully');
        setOpen(false);
    }
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'fullName', headerName: 'Full Name', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'phoneNumber', headerName: 'Phone Number', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'total', headerName: 'Total Price', flex: 1, align: 'center', headerAlign: 'center' },
        {
            field: 'status', headerName: 'Status', flex: 1, align: 'center', headerAlign: 'center',
            renderCell: (params) => {
                return <Box sx={{
                    color: params.row.status === "Pending" ? 'warning.main' :
                        params.row.status === "Processing" ? 'info.main' :
                            params.row.status === "Delivered" ? 'success.main' :
                                'error.main'
                }}>
                    {params.row.status}
                </Box>
            }

        },
        { field: 'createdAt', headerName: 'Created At', flex: 1, align: 'center', headerAlign: 'center' },

        {
            field: 'action', headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                const onDelete = () => {
                    setSelectedId(params.row._id);
                    setOpen(true);

                }
                const onEdit = () => {

                    navigate(`/orders/${params.row._id}`);
                }
                const onDownload = () => {
                    const order: IOrders[] = [{
                        ...params.row,
                        date: new Date(params.row.createdAt).toLocaleDateString()
                    }]
                    // order.date = new Date(order.createdAt).toLocaleDateString();
                    generateOrderInvoice(order);
                }


                return <Box>
                    <IconButton onClick={onDownload} color="primary">
                        <Download />
                    </IconButton>
                    <IconButton onClick={onEdit} color="primary">
                        <Edit />
                    </IconButton>
                    <IconButton onClick={onDelete} color="warning">
                        <Delete />
                    </IconButton>
                </Box>
            },
        }
    ]
    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5">Manage Orders</Typography>
                <IconButton onClick={
                    () => {
                        const order: IOrders[] = selectedRows.map((item) => {
                            return {
                                ...item,
                                date: new Date(item.createdAt).toLocaleDateString()
                            }
                        });
                        generateOrderInvoice(order);
                    }
                } color="primary">
                    <Print />
                </IconButton>
            </Box>
            <DataTable
                columns={columns}
                rows={data?.data || []}
                isLoading={isLoading}
                checkboxSelection={true}
                onRowSelectionModelChange={(params: string[]) => {
                    const selected = data?.data.filter((item: IOrders) => params.includes(item._id as string));
                    setSelectedRows(selected || []);
                }}


            />

            <ConfirmationDialog
                open={open}
                setOpen={setOpen}
                title="Delete Order"
                aggre={handleDelete}

            />
        </div>
    )
}

export default ManageOrders;