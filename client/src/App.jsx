import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import BookingForm from "./components/BookingForm.jsx";
import UserLogin from "./components/UserLogin.jsx";
import UserRegistration from "./components/UserRegistration.jsx";
import UserProfile from "./components/UserProfile.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import TopNav from "./components/TopNav.jsx";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <div className="container">
          <TopNav />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/booking/:id" element={<BookingForm />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegistration />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
