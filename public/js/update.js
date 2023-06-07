let form = document.querySelector("form");
let movieDisplay = document.querySelector(".card");
let movieSelection = document.querySelector("#movie");
let baseUrl = "http://34.209.243.219"
//make a get request for all movies
const dropboxMovieOptions = () => {
  axios.get(`${baseUrl}/api/getAllMovies`).then((res) => {
    movieSelection.innerHTML = ""
    //sort alphabetically
    res.data.sort(function (a, b) {
      var textA = a.movie_title.toUpperCase();
      var textB = b.movie_title.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    for (let i = 0; i < res.data.length; i++) {
      let option = document.createElement("option");
      option.setAttribute("value", res.data[i].movie_id);
      option.innerHTML = `${res.data[i].movie_title}`;
      movieSelection.appendChild(option);
    }
    // set the initial poster
    let id = movieSelection.options[0].value;
    axios.get(`${baseUrl}/api/getByID/${id}`).then((res) => {
      displayCard(res);
    });
  });
};
//delete request for button
const deleteMovie = (id) => {
  axios.delete(`${baseUrl}/api/deleteMovie/${id}`).then((res) => {
    location.reload();
  });
};
//display movie
const displayCard = (res) => {
  movieDisplay.innerHTML = "";

  const { movie_img, genre, movie_title, movie_year, movie_id,genre_id } = res.data[0];
  //change the form inputs to match selected movie
  let yearInput = document.querySelector("#movieYear");
  yearInput.value = movie_year
  let genreInput = document.querySelector("#movieGenre");
  genreInput.value = genre_id;
  let titleInput = document.querySelector("#movieTitle");
  titleInput.value = movie_title;

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
    //delete button
    if (color == "red") {
      circle.setAttribute("id", `${movie_id}`);
      circle.setAttribute("onclick", "deleteMovie(this.id)");
    }
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
  axios.put(`${baseUrl}/api/updateMovie`, body).then((res) => {
    // Display the updated movie
    displayCard(res);
    let genreInput = document.querySelector("#movieGenre");
    genreInput.value = res.data[0].genre_id;
    dropboxMovieOptions(); // Call dropboxMovieOptions after updating the movie
  });
};

//create a find by id api to display the users current selection
//detect the selection and change of the dropbox
//on load and on change, call the api with the option.value(movie id)
//get the movie data and display it
const movieCard = (e) => {
  e.preventDefault()
  let id = e.target.value;
  axios
    .get(`${baseUrl}/api/getByID/${id}`)
    .then((res) => {
      displayCard(res);
    })
    .catch((err) => alert(err));
};

movieSelection.addEventListener("change", movieCard);
form.addEventListener("submit", updateMovie);
//call function to display movies in dropbox
dropboxMovieOptions();

//fading animation
const fadeOutPage = () => {
  if (!window.AnimationEvent) {
    return;
  }
  fader.classList.add("fade-out");
};

// Run the animation once the page finishes loading
window.addEventListener("load", function () {
  fadeOutPage();
});
