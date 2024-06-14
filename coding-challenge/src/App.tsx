import React from "react";
import Main from "./components/main/Main";
import Navigation from "./components/navigation/Navigation";
import OtherUsers from "./components/users-bar/Users";
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
