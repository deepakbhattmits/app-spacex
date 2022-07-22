import { Modal, Table, List, Tooltip } from "antd";
import { FC, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
import { columns, pagination } from "./constants";
interface DataType {
  id: number;
  key: React.Key;
  favorite: string;
  launch_date_utc: Date;
  mission_name: string;
  description: string;
}
interface IProp {
  datas: {
    launch_date_utc: number;
    mission_name: string;
    description: string;
  }[];
}

[];
const CustomTable: FC<IProp> = ({ datas }) => {
  const [selectedFields, setSelectedFields] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<DataType[]>([]);

  const [selectedRow, setSelectedRow] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [isQRModalVisible, setIsQRModalVisible] = useState<boolean>(false);

  const handleRowSelection = (recordId: number) => {
    if (selectedRowKeys?.includes(recordId)) {
      const name = filteredData?.find((el) => el?.id === recordId);
      toast.error(`Removed From Favorite item Name : ${name?.mission_name}`);
      const filteredSelectedRowKeys = selectedRowKeys?.filter(
        (el) => el !== recordId
      );
      setSelectedRowKeys(filteredSelectedRowKeys);
      localStorage.setItem(
        "selectedRowKeys",
        JSON.stringify(filteredSelectedRowKeys)
      );
    } else {
      const name = filteredData?.find((el) => el?.id === recordId);
      toast.success(`Added To Favorite item Name : ${name?.mission_name}`);
      const filteredSelectedRowKeys = [...selectedRowKeys, recordId];
      setSelectedRowKeys(filteredSelectedRowKeys);
      localStorage.setItem(
        "selectedRowKeys",
        JSON.stringify(filteredSelectedRowKeys)
      );
    }
  };
  const renderDateTime = (text: Date) => {
    const d = new Date(text);
    const date = d
      ?.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
        hour: "numeric",
        minute: "numeric",
      })
      .replace("AM", "")
      .replace("PM", "");
    return date;
  };

  const handelRow = (record?: any) => {
    const { description, launch_date_utc, mission_id, mission_name } = record;
    let updatedRecord: any = {
      description,
      launch_date_utc,
      mission_id,
      mission_name,
    };
    setSelectedRow(updatedRecord);
  };
  const handleQRModal = (record: any) => {
    // console.log("this is clicked row record :", record);
    setIsModalVisible(true);
  };
  const renderColumns = () => {
    const renderColumns: any = columns?.map((column: any) => {
      return {
        ...column,
        render: !!column?.dataIndex?.match(/launch_date_utc/i)
          ? (text: Date) => {
              return (
                <Tooltip
                  placement="top"
                  title={renderDateTime(text)}
                  className="test"
                >
                  {renderDateTime(text)}
                </Tooltip>
              );
            }
          : !!column?.dataIndex?.match(/favorite/i)
          ? (text: number) => (
              <label className="inline-flex items-center">
                <input
                  className="w-4 h-4 rounded border border-blue-300 focus:ring-3 "
                  required
                  type="checkbox"
                  onChange={() => handleRowSelection(text)}
                  checked={selectedRowKeys?.includes(text)}
                />
                <span className="ml-2">
                  Mark as
                  {!selectedRowKeys?.includes(text)
                    ? " Favorite"
                    : " Un-favorite"}
                </span>
              </label>
            )
          : !!column?.dataIndex?.match(/qr/i)
          ? (text: string, record: any) => {
              return (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleQRModal(record)}
                >
                  {column?.title}
                </button>
              );
            }
          : (text: string) => (
              <Tooltip placement="top" title={text}>
                {text}
              </Tooltip>
            ),
        sorter: column?.sorter
          ? (a: { text: string }, b: { text: string }) => {
              return a.text > b.text ? -1 : 1;
            }
          : column?.sorter,
      };
    });
    return renderColumns;
  };
  const handleOkCancel = () => {
    setIsModalVisible(false);
    setSelectedFields([]);
  };
  useEffect(() => {
    const localSelectedRowKeys = JSON.parse(
      localStorage.getItem("selectedRowKeys")!
    );
    if (localSelectedRowKeys?.length >= 1 && !selectedRowKeys?.length) {
      setSelectedRowKeys(localSelectedRowKeys);
    }
  }, [selectedRowKeys]);
  useEffect(() => {
    if (!filteredData?.length) {
      const updatedDatas: DataType[] = datas?.map((el: any) => ({
        ...el,
        key: el?.id,
        favorite: el?.id,
      }));
      setFilteredData(updatedDatas);
    }
  }, [filteredData, datas]);
  // useEffect(() => {
  //   if (isModalVisible) {
  //     handelRow();
  //   }
  // }, [isModalVisible]);
  return (
    <>
      <Table
        dataSource={filteredData}
        locale={{ emptyText: "Not Found" }}
        //TODO : make sure in the selected row add a class
        // rowClassName={`${filteredData?.map((el) =>
        //   selectedRowKeys?.includes(el?.id) ? "selected" : null
        // )}`}
        columns={renderColumns()}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => handelRow(record), // click row
            // onDoubleClick: event => {}, // double click row
            // onContextMenu: event => {}, // right button click row
            // onMouseEnter: event => {}, // mouse enter row
            // onMouseLeave: event => {}, // mouse leave row
          };
        }}
        pagination={pagination}
      />
      <Modal
        title="QR code generator"
        centered
        visible={isModalVisible}
        onOk={handleOkCancel}
        onCancel={handleOkCancel}
      >
        <List
          header={
            <div className="flex gap-4 justify-between">
              <span>Select Fields</span>

              <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Selected fileds-
                {selectedFields?.length}
              </span>
            </div>
          }
          footer={
            !!selectedFields?.length ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  setIsQRModalVisible(true);
                }}
              >
                Generate QR code
              </button>
            ) : null
          }
          bordered
          dataSource={Object?.entries(selectedRow)}
          renderItem={(item) => (
            <List.Item className="flex gap-2">
              <label className="inline-flex items-center">
                <input
                  className="w-4 h-4 rounded border border-blue-300 focus:ring-3 "
                  required
                  type="checkbox"
                  onChange={(event) => {
                    let updatedList = [...selectedFields];
                    if (event.target.checked) {
                      updatedList = [...selectedFields, item["1"]];
                    } else {
                      updatedList.splice(selectedFields.indexOf(item["1"]), 1);
                    }
                    setSelectedFields(updatedList);
                  }}
                  checked={selectedFields?.includes(item["1"])}
                />
                <span className="ml-2">{item["0"]}</span>
              </label>
              <span>{item["1"]}</span>
            </List.Item>
          )}
        />
      </Modal>
      <Modal
        title={`QR code for ${selectedFields?.map((el) => el)?.join(",")}`}
        centered
        visible={isQRModalVisible}
        onOk={() => setIsQRModalVisible(false)}
        onCancel={() => setIsQRModalVisible(false)}
      >
        <QRCode className="m-auto" value={selectedFields?.join("\n")} />
      </Modal>
    </>
  );
};
export default CustomTable;
