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

  renderSortIcon = column => {
    const { sorting } = this.props;
    if (column.path !== sorting.path) return null;

    if (sorting.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              className="clickable"
              key={column.label || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
