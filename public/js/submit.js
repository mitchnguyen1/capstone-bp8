let form = document.querySelector("form");
let movieDisplay = document.querySelector(".movies");
let baseUrl = "https://34.214.181.51/"
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
    .post(`${baseUrl}/api/submitMovie`, body)
    .then((res) => {
      let { movie_title, movie_img, genre } = res.data[res.data.length - 1];
      movieDisplay.innerHTML = "";
      
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
      
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "50");
        circle.setAttribute("cy", "50");
        circle.setAttribute("r", "50");
        circle.setAttribute("fill", colors[color]);
      
        svg.appendChild(circle);
        tinyButtons.appendChild(svg);
      }
      
      bar.appendChild(tinyButtons);
      card.appendChild(bar);
      
 
      


      // Create an image element and append it to the card
      let image = document.createElement("img");
      image.setAttribute("class", "card-img-top");
      image.setAttribute(
        "src",
        "https://image.tmdb.org/t/p/original" + movie_img
      );
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
      movieDisplay.style.display = "block";
    })
    .catch((err) => {
      console.log(err);
      alert("Uh oh. not working....");
    });
};
//add a success

form.addEventListener("submit", submitMovie);

//fading animation
const fadeOutPage = () => {
  if (!window.AnimationEvent) { return; }
  fader.classList.add('fade-out');
}

// Run the animation once the page finishes loading
window.addEventListener("load", function () {
  fadeOutPage();
});
