let form = document.querySelector("form");
let movieDisplay = document.querySelector(".card");
let movieSelection = document.querySelector("#movie")

//make a get request for all movies
const dropboxMovieOptions = () => {
  axios.get("http://localhost:4000/api/getAllMovies").then((res) => {
    //sort alphabetically
    res.data.sort(function (a, b) {
      var textA = a.movie_title.toUpperCase();
      var textB = b.movie_title.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    for (let i = 1; i < res.data.length ; i++) {
      let option = document.createElement("option");
      option.setAttribute("value", res.data[i].movie_id);
      option.innerHTML = `${res.data[i].movie_title}`;
      movieSelection.appendChild(option);
    }
  });
};
//display movie
const displayCard = (res) => {
  movieDisplay.innerHTML = "";
  const { movie_img, genre, movie_title, movie_year } = res.data[0];

  let bar = document.createElement("div");
  bar.setAttribute("class", "bar");

  let tinyButtons = document.createElement("div");
  tinyButtons.setAttribute("class", "tinyButtons");

  let colors = { red: "#FF605C", yellow: "#FFBD44", green: "#00CA4E" };
  for (let color in colors) {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", color);
    svg.setAttribute("viewBox", "0 0 100 100");

    let circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", "50");
    circle.setAttribute("cy", "50");
    circle.setAttribute("r", "50");
    circle.setAttribute("fill", colors[color]);

    svg.appendChild(circle);
    tinyButtons.appendChild(svg);
  }

  bar.appendChild(tinyButtons);
  movieDisplay.appendChild(bar);

  // Create an image element and append it to the card
  let image = document.createElement("img");
  image.setAttribute("class", "card-img-top");
  image.setAttribute("src", "https://image.tmdb.org/t/p/original" + movie_img);
  movieDisplay.appendChild(image);

  // Create a body div and append it to the card
  let body = document.createElement("div");
  body.setAttribute("class", "card-body");

  // Create a title element and append it to the body
  let titleCard = document.createElement("h5");
  titleCard.setAttribute("class", "card-title");
  titleCard.textContent = `${movie_title}`;
  body.appendChild(titleCard);

  // Create a text div and append it to the body
  let cardText = document.createElement("div");
  cardText.setAttribute("class", "card-text");
  let yearText = document.createElement("p");
  yearText.textContent = `Year: ${movie_year}`;
  cardText.appendChild(yearText);
  let genreText = document.createElement("p");
  genreText.textContent = `Genre: ${genre}`;
  cardText.appendChild(genreText);
  body.appendChild(cardText);

  // Append the body to the card
  movieDisplay.appendChild(body);


};
//function to send the form data to backend
const updateMovie = (e) => {
  e.preventDefault();
  let title = document.querySelector("#movieTitle").value;
  let genre = document.querySelector("#movieGenre").value;
  let year = document.querySelector("#movieYear").value;
  let id = movieSelection.value;
  let body = {
    movie_id: id,
    movie_title: title,
    movie_year: year,
    genre: genre,
  };
  title.innerHTML = "";
  year.innerHTML = "";
  axios.put("http://localhost:4000/api/updateMovie", body).then((res) => {
    //display the updated movie
    displayCard(res);
  });
};

//create a find by id api to display the users current selection 
//detect the selection and change of the dropbox
//on load and on change, call the api with the option.value(movie id)
//get the movie data and display it
const movieCard = (e) =>{
  let id = e.target.value
  axios.get(`http://localhost:4000/api/getByID/${id}`)
  .then(res=>{
    displayCard(res)
  })
}
//set the initial poster
let id = movieSelection.value
  axios.get(`http://localhost:4000/api/getByID/${id}`)
  .then(res=>{
    displayCard(res)
  })
movieSelection.addEventListener("change",movieCard)
form.addEventListener("submit", updateMovie);
//call function to display movies in dropbox
dropboxMovieOptions();
console.log(id)
