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

    sequelize.query(`SELECT * FROM movie`).then((dbRes) => {
      let id = dbRes[0].length + 1;

      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movie_title}`
        )
        .then((response) => {
          const { title, poster_path } = response.data.results[0];

          let query = `
              INSERT INTO movie (movie_id, movie_title, movie_year, movie_img) 
              VALUES (${id}, '${title}', ${movie_year}, '${poster_path}');
              
              SELECT movie_id FROM movie 
              WHERE movie_img = '${poster_path}';
            `;

          sequelize.query(query).then((dbRes) => {
            const { movie_id } = dbRes[0][0];
            sequelize
              .query(
                `
                  INSERT INTO movie_genre (movie_id, genre_id)
                  VALUES (${movie_id}, ${movie_genre});
                  
                  SELECT m.movie_title,m.movie_img, g.genre
                  FROM movie m
                  JOIN movie_genre mg ON m.movie_id = mg.movie_id
                  JOIN genre g ON mg.genre_id = g.genre_id  
                  WHERE m.movie_id = ${movie_id};
                `
              )
              .then((dbRes) => {
                res.status(200).send(dbRes[0]);
              });
          });
        });
    });
  },

  randomMovie: (req, res) => {
    //The user only picks an array of genre. - passed
    // The user only picks an array of years.-passed
    // The user picks an array of genre and years.-passed
    // The user only picks one year.-failed
    // The user only picks one genre.-falled
    // The user only picks an array of genre and one year.-falled, year not added
    // The user only picks an array of years and one genre.-failed, genre not added
    const { movie_genre, movie_year } = req.query;

    let genreQuery = "";
    let yearQuery = "";

    if (Array.isArray(movie_genre)) {
      const genres = movie_genre.map((genre) => `'${genre}'`);
      genreQuery = `g.genre IN (${genres.join(", ")})`;
    } else if (movie_genre == "") {
      genreQuery = "";
    } else {
      genreQuery = `g.genre = '${movie_genre}'`;
    }

    if (Array.isArray(movie_year)) {
      const years = movie_year.map((year) => `${year}`);
      yearQuery = `m.movie_year IN (${years.join(", ")})`;
    } else if (movie_genre == "") {
      genreQuery = "";
    } else {
      yearQuery = `m.movie_year = '${movie_year}'`;
    }

    let whereQuery = "";
    console.log(yearQuery)
    if (genreQuery != "g.genre = 'undefined'" && yearQuery != "m.movie_year = 'undefined'") {
      whereQuery = `WHERE ${genreQuery} AND ${yearQuery}`;
    } else if (genreQuery != "g.genre = 'undefined'") {
      whereQuery = `WHERE ${genreQuery}`;
    } else if (yearQuery != "m.movie_year = 'undefined'") {
      whereQuery = `WHERE ${yearQuery}`;
    }

    sequelize
      .query(
        `
        WITH t AS (
          SELECT 
            1 AS query_order, m.movie_id, m.movie_title, m.movie_year, m.movie_img, g.genre
          FROM movie m
          JOIN movie_genre mg ON m.movie_id = mg.movie_id
          JOIN genre g ON mg.genre_id = g.genre_id
          ${whereQuery}
          
          UNION ALL
          
          SELECT 
            2 AS query_order, m.movie_id, m.movie_title, m.movie_year, m.movie_img, g.genre
          FROM movie m
          JOIN movie_genre mg ON m.movie_id = mg.movie_id
          JOIN genre g ON mg.genre_id = g.genre_id
        )
        SELECT *
        FROM t 
        WHERE query_order = (SELECT MIN(query_order) FROM t);
        
    `
      )
      .then(([dbRes]) => {
        res.status(200).send(dbRes);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  updateMovie: (req, res) => {
    const { movie_id, movie_title, movie_year, genre } = req.body;
    console.log(req.body);
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
    `;
    sequelize.query(query).then((dbRes) => res.status(200).send(dbRes[0]));
  },
  findById: (req,res) =>{
     const {id} = req.params;
     let query = `
      SELECT m.movie_id, m.movie_title, m.movie_year, m.movie_img, g.genre
      FROM movie m
      JOIN movie_genre mg ON m.movie_id = mg.movie_id
      JOIN genre g ON mg.genre_id = g.genre_id
      WHERE m.movie_id = ${id};
     `
     sequelize.query(query)
     .then(dbRes=>{res.status(200).send(dbRes[0])})
     .catch(err=>{res.status(500).send(err)})
  }
};
