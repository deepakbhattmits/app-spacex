export const columns = [
  {
    title: "Favorite",
    dataIndex: "favorite",
    key: "favorite",
    sorter: false,
    ellipsis: {
      showTitle: true,
    },
  },
  {
    title: "Date",
    ellipsis: {
      showTitle: false,
    },
    dataIndex: "launch_date_utc",
    key: "launch_date_utc",
    sorter: true,
  },
  {
    title: "Mission Name",
    ellipsis: {
      showTitle: false,
    },
    dataIndex: "mission_name",
    key: "mission_name",
    sorter: true,
  },
  {
    title: "Description",
    ellipsis: {
      showTitle: false,
    },
    dataIndex: "description",
    key: "description",
    sorter: false,
  },
  ,
  {
    title: "Mission Name",
    ellipsis: {
      showTitle: false,
    },
    dataIndex: "mission_name",
    key: "mission_name",
    sorter: true,
  },
  {
    title: "Generate QR code",
    ellipsis: {
      showTitle: false,
    },
    dataIndex: "qr",
    key: "qr",
    sorter: false,
  },
];
export const pagination = {
  defaultPageSize: 10,
  pageSizeOptions: ["5", "10", "15"],
  showSizeChanger: true,
};
