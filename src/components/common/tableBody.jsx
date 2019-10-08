import React from "react";
import _ from "lodash";

class TableBody extends React.Component {
  renderCell(item, column) {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  }

  createKey = (item, column) => {
    return item[this.props.itemKey] + (column.path || column.key);
  };

  render() {
    const { itemKey } = this.props;
    return (
      <tbody>
        {this.props.data.map(item => (
          <tr key={item[itemKey]}>
            {this.props.columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
