let form = document.querySelector("form");
let movieDisplay = document.querySelector(".movies");
const submitMovie = (e) => {
  e.preventDefault();
  let title = document.querySelector("#movieTitle").value;
  let genre1 = document.querySelector("#movieGenre").value;
  let year = document.querySelector("#movieYear").value;
  let body = {
    movie_title: title,
    movie_genre: genre1,
    movie_year: year,
  };
  axios
    .post("http://localhost:4000/api/submitMovie", body)
    .then((res) => {
      let { movie_title, movie_img,genre } = res.data[res.data.length-1];
      movieDisplay.innerHTML=""
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
      yearText.textContent = `Year: ${year}`;
      cardText.appendChild(yearText);
      let genreText = document.createElement("p");
      genreText.textContent = `Genre: ${genre}`;
      cardText.appendChild(genreText);
      body.appendChild(cardText);

      // Append the body to the card
      card.appendChild(body);

      // Add the card to the movie display
      movieDisplay.appendChild(card);
      movieDisplay.style.display = "block"
    })
    .catch((err) => {
      console.log(err);
      alert("Uh oh. not working....");
    });
};
//add a success

form.addEventListener("submit", submitMovie);
