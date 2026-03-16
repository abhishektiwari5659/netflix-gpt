# MovieMate 🎬🤖  

[![React](https://img.shields.io/badge/React-18.0-blue?logo=react)](https://react.dev/)  
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)](https://redux-toolkit.js.org/)  
[![Firebase](https://img.shields.io/badge/Firebase-Auth-orange?logo=firebase)](https://firebase.google.com/)  
[![TMDB](https://img.shields.io/badge/TMDB-API-01d277?logo=themoviedb)](https://www.themoviedb.org/)  
[![Gemini AI](https://img.shields.io/badge/Google-Gemini-4285F4?logo=google)](https://ai.google.dev/)  
[![Vercel](https://img.shields.io/badge/Hosted%20on-Vercel-black?logo=vercel)](https://netflix-gpt-self-six.vercel.app)  
[![Last Commit](https://img.shields.io/github/last-commit/abhishektiwari5659/netflix-gpt)](https://github.com/abhishektiwari5659/netflix-gpt/commits/main)  
[![Repo Size](https://img.shields.io/github/repo-size/abhishektiwari5659/netflix-gpt)](https://github.com/abhishektiwari5659/netflix-gpt)  
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)  

🔗 **Live Demo:** [MovieMate on Vercel](https://moviemate-opal.vercel.app/)  

---

## 📖 Description  

**MovieMate**  

MovieMate is a **Netflix-inspired web application** enhanced with AI.  
It combines **Firebase authentication, Redux state management, TMDB APIs, and Google Gemini (AI)** to deliver a personalized movie discovery experience.  

Users can **sign up, log in, browse trending titles, view trailers, see cast info, and even type in what they want to watch**—where Gemini AI suggests **movies tailored to their preferences**.  

---

## Features  

- **Authentication with Firebase** – Sign Up / Sign In, profile management  
- **Redux Toolkit** – Stores user info, movies, preferred language  
- **TMDB API** – Fetches Now Playing, Trending, Upcoming, Indian, Anime, Comedy, Horror, etc.  
- **Movie Detail Page** – Trailer as background + cast info + related movies  
- **Gemini AI Recommendations** – “Get What You Like” page suggests movies by mood/genre  
- **Multi-language support** – Available in the AI recommendations page  
- **Modern UI/UX** – Netflix-style, responsive for all devices  

---

## Tech Stack  

- **Frontend:** React, TailwindCSS  
- **State Management:** Redux Toolkit  
- **Authentication:** Firebase Auth  
- **APIs:**  
  - [TMDB API](https://www.themoviedb.org/documentation/api)  
  - [Google Gemini](https://ai.google.dev/)  
- **Hosting:** Vercel  

---

## Project Structure  

```
Netflix-GPT/
│── public/                # Static assets
│── src/
│   ├── components/        # UI Components (Header, Login, MovieList, MovieDetail, etc.)
│   ├── hooks/             # Custom hooks (fetching TMDB data, etc.)
│   ├── utils/             # Firebase config, Redux slices, helpers
│   ├── App.js             # Main App component
│   └── index.js           # Entry point
│── .env.example           # Example environment variables
│── package.json
│── README.md
```

---

## Environment Variables  

Copy `.env.example` to `.env` and fill in your keys:  

```bash
# Firebase configuration
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id_here
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
REACT_APP_FIREBASE_APP_ID=your_app_id_here
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id_here

# TMDB API key
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here

# Google Gemini / Generative AI API key
REACT_APP_GOOGLE_API_KEY=your_google_api_key_here
```

---

## Getting Started  

### 1. Clone the repository  
```bash
git clone https://github.com/abhishektiwari5659/netflix-gpt.git
cd netflix-gpt
```

### 2. Install dependencies  
```bash
npm install
```

### 3. Setup environment variables  
```bash
cp .env.example .env
```
Fill in your Firebase, TMDB, and Gemini API keys.  

### 4. Run the app locally  
```bash
npm start
```

---

## Future Enhancements  

- 📌 **User Watchlist & Favorites** – Save movies to your account  
- 📌 **AI-powered Summaries & Smart Trailers** with Gemini  
- 📌 **Improved Multi-language support** across the entire app  
- 📌 **Personalized Profiles** – Multiple users per account (like Netflix profiles)  

---

## Contributing  

Contributions are welcome!  

1. Fork the repo  
2. Create a new branch (`feature/your-feature`)  
3. Commit changes  
4. Open a Pull Request  

---

## License  

This project is licensed under the **MIT License**.  
