import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CoinCard from "./CoincCard/CoinCard";
const Favorites = (props) => {
  const [coins, setCoins] = useState([]);

  // const options = {
  //   method: "GET",
  //   url: `https://coinranking1.p.rapidapi.com/coin/${params.coinId}`,
  //   params: { referenceCurrencyUuid: "yhjMzLPhuIDl", timePeriod: "24h" },
  //   headers: {
  //     "X-RapidAPI-Key": "2c6a9e856emsh24f669204b8e6f9p1e501cjsn88db0c536b57",
  //     "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  //   },
  // };
  let newFAforites = [];
  let favoritesCoins = useSelector((state) => state.favorites.favorites);
  console.log(favoritesCoins);
  function createFavorites() {
    // setCoins(favoritesCoins);
    console.log(favoritesCoins);

    favoritesCoins.forEach((e) => {
      if (newFAforites.includes(e)) {
        return;
      } else {
        newFAforites.push(e);
        // console.log(newFAforites);
        const options = {
          method: "GET",
          url: `https://coinranking1.p.rapidapi.com/coin/${e}`,
          params: { referenceCurrencyUuid: "yhjMzLPhuIDl", timePeriod: "24h" },
          headers: {
            "X-RapidAPI-Key":
              "2c6a9e856emsh24f669204b8e6f9p1e501cjsn88db0c536b57",
            "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
          },
        };
        axios
          .request(options)
          .then(function (response) {
            setCoins((coins) => [...coins, response.data.data.coin]);

            console.log(coins);
            // console.log(response.data.data.coin);
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    });
  }

  useEffect(() => {
    createFavorites();
  }, []);
  return (
    <div>
      <div className="flex items-center flex-wrap overflow-auto justify-center gap-16">
        {coins.map((e) => {
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
            ></CoinCard>
          );
        })}
      </div>
    </div>
  );
};
export default Favorites;
