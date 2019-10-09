import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, sorting, onSort, data, itemKey }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} onSort={onSort} sorting={sorting} />
      <TableBody data={data} columns={columns} itemKey={itemKey} />
    </table>
  );
};

export default Table;
