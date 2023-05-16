const movieDisplay = document.querySelector(".movies");
axios
  .get("http://localhost:4000/api/getAllMovies")
  .then((res) => {
    // Get the response data
    const data = res.data;
    for (let i = 0; i < data.length; i++) {
      let title = data[i].movie_title;
      let year = data[i].movie_year;
      let img = data[i].movie_img;
      let genre = data[i].genre;

      // Create a bootstrap card element
      let card = document.createElement("div");
      card.setAttribute("class", "card");

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
  })
  .catch((error) => {
    // Handle error here
    console.error("Error retrieving movies:", error);
  });
