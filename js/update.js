let selectBox = document.querySelector("#movie");
let form = document.querySelector("form")
let movieDisplay = document.querySelector(".movies")

//make a get request for all movies
const dropboxMovieOptions = () => {
  axios.get("http://localhost:4000/api/getAllMovies").then((res) => {
    //sort alphabetically
    res.data.sort(function (a, b) {
      var textA = a.movie_title.toUpperCase();
      var textB = b.movie_title.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    for (let i = 1; i < res.data.length - 1; i++) {
      let option = document.createElement("option");
      option.setAttribute("value", res.data[i].movie_id);
      option.innerHTML = `${res.data[i].movie_title}`;
      selectBox.appendChild(option);
    }
  });
};
//display movie
const displayCard = (res) => {
    movieDisplay.innerHTML=""
    console.log(res.data[0])
    const{movie_img, genre, movie_title, movie_year} = res.data[0]
  
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
//function to send the form data to backend
const updateMovie = (e) => {
    e.preventDefault()
  let title = document.querySelector("#movieTitle").value;
  let genre = document.querySelector("#movieGenre").value;
  let year = document.querySelector("#movieYear").value;
  let id = selectBox.value
  let body = {
    movie_id: id,
    movie_title: title,
    movie_year: year,
    genre: genre
  }
  title.innerHTML=""
  year.innerHTML=""
  axios.put("http://localhost:4000/api/updateMovie",body)
  .then(res => {
    //display the movie
    displayCard(res)
  })
};

form.addEventListener("submit", updateMovie)
//call function to display movies in dropbox
dropboxMovieOptions();
