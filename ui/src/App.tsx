import React, { useEffect, useState } from "react";
import "./App.css";
import HawkListing from "./HawkListing";
import "semantic-ui-css/semantic.min.css";
import { getAllHawks, Hawk } from "./api";

const App: React.FC = () => {
  const [hawks, setHawks] = useState<Hawk[]>([]);

  useEffect(() => {
    getAllHawks().then(allHawks => setHawks(allHawks));
  }, []);

  return (
    <div className="App">
      <HawkListing hawks={hawks} />
    </div>
  );
};

export default App;
