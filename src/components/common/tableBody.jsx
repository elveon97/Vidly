import React from "react";
import _ from "lodash";

class TableBody extends React.Component {
  renderCell(item, column) {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  }

  render() {
    return (
      <tbody>
        {this.props.data.map(item => (
          <tr>
            {this.props.columns.map(column => (
              <td>{this.renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
