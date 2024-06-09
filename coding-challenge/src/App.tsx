import React from "react";
import Main from "./components/Main";
import Navigation from "./components/Navigation";
import OtherUsers from "./components/Users";
import "./index.css";
const App: React.FC = () => {
  return (
    <div className="App">
      <Navigation />
      <Main />
      <OtherUsers />
    </div>
  );
};

export default App;
