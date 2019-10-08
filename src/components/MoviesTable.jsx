import React, { Component } from "react";
import Heart from "./common/heart";
import TableHeader from "./common/tableHeader";

class MoviesTable extends Component {
  columns = [
    {label: "Title", path: "title"},
    {label: "Genre", path: "genre.name"},
    {label: "Stock", path: "numberInStock"},
    {label: "Rate", path: "dailyRentalRate"},
    {key: "like"},
    {key: "delete"}
  ]  

  render() {
    const { movies, onLike, onDelete, onSort, sorting } = this.props;
    return (
      <table className="table">
        <TableHeader columns={this.columns} onSort={onSort} sorting={sorting}/>
        <tbody>
          {movies.map(movie => (
            <tr key={movie._id}>
              <th>{movie.title}</th>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Heart onClick={onLike} movie={movie} />
              </td>
              <th>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(movie._id)}
                >
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
