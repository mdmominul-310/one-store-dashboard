import { Box, Button, IconButton, Switch, Typography } from "@mui/material";
import DataTable from "../../component/ui/data-table";
import { GridColDef } from "@mui/x-data-grid";
import {
    useDeleteFlashSaleMutation,
    useGetFlashSaleQuery,
    useUpdateFlashSaleMutation,
} from "../../store/services/flashSaleApiSlice";
import { Delete, Edit } from "@mui/icons-material";
import ConfirmationDialog from "../../component/ui/confirmation-dialog";
import UseCustomToast from "../../hooks/UseCustomToast";
import { useNavigate } from "react-router-dom";
import { IFlashSale } from "./flash-sale.interface";
import { useState } from "react";

const FlashSale = () => {
    const [openConfirm, setOpenConfirm] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const { data, isLoading } = useGetFlashSaleQuery({});
    const [deleteFlashSale] = useDeleteFlashSaleMutation();
    const [updateFlashSale] = useUpdateFlashSaleMutation();
    const navigate = useNavigate();
    const handleDelete = () => {
        if (selectedId) {
            UseCustomToast(deleteFlashSale(selectedId), "Deleting Flash Sale");
        }
    };

    const handleChangeStatus = (id: string) => {
        const flashSale = data?.data?.find((item: IFlashSale) => item._id === id);
        if (flashSale) {
            const data = { status: !flashSale.status };
            UseCustomToast(updateFlashSale({ id: id, data: data as IFlashSale }), "Updating Flash Sale");
        }
    }

    const handleFeatured = (id: string) => {
        const flashSale = data?.data?.find((item: IFlashSale) => item._id === id);
        if (flashSale) {
            const data = { featured: !flashSale.featured };
            UseCustomToast(updateFlashSale({ id: id, data: data as IFlashSale }), "Updating Flash Sale");
        }
    }
    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "title",
            headerName: "Title",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "discount",
            headerName: "Discount",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "startDate",
            headerName: "Start",
            flex: 1,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                return (
                    <Box>
                        {new Date(params.row.startDate).toLocaleString()}
                    </Box>
                );
            }
        },
        {
            field: "endDate",
            headerName: "End",
            flex: 1,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                return (
                    <Box>
                        {new Date(params.row.endDate).toLocaleString()}
                    </Box>
                );
            }
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                return (
                    <Box>
                        <Switch checked={params.row.status} onChange={() => handleChangeStatus(params.row._id)} />
                    </Box>
                );
            },
        },
        {
            field: "featured",
            headerName: "Featured",
            flex: 1,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                return (
                    <Box>
                        <Switch checked={params.row.featured} onChange={() => handleFeatured(params.row._id)} />
                    </Box>
                );
            },
        },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                return (
                    <Box>
                        <IconButton
                            onClick={() => {
                                navigate(`/flash-sale/edit/${params.row._id}`);
                            }}
                        >
                            <Edit />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                setSelectedId(params.row._id);
                                setOpenConfirm(true);
                            }}
                        >
                            <Delete />
                        </IconButton>
                    </Box>
                );
            },
        },
    ];
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Typography variant="h6" color={"text.secondary"}>
                    Flash Sale
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => {
                        navigate("/flash-sale/add");
                    }}
                >
                    Add Flash Sale
                </Button>
            </Box>
            <DataTable
                columns={columns}
                rows={data?.data || []}
                isLoading={isLoading}
            />
            <ConfirmationDialog
                open={openConfirm}
                setOpen={setOpenConfirm}
                title={"Delete Flash Sale"}
                aggre={handleDelete}
            />
        </Box>
    );
};

export default FlashSale;
