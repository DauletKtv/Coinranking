import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinCard from "./CoincCard/CoinCard";
import axios from "axios";
const Search = (props) => {
  const params = useParams();
  const [coins, setCoins] = useState([]);
  const searchresult = (link) => {
    const options = {
      method: "GET",
      url: "https://coinranking1.p.rapidapi.com/search-suggestions",
      params: { referenceCurrencyUuid: "yhjMzLPhuIDl", query: `${link}` },
      headers: {
        "X-RapidAPI-Key": "2c6a9e856emsh24f669204b8e6f9p1e501cjsn88db0c536b57",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setCoins(response.data.data.coins);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  useEffect(() => {
    searchresult(params.coinSearch);
    console.log(params.coinSearch);
  }, [params]);
  return (
    <div className="bg-zinc-700 flex items-center flex-wrap overflow-auto justify-center gap-16 ">
      {coins.map((e) => {
        return (
          <CoinCard
            img={e.iconUrl}
            color={e.color}
            price={e.price}
            name={e.name}
            symbol={e.symbol}
            coinId={e.uuid}
          ></CoinCard>
        );
      })}
    </div>
  );
};
export default Search;
