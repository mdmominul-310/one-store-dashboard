import { Box, Button, IconButton, Typography } from "@mui/material";
import { useDeleteMenuMutation, useGetMenuQuery } from "../../store/services/menuApiSlice";
import DataTable from "../../component/ui/data-table";
import { GridColDef } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import { IMenuChildren, IMenus } from "./menus.interface";
import ConfirmationDialog from "../../component/ui/confirmation-dialog";
import { useEffect, useState } from "react";
import UseCustomToast from "../../hooks/UseCustomToast";
import AddMenu from "./add-menu";
import EditMenu from "./edit-menu";

const MenuList = () => {
    const [openConfirm, setOpenConfirm] = useState<boolean>(false);
    const [addmenu, setAddMenu] = useState<boolean>(false);
    const [editMenu, setEditMenu] = useState<boolean>(false);
    const [editData, setEditData] = useState<IMenus | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const { data, isLoading } = useGetMenuQuery({});
    const [deleteMenu, { isSuccess }] = useDeleteMenuMutation();
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'name', headerName: 'Title', flex: 1, align: 'center', headerAlign: 'center' },
        {
            field: 'children', headerName: 'Items', flex: 1, align: 'center', headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <Box sx={{ alignItems: 'center' }}>
                        {params.row.children.map((item: IMenuChildren, index: number) => (
                            <Box key={index} sx={{ display: 'inline-block', mr: 1 }}>
                                {item.label}
                            </Box>
                        ))
                        }
                    </Box >
                )
            },

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
                        <IconButton>
                            <Delete
                                onClick={() => {
                                    setSelectedId(params.row._id)
                                    setOpenConfirm(true)
                                }}
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
            UseCustomToast(deleteMenu(selectedId), 'Deleting Product');
        }
    }
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h5" color="text.secondary">Menu List</Typography>
                <Button variant="contained" color="primary" onClick={() => setAddMenu(true)}>Add Menu</Button>
            </Box>
            <DataTable
                columns={columns}
                rows={data?.data || []}
                isLoading={isLoading}

            />
            <ConfirmationDialog
                open={openConfirm}
                setOpen={setOpenConfirm}
                title="Delete Menu"
                aggre={handleDelete}
            />
            <AddMenu
                open={addmenu}
                setOpen={setAddMenu}
            />
            <EditMenu
                open={editMenu}
                setOpen={setEditMenu}
                defaultData={editData as IMenus}
            />
        </Box>
    )
}

export default MenuList;