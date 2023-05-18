let form = document.querySelector("form");
let movieDisplay = document.querySelector(".movies")

const displayCard = (res) => {
  movieDisplay.innerHTML=""
  console.log(res)
  const{movie_img, genre, movie_title, movie_year} = res

  // Create a bootstrap card element
  let card = document.createElement("div");
  card.setAttribute("class", "card");


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
};

const randomMovie = (e) => {
  e.preventDefault();
  let genre = document.querySelector("#movieGenre").value;
  let year = document.querySelector("#movieYear").value;
  let body = {
    movie_genre: genre,
    movie_year: year,
  };
  console.log(body);
  axios
    .get(
      `http://localhost:4000/api/randomMovie?movie_genre=${genre}&movie_year=${year}`
    )
    .then((res) => {
      const{movie_year} = res.data[0]
      let moviesLength = res.data.length
      let randomNum = Math.floor(Math.random() * moviesLength)
      if(movie_year != year){
        alert(`Movie not found in that year, heres a movie with the genre: ${genre}`)
        displayCard(res.data[randomNum])
      }
      else{
        displayCard(res.data[randomNum])
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Uh oh. not working....");
    });
};

form.addEventListener("submit", randomMovie);


