"use strict";
const searchField = document.querySelector(".search__form > input"),
searchBtn = document.querySelector(".search__form > button"),
error = document.querySelector(".search__error"),
search = document.querySelector(".search"),
searchList = document.querySelector(".search__result-list"),
movieContainer = document.querySelector(".search__result-list"),
movieWrapper = document.querySelector(".movie__wrapper"),
movieBox = document.querySelector(".movie"),
movieBack = document.querySelector(".movie__back")

const getMovies = async (inputValue) => {
  searchList.innerHTML = '';
  const res = await fetch(
    `https://www.omdbapi.com/?s=${inputValue}&apikey=7e6decf1`
  );
  const data = await res.json();

  if (data.Response == "True") {
    renderMovies(data.Search);
    error.classList.add("search__error-close");
  } else {
    error.classList.remove("search__error-close");
    searchField.value = "";
  }
};

searchBtn.addEventListener("click", () => {
  let inputValue = searchField.value;
  movieBox.classList.add("movie__close");
  getMovies(inputValue);
});

function renderMovies(movies) {
  searchBtn.style.backgroundColor = "black";
  for (let i = 0; i < movies.length; i++) {
    const movieBlock = document.createElement("div");
    movieBlock.dataset.id = movies[i].imdbID;
    movieBlock.classList.add("search__result-item");
    if (movies[i].Poster == 'N/A') movies[i].Poster = "404.gif";
    let currentMovieType = movies[i].Type;
    if (movies[i].Type === 'movie') currentMovieType = 'Фильм';
    if (movies[i].Type === 'game') currentMovieType = 'Игра';
    if (movies[i].Type === 'series') currentMovieType = 'Сериал';
      movieBlock.innerHTML = `
      <a href="#!" class="search__result-item-inner">
            <div class="search__result-image"><img src = "${movies[i].Poster}"></div>
            <div class="search__result-descr">
              <h2 class="search__result-title">${movies[i].Title}</h2>
              <p class="search__result-year">${movies[i].Year}</p>
              <p class="search__result-type">${currentMovieType}</p>
            </div>
      
      `;
    movieContainer.append(movieBlock);
  }
  getDetailss();
}

function getDetailss() {
  const movieItem = document.querySelectorAll(".search__result-item");
  movieItem.forEach((movie) => {
    movie.addEventListener("click", async () => {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=7e6decf1`
      );
      const detailsMovie = await res.json();
      movieDescr(detailsMovie);
    });
  });
}

function movieDescr(details) {
  search.classList.add("search__close");
  movieBox.classList.remove("movie__close");
  if (details.Poster == "N/A") details.Poster = "404.gif";
  movieWrapper.innerHTML = `
          <div class="movie__box">
            <div class="movie__image">
             <img src = "${details.Poster}" alt = "movie poster">
            </div>
            <div class="movie__descr">
              <h2 class="movie__title">${details.Title}</h2>
              <p class="movie__data">Год:<span class="movie__year">${details.Year}</span></p>
              <p class="movie__data">Рейтинг:<span class="movie__rated">${details.Rated}</span></p>
              <p class="movie__data">Дата выхода:<span class="movie__released">${details.Released}</span></p>
              <p class="movie__data">Продолжительность:<span class="movie__runtime">${details.Runtime}</span></p>
              <p class="movie__data">Жанр:<span class="movie__genre">${details.Genre}</span></p>
              <p class="movie__data">Режиссер:<span class="movie__director"></span></p>
              <p class="movie__data">Сценарий:<span class="movie__writer">${details.Writer}</span></p>
              <p class="movie__data">Актеры:<span class="movie__actors">${details.Actors}</span></p>
            </div>
          </div>
           <div class="movie__plot">
            <p class="movie__text">${details.Plot}</p>
          </div>
      
      `;
}

movieBack.addEventListener("click", () => {
  
  search.classList.remove("search__close");

 
});
