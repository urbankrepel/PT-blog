import React from "react";
import { User } from "../classes/user.dto";
import Card from "../components/Card";
import Cards from "../components/Cards"; //importate Cards
import Footer from "../components/Footer";
import Nav from "../components/nav";
import Title from "../components/title";

const Home = ({ user }: { user: User }) => {
  return (
    <>
      <main>
        <Title user={user} />
        <div className="album py-5 bg-light">
          <div className="container ">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              <Cards user={user} />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Home;
