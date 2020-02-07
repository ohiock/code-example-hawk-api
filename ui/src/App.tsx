import React from "react";
import "./App.css";
import HawkListing from "./HawkListing";
import "semantic-ui-css/semantic.min.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <HawkListing
        hawks={[
          { id: 1, name: "Cooper's Hawk", size: "Small", gender: "Male" },
          { id: 2, name: "Ferruginous Hawk", size: "Medium", gender: "Female" },
          { id: 3, name: "Swainson's Hawk", size: "Large", gender: "Male" }
        ]}
      />
    </div>
  );
};

export default App;
