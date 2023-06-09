import { Vet_routes, Users_routes } from "./routers";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Users_routes />
        <Vet_routes />
      </BrowserRouter>
    </>
  );
}

export default App;
