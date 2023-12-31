import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Search from "./pages/Search";
import ViewDetail from "./pages/ViewDetail";
import { MyContextProvider } from "./context/provider";
import Layout from "./components/Layout/Layout";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <MyContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Search />} />
            <Route path="/view-details" element={<ViewDetail />} />
          </Route>
        </Routes>
      </MyContextProvider>
    </BrowserRouter>
  );
}

export default App;
