import React from "react";

class TableHeader extends React.Component {
  raiseSort = path => {
    let sorting = { ...this.props.sorting };
    let order = "asc";
    if (path === sorting.path && sorting.order === "asc") order = "desc";

    sorting.path = path;
    sorting.order = order;
    this.props.onSort(sorting);
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              key={column.label || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
