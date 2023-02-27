import "./CoinCard.css";
import { Link } from "react-router-dom";
import Coin from "../CoinInIform/Coin";

export default function CoinCard(props) {
  return (
    <div className="coinCardBorder bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div
        style={{ backgroundColor: props.color }}
        className="coinCardBg"
      ></div>
      <div className="flex  flex-col items-center p-4 py-10 text-center bg-zinc-800 justify-center text-white rounded-lg relative z-50">
        <img className="w-16 h-16 drop-shadow-xl " src={props.img} alt="" />
        <div className=" justify-center gap-2 drop-shadow-md flex flex-col">
          <h1
            className="text-1xl font-bold underline coin-name "
            title={props.name + " " + "(" + props.symbol + ")"}
          >
            <span className="w-1">{props.name} </span>({props.symbol})
          </h1>

          <h2 className="justify-self-start">
            Price: {Number(props.price).toFixed(1)}$
          </h2>
          {props.rank ? (
            <p className="justify-self-start">
              Rank: <span>#{props.rank}</span>
            </p>
          ) : null}
        </div>
        <Link
          to={`/coin/${props.coinId}`}
          element={<Coin />}
          key={props.coinId}
          className="text-1xl font-bold underline "
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}
