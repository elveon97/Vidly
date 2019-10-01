import React, { PureComponent } from "react";
import Heart from "./common/heart";
import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from "constants";

const MoviesTable = props => {
  const { movies, onLike, onDelete } = props;

  if (movies.length === 0) return null;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Stock</th>
          <th>Rate</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
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
};

export default MoviesTable;
