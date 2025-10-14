import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import appStore from "./utils/appStore";

import Login from "./components/Login"
import Browse from "./components/Browse";
import Anime from "./components/Anime";
import Series from "./components/Series";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import MovieDetailWrapper from "./components/MovieDetailWrapper";

function App() {
  return (
    <div className="App">
      <Provider store={appStore}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/anime" element={<Anime />} />
            <Route path="/series" element={<Series />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/movie/:type/:id" element={<MovieDetailWrapper />} />

          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
