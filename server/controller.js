require("dotenv").config();
const Sequelize = require("sequelize");
const { CONNECTION_STRING, API_KEY } = process.env;
const { getMovies } = require("./themoviedb.js");
var axios = require("axios");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  seed: (req, res) => {
    let query = `
        DROP TABLE IF EXISTS movie_genre;
        DROP TABLE IF EXISTS movie;
        
        CREATE TABLE movie (
          movie_id serial PRIMARY KEY, 
          movie_title VARCHAR(255),
          movie_year INTEGER,
          movie_img VARCHAR(255)
        );
        
        CREATE TABLE movie_genre (
          movie_id INTEGER REFERENCES movie(movie_id),
          genre_id INTEGER REFERENCES genre(genre_id)
        );
    `;

    getMovies()
      .then((moviesDB) => {
        for (let i = 0; i < moviesDB.length; i++) {
          let body = `
            INSERT INTO movie (movie_id, movie_title, movie_year, movie_img) 
            VALUES (${moviesDB[i].id}, '${moviesDB[i].movie_title}', ${moviesDB[i].movie_year}, '${moviesDB[i].movie_img}');
            
            INSERT INTO movie_genre (movie_id, genre_id)
            VALUES (${moviesDB[i].id}, ${moviesDB[i].genre});
          `;
          query += body;
        }
        return sequelize.query(query);
      })
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("Error seeding DB", err));
  },
  getAllMovies: (req, res) => {
    sequelize
      .query(
        `
        SELECT m.movie_id, m.movie_title, m.movie_year, m.movie_img, g.genre
        FROM movie m
        JOIN movie_genre mg ON m.movie_id = mg.movie_id
        JOIN genre g ON mg.genre_id = g.genre_id    
    `
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  deleteMovie: (req, res) => {
    const { id } = req.params;
    let newId = Number(id);
    const query = `
        DELETE FROM movie_genre
        WHERE movie_id = ${newId};

        DELETE FROM movie 
        WHERE movie_id = ${newId};


        SELECT m.movie_id, m.movie_title, m.movie_year, m.movie_img, g.genre
        FROM movie m
        JOIN movie_genre mg ON m.movie_id = mg.movie_id
        JOIN genre g ON mg.genre_id = g.genre_id;
      `;
    sequelize
      .query(query)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  submitMovie: (req, res) => {
    const { movie_title, movie_year, movie_genre } = req.body;
    //get the length of rows for ID
    sequelize
      .query(
        `
      SELECT * FROM movie
    `
      )
      .then((dbRes) => {
        let id = dbRes[0].length + 1;
        // query themoviedb for the movie
        axios
          .get(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movie_title}`
          )
          .then((response) => {
            const { title, poster_path } = response.data.results[0];

            let query = `
        INSERT INTO movie (movie_id, movie_title, movie_year, movie_img) 
        VALUES (${id},'${title}', ${movie_year}, '${poster_path}');

        SELECT movie_id FROM movie 
        WHERE movie_img = '${poster_path}'
      `;

            sequelize
              .query(query)
              .then((dbRes) => {
                sequelize.query(`
            INSERT INTO movie_genre (movie_id, genre_id)
            VALUES (${dbRes[0][0].movie_id}, ${movie_genre});
          `);
              })
              .catch((error) => {
                console.error(
                  "Failed to insert data into movie_genre table:",
                  error
                );
              });
          })
          .catch((error) => {
            console.error("Failed to fetch movie data from themoviedb:", error);
          });

        res.status(200).send("success");
      });
  },
  randomMovie: (req, res) => {
    const { movie_genre, movie_year } = req.query;
    console.log(req.query);
    sequelize
      .query(
        `
        SELECT m.movie_id, m.movie_title, m.movie_year, m.movie_img, g.genre
        FROM movie m
        JOIN movie_genre mg ON m.movie_id = mg.movie_id
        JOIN genre g ON mg.genre_id = g.genre_id   
        WHERE genre = '${movie_genre}' AND movie_year = ${movie_year} 
      
    `
  
      )
      .then((dbRes) => {
        let movie = dbRes[0];
        if (movie.length === 0) {
          sequelize
            .query(
              `
        SELECT m.movie_id, m.movie_title, m.movie_year, m.movie_img, g.genre
        FROM movie m
        JOIN movie_genre mg ON m.movie_id = mg.movie_id
        JOIN genre g ON mg.genre_id = g.genre_id   
        WHERE genre = '${movie_genre}' 
      
        `
            )
            .then((dbRes) => {
              res.status(200).send(dbRes[0]);
            });
        } else {
          res.status(200).send(dbRes[0]);
        }
      })
      .catch((err) => console.log(err));
  },
  updateMovie: (req,res) => {
    const{movie_id,movie_title, movie_year,genre} = req.body
    console.log(req.body)
    let query = `
      UPDATE movie SET movie_title = '${movie_title}', movie_year = ${movie_year}
      WHERE movie_id = ${movie_id};
      
      UPDATE movie_genre SET genre_id = ${genre}
      WHERE movie_id = ${movie_id};
      
      SELECT m.movie_id, m.movie_title, m.movie_year, m.movie_img, g.genre
      FROM movie m
      JOIN movie_genre mg ON m.movie_id = mg.movie_id
      JOIN genre g ON mg.genre_id = g.genre_id
      WHERE m.movie_id = ${movie_id};
    `
    sequelize.query(query)
    .then((dbRes) => res.status(200).send(dbRes[0]))
  }
};
