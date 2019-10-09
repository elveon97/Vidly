import React from "react";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";

import { paginate } from "../utils/pagination";
import { sort } from "../utils/sorting";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./MoviesTable";

export class Vidya extends React.Component {
  state = {
    movies: [],
    genres: [],
    activeGenreId: "",
    sorting: {
      path: "title",
      order: "asc"
    },
    pagination: {
      active: 1,
      itemsPerPage: 4
    }
  };

  handleSort = sorting => {
    this.setState({
      sorting
    });
  };

  componentDidMount() {
    const movies = getMovies();
    const genres = [{ name: "All Genres", _id: "" }, ...getGenres()];
    this.setState({
      movies,
      genres
    });
  }

  genreChanged = genreId => {
    const activeGenreId = genreId;
    let pagination = { ...this.state.pagination };
    pagination.active = 1;
    this.setState({
      activeGenreId,
      pagination
    });
  };

  handlePages = numberPage => {
    const pagination = { ...this.state.pagination };
    pagination.active = numberPage;
    this.setState({
      pagination
    });
  };

  toggleLike = movie => {
    const movies = this.state.movies.map(m => {
      let newMovie = { ...m };
      if (m._id === movie._id) newMovie.liked = !newMovie.liked;
      return newMovie;
    });
    this.setState({
      movies
    });
  };

  removeElement(id) {
    const movies = this.state.movies;
    for (let i = 0; i < movies.length; i++) {
      if (movies[i]._id === id) {
        movies.splice(i, 1);
        return movies;
      }
    }
    return movies;
  }

  handleDelete = id => {
    const movies = this.removeElement(id);
    this.setState({
      movies: movies
    });
  };

  getPaginatedMovies = () => {
    const { path, order } = this.state.sorting;
    const { movies: allMovies, activeGenreId } = this.state;

    const moviesToPaginate =
      activeGenreId !== ""
        ? allMovies.filter(movie => movie.genre._id === activeGenreId)
        : allMovies;

    const sorted = sort(moviesToPaginate, path, order);

    const movies = paginate(
      sorted,
      this.state.pagination.active,
      this.state.pagination.itemsPerPage
    );

    return { movies: movies, length: moviesToPaginate.length };
  };

  render() {
    const { movies: allMovies, pagination, activeGenreId, genres } = this.state;

    if (allMovies.length > 0) {
      const { movies, length } = this.getPaginatedMovies();

      return (
        <div className="row mt-4">
          <div className="col-2 mt-4">
            <ListGroup
              items={genres}
              active={activeGenreId}
              onClick={this.genreChanged}
            />
          </div>
          <div className="col">
            <h5>
              {length > 0 && "Showing " + length + " movies in the database."}
              {length === 0 && "There are no movies"}
            </h5>
            <MoviesTable
              movies={movies}
              onLike={this.toggleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sorting={this.state.sorting}
            />
            <Pagination
              pagination={pagination}
              numberItems={length}
              onClick={this.handlePages}
            />
          </div>
        </div>
      );
    } else {
      return <h1>No movies!</h1>;
    }
  }
}
