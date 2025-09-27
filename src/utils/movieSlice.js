import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    nowPlayingMovies: null,
    trendingMovies: null,
    recommendedMovies: null,
    comedyMovies: null,
    horrorMovies: null,
    upcomingMovies: null,
    trailerVideo: null,
    indianMovies:null,
     anime: null, 
    series: null,
    japaneseAnime: null,
    dubbedAnime: null,
    americanAnime: null,
    seriesCategories: {},
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    addRecommendedMovies: (state, action) => {
      state.recommendedMovies = action.payload;
    },
    addComedyMovies: (state, action) => {
      state.comedyMovies = action.payload;
    },
    addHorrorMovies: (state, action) => {
      state.horrorMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addIndianMovies: (state, action) => {
      state.indianMovies = action.payload;
    },
    addAnime: (state, action) => {
      state.anime = action.payload;
    },
    addSeries: (state, action) => {
      state.series = action.payload;
    },
    addJapaneseAnime: (state, action) => {
      state.japaneseAnime = action.payload;
    },
    addDubbedAnime: (state, action) => {
      state.dubbedAnime = action.payload;
    },
    addAmericanAnime: (state, action) => {
      state.americanAnime = action.payload;
    },
    addSeriesCategory: (state, action) => {
  const { category, series } = action.payload;
  state.seriesCategories[category] = series;
},
  },
});

export const {
  addNowPlayingMovies,
  addTrendingMovies,
  addRecommendedMovies,
  addComedyMovies,
  addHorrorMovies,
  addUpcomingMovies,
  addTrailerVideo,
  addIndianMovies,
  addAnime,
  addSeries,
  addJapaneseAnime,
  addDubbedAnime, 
  addAmericanAnime,
  addSeriesCategory
} = movieSlice.actions;

export default movieSlice.reducer;
