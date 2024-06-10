import React from "react";
import Main from "./components/Main";
import Navigation from "./components/Navigation";
import OtherUsers from "./components/Users";
import "./index.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="Navigation">
        <Navigation />
      </div>
      <div className="Main">
        <Main />
      </div>
      <div className="OtherUsers">
        <OtherUsers />
      </div>
    </div>
  );
};

export default App;
