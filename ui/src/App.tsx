import React from "react";
import "./App.css";
import HawkListing from "./HawkListing";
import "semantic-ui-css/semantic.min.css";
import { Header } from "semantic-ui-react";

const App: React.FC = () => (
  <div className="App">
    <Header as="h1">HAWK REFERENCE DB 9000</Header>
    <HawkListing />
  </div>
);

export default App;
