import React from "react";
import Jumbotron from "../components/cards/jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers"


const Home = () => {



  return (
    <div className="home-content">
      <div className="jumbo">
        <Jumbotron
          text={["Latest Products", "New Arrivals", " Best Sellers"]}
        />
      </div>
      <h4 className="jumbow">
        New Arrivals
      </h4>

      <NewArrivals/>
      <br/>
      <br/>
      <h4 className="jumbow">
        Best Sellers
      </h4>

      <BestSellers/>
      <br/>
      <br/>
    </div>
  );
};

export default Home;
