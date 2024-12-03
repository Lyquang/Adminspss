import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Chip } from "@mui/material";
import Toolbar from "../Toolbar";

const DataTable = ({info}) => {
  const getStatusChip = (status) => {
    switch (status) {
      case 1:
        return <Chip label='Hoạt động' color="success" />;
      case 0:
        return <Chip label='Vô hiệu' color="error" />;
      default:
        return <Chip label="Không xác định" color="default" />;
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "MÃ SỐ",
      flex: 1,
      headerClassName: "header-column",
      filterable: true,
    },
    {
      field: "name",
      headerName: "TÊN MÁY IN",
      flex: 1,
      headerClassName: "header-column",
      filterable: true,
    },
    {
      field: "location",
      headerName: "ĐỊA ĐIỂM",
      flex: 1,
      headerClassName: "header-column",
      filterable: true,
    },
    {
      field: "date",
      headerName: "NGÀY BẮT ĐẦU HOẠT ĐỘNG",
      type: "date",
      flex: 1,
      headerClassName: "header-column",
      filterable: true,
    },
    // {
    //   field: "type",
    //   headerName: "LOẠI MÁY",
    //   flex: 1,
    //   headerClassName: "header-column",
    //   filterable: true,
    // },
    {
      field: "status",
      headerName: "TÌNH TRẠNG",
      flex: 1,
      headerClassName: "header-column",
      renderCell: (params) => getStatusChip(params.value),
      filterable: true,
    },
  ];

  // const data = [
  //   {
  //     id: "00001",
  //     name: "Samsung",
  //     location: "Tầng 2, H6, cơ sở 2",
  //     date: new Date(2020, 0, 1),
  //     type: "In trắng đen",
  //     status: "Hoạt động",
  //   },
  //   {
  //     id: "00002",
  //     name: "Canon",
  //     location: "Tầng 2, H6, cơ sở 2",
  //     date: new Date(2020, 0, 1),
  //     type: "In màu",
  //     status: "Đang in",
  //   },
  //   {
  //     id: "00003",
  //     name: "Pantum",
  //     location: "Tầng 2, H6, cơ sở 2",
  //     date: new Date(2020, 0, 1),
  //     type: "In màu",
  //     status: "Vô hiệu",
  //   },
  //   {
  //     id: "00001",
  //     name: "Samsung",
  //     location: "Tầng 2, H6, cơ sở 2",
  //     date: new Date(2020, 0, 1),
  //     type: "In trắng đen",
  //     status: "Hoạt động",
  //   },
  //   {
  //     id: "00002",
  //     name: "Canon",
  //     location: "Tầng 2, H6, cơ sở 2",
  //     date: new Date(2020, 0, 1),
  //     type: "In màu",
  //     status: "Đang in",
  //   },
  //   {
  //     id: "00003",
  //     name: "Pantum",
  //     location: "Tầng 2, H6, cơ sở 2",
  //     date: new Date(2020, 0, 1),
  //     type: "In màu",
  //     status: "Vô hiệu",
  //   },
  // ];

  const paginationModel = { page: 0, pageSize: 5 };
  const [filterText] = React.useState("");

  const filteredData = (info || []).filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(filterText.toLowerCase())
    )
  );

  return (
    <Paper
      sx={{
        height: "auto",
        width: "100%",
        "& .header-column": {
          backgroundColor: "#83CBEF70",
          fontWeight: "800",
        },
        "& .MuiDataGrid-row": {
          backgroundColor: "#C0E8F938",
          "&:hover": {
            backgroundColor: "#e0e0e0",
          },
        },
      }}
    >
      <DataGrid
        rows={filteredData}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        slots={{
          toolbar: Toolbar,
        }}
      />
    </Paper>
  );
};
export default DataTable;
