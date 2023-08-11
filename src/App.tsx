import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Search from "./pages/Search";
import ViewDetail from "./pages/ViewDetail";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/view-details" element={<ViewDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
