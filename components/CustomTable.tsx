import { Table, Tooltip } from "antd";
import { FC, useEffect, useState } from "react";
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
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

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
  return (
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
          // onClick: (event) => handleRowSelection(record), // click row
          // onDoubleClick: event => {}, // double click row
          // onContextMenu: event => {}, // right button click row
          // onMouseEnter: event => {}, // mouse enter row
          // onMouseLeave: event => {}, // mouse leave row
        };
      }}
      pagination={pagination}
    />
  );
};
export default CustomTable;
