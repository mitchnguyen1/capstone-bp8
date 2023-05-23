# Movie Roulette

The main goal of this website is to give the user a random movie to watch. The user is able to select filters when picking a movie, making the selection dynamic for the user.Users are also able to delete a movie, update or edit a movie, and view all movies in the database. 
## Tech Stack

**Client:** HTML, CSS, Javascript, GSAP, Boostrap, 

**Server:** Postgres, Node, Express, CORS, Sequelizer, Axios



## Demo 
**Landing Page:**
The user has four features to choose from. The secret seed button is the solid blue "X" on the right. This will fulfill the database with top movies from 2000-2023. 
![alt text](https://github.com/mitchnguyen1/capstone-bp8/blob/main/planning/demo%20media/index.gif?raw=true)

**Add A Movie Page:**
The user is able to add their own choice of movie. This will make a get request with the user's title to themoviedb and will add the first movie from the search.
![alt text](https://github.com/mitchnguyen1/capstone-bp8/blob/main/planning/demo%20media/submit.png?raw=true)

**Choose A Movie Page:**
The user is able to get a random movie when clicking on the disco ball. The user is can also get a random movie based on the filters of years and genres. To get another movie, the user can click on the red circle of the displayed movie card.
![alt text](https://github.com/mitchnguyen1/capstone-bp8/blob/main/planning/demo%20media/random.png?raw=true)


**Edit A Movie Page:**
The user can edit a movie in the database by the title, genre, or year. A get request is made to get a list of current movies in the database for the dropbox. The movie card will display real time data as it changes. 
![alt text](https://github.com/mitchnguyen1/capstone-bp8/blob/main/planning/demo%20media/update.png?raw=true)

**View Movie List Page:**
This page displays all of the movies in the database. It is ordered by the release year. The user can delete any movie by clicking the red circle of the desired movie. After deletion, the page refreshes with an updated list.
![alt text](https://github.com/mitchnguyen1/capstone-bp8/blob/main/planning/demo%20media/movies.png?raw=true)

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