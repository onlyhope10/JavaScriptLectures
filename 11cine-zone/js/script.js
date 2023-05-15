// Declare variables
let nowPlayingMovies = [];
let popularMovies = [];

// Fetch now playing movies
async function fetchNowPlayingMovies() {
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=669e1f99e40868c2dec595dc2e9f36cd');
    const data = await response.json();
    nowPlayingMovies = data.results;
    // Fill in the now playing section
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    nowPlayingMovies.forEach((movie) => {

      const slide = `
        <div class="swiper-slide">
          <a href="movie-details.html?id=${movie.id}"> 
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"/>
            </a>
          <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i> ${movie.vote_average} 8/10
          </h4>
        </div>` ;

      swiperWrapper.innerHTML += slide;
    });

    // Initialize Swiper
    const swiper = new Swiper(".swiper", {
      slidesPerView: 'auto' ,
      spaceBetween: 10,
      effect:'coverflow',
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

// Fetch popular movies
async function fetchPopularMovies() {
  try {
    const popularShows = data.results.slice(0, 20)
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=669e1f99e40868c2dec595dc2e9f36cd');
    const data = await response.json();
    popularMovies = data.results;
    // Fill in the popular movies section
    const popularMoviesContainer = document.querySelector('#popular-movies');
    popularMovies.slice(0, 20).forEach((movie) => { // Only show top 20 popular movies
      const card = `
        <div class="card">
          <a href="movie-details.html?id=${movie.id}">
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top" alt="${movie.title}" />
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        </div>
      `;
      popularMoviesContainer.innerHTML += card;
    });
  } catch (error) {
    console.error(error);
  }
}

fetchNowPlayingMovies();
fetchPopularMovies();
 


// Popular Tvshows
async function getPopularTvShows() {
  try {
    const response = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=669e1f99e40868c2dec595dc2e9f36cd');
    const data = await response.json();
    const popularShows = data.results.slice(0, 20);
    const popularShowsContainer = document.querySelector("#popular-shows");

    popularShows.forEach((show) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <a href="tv-details.html?id=${show.id}">
          <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.name}">
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text"><small class="text-muted">Aired: ${
            show.first_air_date
          }</small></p>
        </div>
      `;
      popularShowsContainer.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  }
}

getPopularTvShows();