import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
} from "react-router-dom";

import { useState } from "react";

import Header from "./Components/header/Header";
import HomePage from "./Components/HomePage";
import Favorites from "./Components/Favorites";
import Search from "./Components/Search";
import Coin from "./Components/CoinInIform/Coin";
import "./App.css";
import "../src/index.css";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/search", element: <Search /> },
  { path: "/", element: <Favorites /> },
]);

function App() {
  const [search, setSearch] = useState("");
  return (
    <div className="App relative">
      <Router basename="/Coinranking">
        <Header setSearch={setSearch} />
        <main className="bg-zinc-700 w-screen pt-11">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/search" element={<Search />}>
              <Route path=":coinSearch" element={<Search />} />
            </Route>
            <Route path="collection" element={<Favorites />} />
            <Route path="/coin" element={<Coin />}>
              <Route path=":coinId" element={<Coin />} />
            </Route>
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
