const movieContainer = document.getElementById("movies");
const paginationContainer = document.getElementById("pagination-container");

const apiKey = "a4564eda00mshda6272279634f46p10f310jsn501d1234f374";
const host = "moviesverse1.p.rapidapi.com";
const baseUrl = "https://moviesverse1.p.rapidapi.com/movies/";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": host,
  },
};

const fetchMovies = async (page) => {
  const url = baseUrl + page;
  const response = await fetch(url, options);

  return response.json();
};

const showMovie = (movies) => {
  movieContainer.innerHTML = "";
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movieCard");
    movieCard.innerHTML = `
      <img src="${movie.img}"/>
      <p>${movie.id}</p>
    `;
    movieContainer.appendChild(movieCard);
  });
};

const updatePaginationUI = () => {
  paginationContainer.innerHTML = "";
  for (let i = 1; i <= totalpages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.addEventListener("click", () => changepage(i));
    button.classList.toggle("active", i === currentpage);
    button.disabled = i === currentpage;
    paginationContainer.appendChild(button);
  }
};

const changepage = async (newpage) => {
  try {
    const { movies, totalPages } = await fetchMovies(newpage);

    if (!movies || !Array.isArray(movies)) {
      throw new Error(
        "Movies is not an array or is undefined in the API response."
      );
    }
    currentpage = newpage;
    totalpages = totalPages;
    updatePaginationUI();
    showMovie(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

let totalpages = 1;
let currentpage = 1;

changepage(currentpage);
updatePaginationUI();
