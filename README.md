
# Movie Roulette

The main goal of this website is to give the user a random movie to watch. The user is able to select filters when picking a movie, making the selection dynamic for the user.Users are also able to delete a movie, update or edit a movie, and view all movies in the database. 
## Tech Stack

**Client:** HTML, CSS, Javascript, GSAP, Boostrap, 

**Server:** Postgres, Node, Express, CORS, Sequelizer, Axios


## API Reference


### Seed
Seed the database with top movies from 2000-2023

```http
  POST /api/seed
```


### Get All Movies
Retrieve a list of movies from the database

```http
  GET /api/getAllMovies
```


### Delete Movie
Delete a specific movie from the database

```http
  DELETE /api/deleteMovie/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. ID of the movie to delete |



### Submit Movie
Submit a specific movie from the database. Must send with a body.

```http
  POST /api/submitMovie/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `movie_title`| `string` | **Required**. Title of the movie to add |
| `movie_genre`|`number`|**Required**. Genre number of the movie to add |
| `movie_year`|`number`|**Required**. year of the movie to add |

### Random Movie
Get a random movie from the database

```http
  GET /api/randomMovie/
```

### Update Movie
Update a movie from the database. Must send with a body.

```http
  PUT /api/updateMovie/
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `movie_id`| `number` | **Required**. ID of the movie to update|
| `movie_title`| `string` | **Required**. Title of the movie to update|
| `movie_genre`|`number`|**Required**. Genre number of the movie to update|
| `movie_year`|`number`|**Required**. year of the movie to update|


### Find movie by id
Get a specific movie from the database with the ID.

```http
  GET /api/getById/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. ID of the movie to select |





## Demo


## Deployment

To deploy this project, first run:

```bash
  npm i
```

Then run: 
To deploy this project run

```bash
  npm start
```

Then open inside your browser:
```bash
  http://localhost:4000/
```