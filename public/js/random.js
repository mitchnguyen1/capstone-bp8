// Get all elements in the DOM
let movieDisplay = document.querySelector(".movies");
let genres = document.querySelectorAll(".genre-button");
let years = document.querySelectorAll(".year-button");
let submit = document.querySelectorAll(".submit");
let randomBall = document.querySelector("#randomBall");
let alertBox = document.querySelector(".alert");
let yearSelection = [];
let genreSelection = [];
let baseUrl = "https://34.214.181.51/"
const displayCard = (res) => {
  movieDisplay.innerHTML = "";
  const { movie_img, genre, movie_title, movie_year } = res;
  if (!yearSelection.includes(movie_year) && yearSelection.length != 0) {
    createAlert(genre)
  }

  // Create a bootstrap card element
  let card = document.createElement("div");
  card.setAttribute("class", "card");
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

    if (color == "red") {
      svg.setAttribute("onclick", "closeCard()");
    }

    svg.appendChild(circle);
    tinyButtons.appendChild(svg);
  }

  bar.appendChild(tinyButtons);
  card.appendChild(bar);

  // Create an image element and append it to the card
  let image = document.createElement("img");
  image.setAttribute("class", "card-img-top");
  image.setAttribute("src", "https://image.tmdb.org/t/p/original" + movie_img);
  card.appendChild(image);

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
  card.appendChild(body);

  // Add the card to the movie display
  movieDisplay.appendChild(card);
  yearSelection = [];
  genreSelection = [];
};

//handle year selection
const addYear = (e) => {
  let button = e.target;
  let value = +button.value;
  let index = yearSelection.indexOf(value);
  //the year isn't selected yet
  if (index === -1) {
    button.classList.add("purple");
    button.classList.add("clicked");
    yearSelection.push(value);
  } else {
    button.classList.remove("purple");
    button.classList.remove("clicked");
    yearSelection.splice(index, 1);
  }
};

years.forEach((year) => {
  year.addEventListener("click", addYear);
});

//handle genre selection
const addGenre = (e) => {
  let button = e.target;
  let value = button.value;
  let index = genreSelection.indexOf(value);

  if (index === -1) {
    button.classList.add("pink");
    button.classList.add("clicked");
    genreSelection.push(value);
  } else {
    button.classList.remove("pink");
    button.classList.remove("clicked");
    genreSelection.splice(index, 1);
  }
};

genres.forEach((genre) => {
  genre.addEventListener("click", addGenre);
});

const randomMovie = (e) => {
  if (yearSelection.length == 0 && genreSelection.length == 0) {
    alert("Please pick one");
  } else {
    let url = `${baseUrl}/api/randomMovie?`;
    let genreInLink = false;
    if (genreSelection.length === 1) {
      url += `movie_genre=${genreSelection[0]}`;
      genreInLink = true;
    } else if (genreSelection.length > 1) {
      url += `movie_genre=${genreSelection[0]}`;
      genreInLink = true;
      for (let i = 1; i < genreSelection.length; i++) {
        url += `&movie_genre=${genreSelection[i]}`;
      }
    }
    if (!genreInLink) {
      if (yearSelection.length === 1) {
        url += `movie_year=${yearSelection[0]}`;
      } else if (yearSelection.length > 1) {
        url += `movie_year=${yearSelection[0]}`;
        for (let i = 1; i < yearSelection.length; i++) {
          url += `&movie_year=${yearSelection[i]}`;
        }
      }
    } else {
      if (yearSelection.length === 1) {
        url += `&movie_year=${yearSelection[0]}`;
      } else if (yearSelection.length > 1) {
        url += `&movie_year=${yearSelection[0]}`;
        for (let i = 1; i < yearSelection.length; i++) {
          url += `&movie_year=${yearSelection[i]}`;
        }
      }
    }

    // reset classes from each element
    years.forEach((year) => {
      if (
        year.classList.contains("purple") ||
        year.classList.contains("pink") ||
        year.classList.contains("clicked")
      ) {
        year.classList.remove("purple");
        year.classList.remove("pink");
        year.classList.remove("clicked");
      }
    });
    genres.forEach((genre) => {
      if (
        genre.classList.contains("purple") ||
        genre.classList.contains("pink") ||
        genre.classList.contains("clicked")
      ) {
        genre.classList.remove("purple");
        genre.classList.remove("pink");
        genre.classList.remove("clicked");
      }
    });

    axios
      .get(url)
      .then((res) => {
        let randomNum = Math.floor(Math.random() * res.data.length);
        displayCard(res.data[randomNum]);
      })
      .catch((err) => {
        console.log(err);
        alert("Uh oh. Something went wrong...");
      });
  }
};

const randomBallMovie = () => {
  axios.get(`${baseUrl}/api/getAllMovies`).then((res) => {
    let length = res.data.length;
    let num = Math.floor(Math.random() * length);
    let movie = res.data[num];
    yearSelection.push(movie.movie_year);
    displayCard(movie);
    randomBall.style.display - "none";
  });
};

const closeCard = () => {
  movieDisplay.innerHTML = "";
  let img = document.createElement("img");
  img.setAttribute("id", "randomBall");
  img.setAttribute("src", "../images/trippy.gif");
  img.setAttribute("onclick", "randomBallMovie()");
  movieDisplay.appendChild(img);
};

submit.forEach((button) => {
  button.addEventListener("click", randomMovie);
});

//create and close alert function
const createAlert = (genre) => {
  alertBox.innerHTML = ""
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

    if (color == "red") {
      svg.setAttribute("onclick", "closeAlert()");
    }

    svg.appendChild(circle);
    tinyButtons.appendChild(svg);
  }

  bar.appendChild(tinyButtons);
  alertBox.appendChild(bar);

  let text = document.createElement("h6")
  text.setAttribute("id","alertText")
  text.textContent=`Sorry, there was no match with your criteria. Here's a random ${genre} movie`
  alertBox.appendChild(text)

  let button = document.createElement("button")
  button.setAttribute("id","confirm")
  button.setAttribute("onclick","closeAlert()")
  button.innerHTML="Ok"
  alertBox.appendChild(button)

  alertBox.style.display = "block"
};

const closeAlert = () => {
  alertBox.innerHTML = ""
  alertBox.style.display = "none"
}

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
