/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Box from '@mui/material/Box';
import { GridColDef } from '@mui/x-data-grid';
import { Button, Container, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDeleteCategoryMutation, useGetCategoryQuery } from '../../store/services/categoryApiSlice';
import { Delete, Edit, } from '@mui/icons-material';
import ConfirmationDialog from '../../component/ui/confirmation-dialog';
import UseCustomToast from '../../hooks/UseCustomToast';
import DataTable from '../../component/ui/data-table';




export default function CategoryList() {
    const [openConfirm, setOpenConfirm] = React.useState<boolean>(false);
    const { data, isLoading } = useGetCategoryQuery(undefined, { refetchOnMountOrArgChange: true });
    const [deleteCategory, { isSuccess }] = useDeleteCategoryMutation();
    const [selectedId, setSelectedId] = React.useState<string | null>(null);
    const navigate = useNavigate();
    const columns: GridColDef[] = [
        { field: '_id', headerName: 'ID', width: 250 },
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'description', headerName: 'Description', width: 350 },
        {
            field: 'action', headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                const onDelete = () => {
                    setOpenConfirm(true);
                    setSelectedId(params.row._id);
                }
                const onEdit = () => {
                    navigate(`/category/edit/${params.row._id}`);
                }

                return <Box>
                    <IconButton onClick={onEdit} color="primary">
                        <Edit />
                    </IconButton>
                    <IconButton onClick={onDelete} color="warning">
                        <Delete />
                    </IconButton>
                </Box>
            },
        }
    ];

    React.useEffect(() => {
        if (isSuccess) {
            setOpenConfirm(false);
        }
    }, [isSuccess]);

    const handleDelete = () => {
        if (selectedId) {
            UseCustomToast(deleteCategory(selectedId), 'Deleting Category');
        }
    }

    return (
        <Container sx={{}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <Typography variant="h6" fontWeight={600}>Category List</Typography>

                <Button variant="contained" color="primary" onClick={() => navigate('/category/add')}>
                    Add Category
                </Button>
            </Box>
            <Box sx={{}} >
                <DataTable
                    rows={data?.data || []}
                    columns={columns}
                    isLoading={isLoading}
                />
            </Box>
            <ConfirmationDialog
                open={openConfirm}
                setOpen={setOpenConfirm}
                aggre={handleDelete}
            />
        </Container>
    );
}
