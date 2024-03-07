import {MOVIES_API_URL} from "./constants";

export function getAllMovies() {
  return fetch(MOVIES_API_URL + '/beatfilm-movies')
      .then((res) => {
          return res.json();
      })
      .catch(error => {
          console.error('Error:', error);
      });
}
