import _ from "lodash";

/*  MY FIRST PAGINATION! :
getMoviesToRender() {
    const { active, itemsPerPage } = this.state.pagination;
    const start = active * itemsPerPage - itemsPerPage;
    const end = active * itemsPerPage;

    let movies = [];
    for (let i = start; i < end && i < this.state.movies.length; i++) {
      movies.push(this.state.movies[i]);
    }

    return movies;
}
*/

//  MOSH WAY :

export function paginate(items, page, pageSize) {
  const start = (page - 1) * pageSize;
  return _(items)
    .slice(start)
    .take(pageSize)
    .value();
}
