const movieContainer = document.getElementById('movies')

const url = "https://moviesverse1.p.rapidapi.com/movies/1";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "a4564eda00mshda6272279634f46p10f310jsn501d1234f374",
    "X-RapidAPI-Host": "moviesverse1.p.rapidapi.com",
  },
};

const fetchMovie = async () => {
  const data = await fetch(url, options);
  return data.json();
  showMovie()
};
fetchMovie();

const showMovie = async () => {
  const movies = await fetchMovie();
  console.log(movies)

  movies.movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList = "movieCard";
    movieCard.innerHTML = `
      <img src="${movie.img}"/>
      <p>${movie.id}</p>
    `;
    movieContainer.appendChild(movieCard);
  });
};

showMovie();

// script.js

