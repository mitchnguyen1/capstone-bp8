const movieDisplay = document.querySelector(".movies");
let baseUrl = "https://capstone-0a2c.onrender.com"

//function to shuffle the movies
function shuffle(sourceArray) {
  for (var i = 0; i < sourceArray.length - 1; i++) {
      var j = i + Math.floor(Math.random() * (sourceArray.length - i));

      var temp = sourceArray[j];
      sourceArray[j] = sourceArray[i];
      sourceArray[i] = temp;
  }
  return sourceArray;
}


//function to display movies
const displayCard = (res) => {
   // Get the response data
   const data = res.data;

   for (let i = 0; i < data.length; i++) {
     let id = data[i].movie_id
     let title = data[i].movie_title;
     let year = data[i].movie_year;
     let img = data[i].movie_img;
     let genre = data[i].genre;

     // Create a bootstrap card element
     let card = document.createElement("div");
     card.setAttribute("class", "card");
     card.setAttribute("id", `${id}`);

     let bar = document.createElement("div");
     bar.setAttribute("class", "bar");
   
     let tinyButtons = document.createElement("div");
     tinyButtons.setAttribute("class", "tinyButtons");
   
     let colors = { red: "#FF605C", yellow: "#FFBD44", green: "#00CA4E" };
     for (let color in colors) {
       let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
       svg.setAttribute("id", color);
       svg.setAttribute("viewBox", "0 0 100 100");
   
       //delete button 
       if(color == 'red'){
        svg.setAttribute("onclick","deleteMovie(this.parentElement.parentElement.parentElement.id)")
       }

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
     card.appendChild(bar);   

     // Create an image element and append it to the card
     let image = document.createElement("img");
     image.setAttribute("class", "card-img-top");
     image.setAttribute("src", "https://image.tmdb.org/t/p/original" + img);
     card.appendChild(image);

     // Create a body div and append it to the card
     let body = document.createElement("div");
     body.setAttribute("class", "card-body");

     // Create a title element and append it to the body
     let titleCard = document.createElement("h5");
     titleCard.setAttribute("class", "card-title");
     titleCard.textContent = `${title}`;
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
   }

   // GSAP animation for cards
   gsap.set(".card", { opacity: 0, y: 100 });
   ScrollTrigger.batch(".card", {
     onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15 }),
     onLeave: (batch) => gsap.to(batch, { opacity: 0, y: 100 }),
     onEnterBack: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15 }),
     onLeaveBack: (batch) => gsap.to(batch, { opacity: 0, y: 100 }),

     start: "top 88%",
     end: "bottom 20%",
   });
  //  for (let i = 0; i < data.length; i++){
  //   let id = data[i].movie_id
  //   console.log(`#${id}`)
  //   Draggable.create(`#${id}`, {
  //     bounds: document.body,
  //    type: "x,y",
  //    liveSnap: {
  //      points: [
  //        { x: 0, y: 0 },
  //      ],
  //      radius: 50
  //    }
  //  })

  //  }


}

//get request every time a user loads the page and call the display function
const display = () => {
  axios
  .get(`${baseUrl}/api/getAllMovies`)
  .then((res) => {
    displayCard(res)
  })
  .catch((error) => {
    // Handle error here
    console.error("Error retrieving movies:", error);
  });
}

  //delete request for button
  const deleteMovie = (id) =>{
    axios.delete(`${baseUrl}/api/deleteMovie/${id}`)
    .then((res) => {
      location.reload()
    })
  }


//fading animation
const fadeOutPage = () => {
  if (!window.AnimationEvent) { return; }
  fader.classList.add('fade-out');
}
const draggable = () =>{
  let movies = document.querySelectorAll("#card")
  console.log(movies)
}
// Run the animation once the page finishes loading
window.addEventListener("load", function () {
  fadeOutPage();
  display()

});

