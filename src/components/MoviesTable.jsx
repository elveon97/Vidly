import React, { Component } from "react";
import Heart from "./common/heart";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

class MoviesTable extends Component {
  columns = [
    { label: "Title", path: "title" },
    { label: "Genre", path: "genre.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Rate", path: "dailyRentalRate" },
    {
      key: "like",
      content: movie => (
        <Heart onClick={() => this.props.onLike(movie)} movie={movie} />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.props.onDelete(movie._id)}
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { movies, onLike, onDelete, onSort, sorting } = this.props;
    return (
      <table className="table">
        <TableHeader columns={this.columns} onSort={onSort} sorting={sorting} />
        <TableBody data={movies} columns={this.columns} />
      </table>
    );
  }
}

export default MoviesTable;
