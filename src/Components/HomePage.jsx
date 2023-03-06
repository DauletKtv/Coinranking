import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CoinCard from "./CoincCard/CoinCard";
import "../App.css";
const HomePage = (props) => {
  const [coin, setCoin] = useState([]);
  const [cardImg, setcardImg] = useState([]);
  //   useEffect(() => {}, [ar]);
  useEffect(() => {
    getCoins(options);
  }, []);
  // useEffect(() => {
  //   CreateImage();
  // }, [coin]);
  const options = {
    method: "GET",
    url: "https://coinranking1.p.rapidapi.com/coins",
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
      "tiers[0]": "1",
      orderBy: "marketCap",
      orderDirection: "desc",
      limit: "50",
      offset: "0",
    },
    headers: {
      "X-RapidAPI-Key": "2c6a9e856emsh24f669204b8e6f9p1e501cjsn88db0c536b57",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  const getCoins = (op) => {
    axios
      .request(op)
      .then(function (response) {
        // console.log(response.data);
        setCoin(response.data.data.coins);
        console.log(coin);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  function CreateImage() {
    if (coin.length < 1) {
      console.log("Пошло не по плану");
      return;
    } else {
      coin.map((e) => {
        console.log(e.iconUrl);

        return <div>123</div>;
      });
    }
  }
  // CreateImage();
  // console.log()
  return (
    <section className="flex items-center flex-wrap overflow-auto justify-center gap-16 bg-zinc-700 ">
      {coin.map((e) => {
        return (
          <CoinCard
            img={e.iconUrl}
            color={e.color}
            price={e.price}
            name={e.name}
            symbol={e.symbol}
            rank={e.rank}
            tier={e.tier}
            link={e.coinrankingUrl}
            coinId={e.uuid}
            ket={e.name}
          ></CoinCard>
        );
      })}
      <Outlet />
    </section>
  );
};
export default HomePage;
