import axios from "axios";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { setFavorites } from "../../features/favorites/favoritesSlice,js";
import { setPeriod } from "../../features/period/periodSlice";
import "./Coin.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import Links from "./Links/Links";
import TimePeriodBtn from "./TimePeriodBrn/TimePeriodBtn";
export default function Coin() {
  const dispatch = useDispatch();

  const params = useParams();

  const setFavoritesHandler = (e) => {
    const favorites = params.coinId;
    console.log(favorites);
    dispatch(setFavorites(favorites));
    console.log(e.target);
  };
  const choosed = useSelector((state) => state.period.period);
  const setChoosed = (e) => {
    setCahrtPeriod(e.target.innerText);
    console.log(e.target.innerText);
    dispatch(setPeriod(e.target.innerText));
    console.log(choosed);
  };
  const [chartOption, setChartOption] = useState({
    chart: {
      height: 350,
      type: "line",
      background: "white",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: `Price 24h`,
      align: "left",
    },
    grid: {
      row: {
        colors: ["white", "transparent"],
        // colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
      column: {
        colors: ["white"],
      },
    },
    selection: {
      enabled: true,
    },
    // xaxis: {
    //   categories: [
    //     "25",
    //     "24",
    //     "23",
    //     "22",
    //     "21",
    //     "20",
    //     "19",
    //     "18",
    //     "17",
    //     "16",
    //     "15",
    //     "14",
    //     "13",
    //     "12",
    //     "11",
    //     "10",
    //     "9",
    //     "8",
    //     "7",
    //     "6",
    //     "4",
    //     "3",
    //     "2",
    //     "1",
    //   ],
    // },
  });

  const [coin, setCoin] = useState({});
  const [chartSeries, setChartSeries] = useState({});
  const [chartPeriod, setCahrtPeriod] = useState("24h");
  const changeActive = () => {};
  console.log(params.coinId);

  const createDate = (time) => {
    let date = new Date(time * 1000);
    console.log(date.toString());
    return date.toLocaleDateString().split("/").join(".");
  };
  const usePreriod = (e) => {
    setChartOption({
      ...chartOption,
      ...(chartOption.title.text = `Price ${choosed}`),
    });
    const options = {
      method: "GET",
      url: `https://coinranking1.p.rapidapi.com/coin/${params.coinId}`,
      params: { referenceCurrencyUuid: "yhjMzLPhuIDl", timePeriod: `${e}` },
      headers: {
        "X-RapidAPI-Key": "2c6a9e856emsh24f669204b8e6f9p1e501cjsn88db0c536b57",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        setCoin(response.data.data.coin);
        console.log(coin);
        // console.log(response.data.data.coin);

        setChartSeries([
          {
            name: response.data.data.coin.name + "/$",
            data: response.data.data.coin.sparkline.map((elem) =>
              Number(elem).toFixed(1)
            ),
          },
        ]);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  useEffect(() => {
    usePreriod(choosed);
  }, [choosed]);

  const [timePeriod, setTimePeriod] = useState([
    { active: false, period: "24h" },
    { active: false, period: "7d" },
    { active: false, period: "30d" },
    { active: false, period: "1y" },
    { active: false, period: "5y" },
  ]);
  const chooseTime = (elem) => {
    setTimePeriod([...timePeriod]);
    elem = !elem;
    console.log(elem);
  };
  const coins = useSelector((state) => state.favorites.favorites);
  const rankStyle = {
    boxShadow: `${coin.color} 0px 2px 14px 4px`,
    padding: "3px 10px",
    borderRadius: "5px",
  };
  console.log(choosed);
  return (
    <div className="flex justify-center text-white flex-col items-center gap-y-4 coinPage bg-zinc-700">
      <div className="w-8/12 bg-zinc-800 CoinPageBlock ">
        <div className="flex justify-between felx-row mb-3">
          <div
            // className={`shadow-{${coin.color}} drop-shadow-{0px 43px 89px 3px }`}
            style={rankStyle}
          >
            Rank #{coin.rank}
          </div>
          <div className="" onClick={(e) => setFavoritesHandler(e)}>
            <svg
              height="25"
              width="23"
              classNmae="star rating"
              data-rating="2"
              className={
                coins.includes(params.coinId)
                  ? "fill-yellow-300 cursor-pointer"
                  : "cursor-pointer"
              }
            >
              <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" />
            </svg>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-12">
            <div className="flex gap-2">
              <img src={coin.iconUrl} alt="" className="w-6" />
              <div className="">{coin.name}</div>
            </div>

            <div>{coin.symbol}/USD</div>
          </div>

          <div>{Number(coin.price).toFixed(1)}$</div>
        </div>
      </div>
      {coin.description ? (
        <div className="w-8/12 bg-zinc-800 CoinPageBlock">
          <h2 className="font-bold text-lg">About</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                coin.description ? coin.description : ""
              ),
            }}
          ></div>
        </div>
      ) : null}
      <div className="w-8/12 bg-zinc-800 CoinPageBlock text-black">
        <h2 className="font-bold text-lg text-white">Chart</h2>
        <div className="flex gap-20 p-2 mb-2 preriodRow">
          {timePeriod.map((e) => (
            <TimePeriodBtn
              text={e}
              key={e.period}
              setChoosed={(e) => {
                setChoosed(e);
              }}
              choose={(e) => {
                chooseTime(e);
              }}
              choosedClass={choosed == e.period ? true : false}
            />
          ))}
        </div>
        <Chart
          options={chartOption}
          series={chartSeries}
          type="line"
          height={350}
          className=""
        />
      </div>
      <div className="flex w-8/12  text-white justify-between bg-zinc-800 CoinPageBlock">
        <div className="flex flex-col bg-zinc-800 CoinPageBlock">
          <h3 className="text-lg font-bold">Information</h3>
          <div>
            {coin.allTimeHigh ? (
              <p>
                The highest price: {Number(coin.allTimeHigh.price).toFixed(1)} (
                {createDate(coin.allTimeHigh.timestamp)})
              </p>
            ) : null}
          </div>
          <div>
            <p>
              {coin.supply
                ? "In circulation:" +
                  Math.floor(Number(coin.supply.circulating)) +
                  "$"
                : null}
            </p>
          </div>
          <div>
            <p>Market capitalization: {Math.floor(Number(coin.marketCap))}$</p>
          </div>
          <div>
            <p>Listed at: {createDate(coin.listedAt)}</p>
          </div>
        </div>
        <div className="flex flex-col bg-zinc-800 CoinPageBlock max-h-52 overflow-y-auto">
          <h3 className="text-lg font-bold">More About</h3>
          {coin.links && coin.links.length > 0
            ? coin.links.map((e) => (
                <Links name={e.name} type={e.type} url={e.url} key={e.name} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
