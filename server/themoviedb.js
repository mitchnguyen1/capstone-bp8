require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;

const baseURL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

const genres = {
  28: "Action",
  12: "Adventure",
  35: "Comedy",
  18: "Drama",
  14: "Fantasy",
  27: "Horror",
  53: "Thriller",
};

module.exports = {
  getMovies: async () => {
    try {
      let movieDB = [];
      let movie_id = 0;
  
      for (let year = 2000; year <= 2023; year++) {
        const res = await axios.get(
          `${baseURL}&language=en-US&region=US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&primary_release_year=${year}&year=${year}&with_original_language=en&with_watch_monetization_types=flatrate`
        );
  
        let movies = res.data.results.splice(0,10);
        let currGenre = new Set();
  
        for (let i = 0; i < movies.length; i++) {
          if (genres[movies[i].genre_ids[0]] == undefined) {
            continue;
          } else {
            let movieTitle = movies[i].original_title.replace("'", '"');
            let outline = {
              id: movie_id,
              movie_title: movieTitle,
              movie_year: +`${year}`,
              movie_img: movies[i].poster_path,
              genre: movies[i].genre_ids[0],
            };
            movie_id++;
            currGenre.add(movies[i].genre_ids[0]);
            movieDB.push(outline);
          }
        }
      }
      return movieDB;
    } catch (err) {
      throw new Error(err);
    }
  },
};
