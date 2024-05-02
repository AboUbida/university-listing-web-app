import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListingPage from "./components/ListingPage/ListingPage";
import DetailsPage from "./components/DetailsPage/DetailsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<ListingPage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
