/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Box from '@mui/material/Box';
import {

    GridColDef,

} from '@mui/x-data-grid';
import { Button, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../component/ui/data-table';
import { useDeleteProductMutation, useGetProductsQuery } from '../../store/services/productsApiSlice';
import { Delete, Edit, Preview } from '@mui/icons-material';
import ConfirmationDialog from '../../component/ui/confirmation-dialog';
import UseCustomToast from '../../hooks/UseCustomToast';





export default function ProductList() {
    const [openConfirm, setOpenConfirm] = React.useState<boolean>(false);
    const [selectedId, setSelectedId] = React.useState<string | null>(null);
    const { data, isLoading } = useGetProductsQuery({});
    const [deleteProduct, { isSuccess }] = useDeleteProductMutation();
    const navigate = useNavigate();
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'title', headerName: 'Title', flex: 1, align: 'center', headerAlign: 'center' },
        {
            field: "regularPrice",
            headerName: 'Regular Price',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                // console.log(params.row.stock[0].price)
                return <Typography variant="body1" >${params.row.stock[0].regularPrice}</Typography>;
            },
        },
        {
            field: 'Sale Price', headerName: 'Sale Price',
            // flex: 1,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                // console.log(params.row.stock[0].price)
                return <Typography variant="body1" >${params.row.stock[0].salePrice}</Typography>;
            },
        },
        {
            field: 'images', headerName: 'Image',
            flex: 1,
            align: 'center',
            width: 200,
            headerAlign: 'center',
            renderCell: (params) => {
                return <img src={params.row.images[0]} alt={params.row.title} style={{ width: 50, objectFit: 'contain' }} />;
            },
        },
        {
            field: 'action', headerName: 'Action',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                const onDelete = () => {
                    setOpenConfirm(true);
                    setSelectedId(params.row._id);
                }
                const onEdit = () => {
                    navigate(`/products/edit/${params.row._id}`);
                }

                return <Box>
                    <IconButton onClick={onEdit} color="primary">
                        <Preview />
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
    ];
    React.useEffect(() => {
        if (isSuccess) {
            setOpenConfirm(false);
        }
    }, [isSuccess]);

    const handleDelete = () => {
        if (selectedId) {
            UseCustomToast(deleteProduct(selectedId), 'Deleting Product');
        }
    }

    return (
        <Box sx={{ width: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <Typography variant="h6" fontWeight={600}>Product List</Typography>

                <Button variant="contained" color="primary" onClick={() => navigate('/products/add')}>
                    Add Product
                </Button>
            </Box>
            <Box sx={{}}>
                <DataTable
                    columns={columns}
                    rows={data?.data || []}
                    isLoading={isLoading}
                />
            </Box>
            <ConfirmationDialog
                open={openConfirm}
                setOpen={setOpenConfirm}
                aggre={handleDelete}
            />
        </Box>
    );
}
