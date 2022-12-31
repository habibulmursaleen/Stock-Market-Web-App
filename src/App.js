import { BrowserRouter, Routes, Route } from "react-router-dom"
import StockOverView from "./Pages/StockOverView";
import StockDetails from "./Pages/StockDetails";
import StockListContextProvider from "./context/StockListContext";

function App() {
  return (
    <div className="container">
      <StockListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StockOverView/>}/>  
            <Route path="/details/:symbol" element={<StockDetails/>}/>
          </Routes>
        </BrowserRouter>
      </StockListContextProvider>
    </div>
  );
}

export default App;
