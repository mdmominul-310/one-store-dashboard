import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../component/ui/data-table";
import { Box, Typography } from "@mui/material";
import ConfirmationDialog from "../../component/ui/confirmation-dialog";
import { useGetUserQuery } from "../../store/services/userApiSlice";

const ManageUsers = () => {
  const { data, isLoading } = useGetUserQuery({});
  const [open, setOpen] = React.useState(false);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      align: "center",
      headerAlign: "center",
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
        <Typography variant="h5">Manage Users</Typography>
      </Box>
      <DataTable
        columns={columns}
        rows={data?.data?.data || []}
        isLoading={isLoading}
        checkboxSelection={false}
      />

      <ConfirmationDialog
        open={open}
        setOpen={setOpen}
        title="Delete Order"
        aggre={() => {}}
      />
    </div>
  );
};

export default ManageUsers;
