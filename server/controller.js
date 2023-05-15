require('dotenv').config()
const Sequelize = require("sequelize")
const {CONNECTION_STRING} = process.env

const sequelize = new Sequelize(CONNECTION_STRING,{
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
  })





module.exports = {
    seed: (req, res) => {
        //adds extra credit insert table
        sequelize.query(`
            drop table if exists genre;
            drop table if exists movie;
            drop table if exists movie_genre;

            create table genre (
                genre_id serial primary key, 
                genre VARCHAR(50)
            );
            create table movie (
                movie_id serial primary key, 
                movie_title VARCHAR(255),
                movie_year INTEGER
            );

            CREATE TABLE movie_genre(
                movie_id INTEGER REFERENCES movie(movie_id),
                genre_id INTEGER REFERENCES genre(genre_id),
            );

        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },
}