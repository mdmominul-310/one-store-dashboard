import { Box, Button, IconButton, Typography } from "@mui/material";
import DataTable from "../../component/ui/data-table";
import { GridColDef } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import ConfirmationDialog from "../../component/ui/confirmation-dialog";
import { useEffect, useState } from "react";
import UseCustomToast from "../../hooks/UseCustomToast";
import { useDeletePromotionMutation, useGetPromotionQuery } from "../../store/services/promotionApiSlice";
import AddPromo from "./add-promo";
import EditPromo from "./edit-promo";
import { IPromo } from "./menus.interface";

const YoutubePromotion = () => {
    const [openConfirm, setOpenConfirm] = useState<boolean>(false);
    const [addmenu, setAddMenu] = useState<boolean>(false);
    const [editMenu, setEditMenu] = useState<boolean>(false);
    const [editData, setEditData] = useState<IPromo | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const { data, isLoading } = useGetPromotionQuery({});
    const [deletePromotion, { isSuccess }] = useDeletePromotionMutation();
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'title', headerName: 'Title', flex: 1, align: 'center', headerAlign: 'center' },
        {
            field: 'url', headerName: 'Url', flex: 1, align: 'center', headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <a href={params.row.url} target="_blank">{params.row.url}</a>
                )
            }

        },

        {
            field: "action", headerName: 'Action', flex: 1, align: 'center', headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <Box>
                        <IconButton
                            onClick={() => {
                                setEditData(params.row)
                                setEditMenu(true)
                            }
                            }
                        >
                            <Edit
                            />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                setSelectedId(params.row._id)
                                setOpenConfirm(true)
                            }}
                        >
                            <Delete

                            />
                        </IconButton>

                    </Box>
                )
            }
        }

    ]

    useEffect(() => {
        if (isSuccess) {
            setOpenConfirm(false);
        }
    }, [isSuccess]);

    const handleDelete = () => {
        if (selectedId) {
            UseCustomToast(deletePromotion(selectedId), 'Deleting Product');
        }
    }
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h5" color="text.secondary">Promo List</Typography>
                <Button variant="contained" color="primary" onClick={() => setAddMenu(true)}>Add Promo</Button>
            </Box>
            <DataTable
                columns={columns}
                rows={data?.data || []}
                isLoading={isLoading}

            />
            <ConfirmationDialog
                open={openConfirm}
                setOpen={setOpenConfirm}
                title="Delete Promo"
                aggre={handleDelete}
            />
            <AddPromo
                open={addmenu}
                setOpen={setAddMenu}
            />
            <EditPromo
                open={editMenu}
                setOpen={setEditMenu}
                defaultData={editData as IPromo}
            />
        </Box>
    )
}

export default YoutubePromotion;