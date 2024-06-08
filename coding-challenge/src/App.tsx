import React from "react";
import Main from "./components/Main";
import Navigation from "./components/Navigation";
import "./index.css";
const App: React.FC = () => {
  return (
    <div className="App">
      <Navigation />
      <Main />
    </div>
  );
};

export default App;
