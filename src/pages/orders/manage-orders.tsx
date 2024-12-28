import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../component/ui/data-table";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "../../store/services/orderApiSlice";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  Delete,
  Download,
  Edit,
  Print,
  PublishedWithChanges,
} from "@mui/icons-material";
import { generateOrderInvoice } from "./order-invoice";
import { IOrders } from "./orders.interface";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../component/ui/confirmation-dialog";
import UseCustomToast from "../../hooks/UseCustomToast";
import React from "react";

const ManageOrders = () => {
  const { data, isLoading } = useGetOrdersQuery({});
  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string>("");
  const [selectedRows, setSelectedRows] = React.useState<IOrders[]>([]);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openStatus = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setSelectedRows([]);
  //   setAnchorEl(event.currentTarget);
  // };

  const handleUpdateStatus = (status: string) => {
    if (!selectedId || !status) {
      return;
    }
    const orders: IOrders[] = data?.data;
    const order = orders?.find((item) => item?._id === selectedId);

    const updatedOrder = {
      ...order,
      status,
    };

    UseCustomToast(
      updateOrder({ data: updatedOrder, id: order?._id as string }),
      "Status Updating"
    );

    setAnchorEl(null);
  };

  const handleDelete = () => {
    UseCustomToast(deleteOrder(selectedId), "Order Deleted Successfully");
    setOpen(false);
  };

  const allStatus = ["pending", "processing", "shipped", "delivered", "cancel"];

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "total",
      headerName: "Total Price",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Box
            sx={{
              color:
                params.row.status.toLowerCase() === "pending"
                  ? "black"
                  : params.row.status.toLowerCase() === "processing"
                  ? "blue"
                  : params.row.status.toLowerCase() === "delivered"
                  ? "success.main"
                  : params.row.status.toLowerCase() === "shipped"
                  ? "darkviolet"
                  : "red",
            }}
          >
            {params.row.status}
          </Box>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const onDelete = () => {
          setSelectedId(params.row._id);
          setOpen(true);
        };
        const onUpdate = () => {
          setSelectedId(params.row._id);
        };
        const onEdit = () => {
          navigate(`/orders/${params.row._id}`);
        };
        const onDownload = () => {
          const order: IOrders[] = [
            {
              ...params.row,
              date: new Date(params.row.createdAt).toLocaleDateString(),
            },
          ];
          // order?.date = new Date(order?.createdAt).toLocaleDateString();
          generateOrderInvoice(order);
        };

        return (
          <Box>
            <IconButton onClick={onDownload} color="primary">
              <Download />
            </IconButton>
            <>
              <Button
                sx={{
                  "&:hover": {
                    backgroundColor: "inherit",
                    boxShadow: "none",
                    cursor: "default",
                  },
                }}
                id="basic-button"
                aria-controls={openStatus ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openStatus ? "true" : undefined}
                className=""
              >
                <IconButton
                  onClick={(event) => {
                    onUpdate();
                    setAnchorEl(event.currentTarget);
                  }}
                  color="primary"
                >
                  <PublishedWithChanges />
                </IconButton>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openStatus}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {allStatus?.map((item, idx) => (
                  <MenuItem
                    key={idx}
                    onClick={() => {
                      handleUpdateStatus(item);
                      setSelectedId(params?.row?._id);
                    }}
                    className="capitalize"
                  >
                    {item}
                  </MenuItem>
                ))}
              </Menu>
            </>
            <IconButton onClick={onEdit} color="primary">
              <Edit />
            </IconButton>

            <IconButton onClick={onDelete} color="warning">
              <Delete />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Manage Orders</Typography>
        <IconButton
          onClick={() => {
            const order: IOrders[] = selectedRows.map((item) => {
              return {
                ...item,
                date: new Date(item.createdAt).toLocaleDateString(),
              };
            });
            generateOrderInvoice(order);
          }}
          color="primary"
        >
          <Print />
        </IconButton>
      </Box>
      <DataTable
        columns={columns}
        rows={data?.data || []}
        isLoading={isLoading}
        checkboxSelection={true}
        onRowSelectionModelChange={(params: string[]) => {
          const selected = data?.data.filter((item: IOrders) =>
            params.includes(item._id as string)
          );
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
  );
};

export default ManageOrders;
