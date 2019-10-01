import React from "react";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";

import { paginate } from "../utils/pagination";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./MoviesTable";

export class Vidya extends React.Component {
  state = {
    movies: [],
    genres: [],
    activeGenreId: "0",
    pagination: {
      active: 1,
      itemsPerPage: 4
    }
  };

  componentDidMount() {
    const movies = getMovies();
    const genres = [{ name: "All Genres", _id: "0" }, ...getGenres()];
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

  render() {
    const { movies: allMovies, pagination, activeGenreId } = this.state;

    if (allMovies.length > 0) {
      const moviesToPaginate =
        activeGenreId !== "0"
          ? allMovies.filter(movie => movie.genre._id === activeGenreId)
          : allMovies;

      const movies = paginate(
        moviesToPaginate,
        this.state.pagination.active,
        this.state.pagination.itemsPerPage
      );

      return (
        <div className="row mt-4">
          <div className="col-2 mt-4">
            <ListGroup
              items={this.state.genres}
              active={this.state.activeGenreId}
              onClick={this.genreChanged}
            />
          </div>
          <div className="col">
            <h5>
              {moviesToPaginate.length > 0 &&
                "Showing " +
                  moviesToPaginate.length +
                  " movies in the database."}
              {moviesToPaginate.length === 0 && "There are no movies"}
            </h5>
            <MoviesTable
              movies={movies}
              onLike={this.toggleLike}
              onDelete={this.handleDelete}
            />
            <Pagination
              pagination={pagination}
              numberItems={moviesToPaginate.length}
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
