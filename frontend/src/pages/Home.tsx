import React from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Nav from "../components/nav";
import Title from "../components/title";

const Home = () => {
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
};

export default Home;
