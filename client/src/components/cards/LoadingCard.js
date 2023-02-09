import React from "react";
import { Card,Skeleton } from "antd";


const LoadingCart = ({count}) => {
  const Cards = () => {
    let totalCards = []

    for(let i= 0; i <count; i++) {
      totalCards.push(
        <Card key={i} className=" col-lg-3 col-md-5 p-3 m-1 ">
          <Skeleton active></Skeleton>
        </Card>
      );
    }
    return totalCards;
  };
  return <div className="row pb-5">{Cards()}</div>
};
export default LoadingCart;
