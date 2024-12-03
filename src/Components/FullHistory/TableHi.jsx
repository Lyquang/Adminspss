import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Chip} from "@mui/material";
import Toolbar from "../Toolbar";

const DataTable = ({hi}) => {
  const getStatusChip = (status) => {
    switch (status) {
      case 2:
        return <Chip label='Hoàn thành' color="success" />;
      case 1:
        return <Chip label='Đang in' color="info" />;
      case 0:
        return <Chip label='Đang chờ' color="warning" />;
      default:
        return <Chip label="Không xác định" color="default" />;
    }
  };

  const columns = [
    {
      field: "date",
      headerName: "THỜI GIAN",
      type: "date",
      flex: 1,
      headerClassName: "header-column",
      filterable: true,
    },
    {
      field: "mssv",
      headerName: "MSSV",
      flex: 1,
      headerClassName: "header-column",
      filterable: true,
    },
    {
      field: "id",
      headerName: "MÃ SỐ MÁY IN",
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
      field: "file_name",
      headerName: "TÊN FILE",
      flex: 1,
      headerClassName: "header-column",
      filterable: true,
    },

    {
      field: "pageNum",
      headerName: "SỐ TRANG IN",
      type: "number",
      flex: 1,
      headerClassName: "header-column",
      filterable: true,
    },
    {
      field: "status",
      headerName: "TRẠNG THÁI",
      flex: 1,
      headerClassName: "header-column",
      renderCell: (params) => getStatusChip(params.value),
      filterable: true,
    },
  ];

  // const data = [
  //   {
  //     date: new Date(2020, 0, 1),
  //     id: "00001",
  //     namep: "Samsung",
  //     mssv: "2221242",
  //     name: "Nguyễn Văn A",
  //     pageNum: 45,
  //     status: "Đang đợi",
  //   },
  //   {
  //       date: new Date(2020, 0, 1),
  //       id: "00001",
  //       namep: "Samsung",
  //       mssv: "2221242",
  //       name: "Nguyễn Văn A",
  //       pageNum: 45,
  //       status: "Đang đợi",
  //     },
  //     {
  //       date: new Date(2020, 0, 1),
  //       id: "00001",
  //       namep: "Samsung",
  //       mssv: "2221242",
  //       name: "Nguyễn Văn A",
  //       pageNum: 45,
  //       status: "Đang đợi",
  //     },
  //     {
  //       date: new Date(2020, 0, 1),
  //       id: "00001",
  //       namep: "Samsung",
  //       mssv: "2221242",
  //       name: "Nguyễn Văn A",
  //       pageNum: 45,
  //       status: "Đang đợi",
  //     },
  //     {
  //       date: new Date(2020, 0, 1),
  //       id: "00001",
  //       namep: "Samsung",
  //       mssv: "2221242",
  //       name: "Nguyễn Văn A",
  //       pageNum: 45,
  //       status: "Đang đợi",
  //     },
  //     {
  //       date: new Date(2020, 0, 1),
  //       id: "00001",
  //       namep: "Samsung",
  //       mssv: "2221242",
  //       name: "Nguyễn Văn A",
  //       pageNum: 45,
  //       status: "Đang đợi",
  //     },
  // ];

  const paginationModel = { page: 0, pageSize: 5 };
  const [filterText] = React.useState("");

  const filteredData = (hi || []).filter((row) =>
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
