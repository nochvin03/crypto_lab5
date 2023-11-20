import { Routes, Route } from "react-router-dom";
import "./scss/main.scss";
import "./scss/style.scss";
import Ex1 from "./pages/Ex1";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Ex1 />} />
      </Routes>
    </div>
  );
}

export default App;
