require("dotenv").config();
const Sequelize = require("sequelize");
const { CONNECTION_STRING } = process.env;
const { getMovies } = require("./themoviedb.js");

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
  getAllMovies: (req,res) =>{
    sequelize.query(`
        SELECT m.movie_id, m.movie_title, m.movie_year, m.movie_img, g.genre
        FROM movie m
        JOIN movie_genre mg ON m.movie_id = mg.movie_id
        JOIN genre g ON mg.genre_id = g.genre_id    
    `)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
  }
};
