import React from "react";
import Nav from "./components/nav";
import "./App.css";
import Title from "./components/title";
import Card from "./components/Card";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Nav />
      <main>
        <Title />
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              <Card />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default App;
