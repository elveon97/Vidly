import React from "react";
import PropTypes from "prop-types";

class Pagination extends React.Component {
  state = {};

  renderPages() {
    const { active, itemsPerPage } = this.props.pagination;
    const pages = Math.ceil(this.props.numberItems / itemsPerPage);
    let arr = [];
    for (let i = 1; i <= pages; i++) {
      let classes = "page-item " + (active === i ? "active" : "disabled");
      arr.push(
        <li key={i} className={classes} onClick={() => this.props.onClick(i)}>
          <a className="page-link">{i}</a>
        </li>
      );
    }
    return arr;
  }

  render() {
    if (this.props.numberItems <= this.props.pagination.itemsPerPage)
      return null;
    const pages = this.renderPages();
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">{pages.map(page => page)}</ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  numberItems: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Pagination;
