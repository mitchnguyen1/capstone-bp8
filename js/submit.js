let form = document.querySelector("form");

const submitMovie = (e) => {
  e.preventDefault()
  let title = document.querySelector("#movieTitle").value;
  let genre = document.querySelector("#movieGenre").value;
  let year = document.querySelector("#movieYear").value;
  let body = {
    movie_title: title,
    movie_genre: genre,
    movie_year: year,
  };
  axios.post("http://localhost:4000/api/submitMovie", body)
  .then(res => {
    alert(res.data)
  }).catch(err => {
    console.log(err)
    alert('Uh oh. not working....')
  })
};
//add a success

form.addEventListener("submit", submitMovie);

