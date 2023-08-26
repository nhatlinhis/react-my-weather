import React, { useEffect, useState } from "react";
import "./Style.css";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    image: "",
  });
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const handleClick = (e) => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=feb27f9dbdda9e32e18f89ddb23ca9e6`;
      axios
        .get(apiUrl)
        .then((res) => {
          // console.log(res.data.weather[0].main);
          console.log(res.data);
          let imagePath = "";
          if (res.data.weather[0].main == "Clouds") {
            imagePath = "./images/icon_status/clounds.png";
          } else if (res.data.weather[0].main == "Rain") {
            imagePath = "./images/icon_status/rain.png";
          } else if (res.data.weather[0].main == "Drizzle") {
            imagePath = "./images/icon_status/drizzle.png";
          } else if (res.data.weather[0].main == "Mist") {
            imagePath = "./images/icon_status/mist.png";
          } else {
            imagePath = "./images/icon_status/clounds.png";
          }
          // console.log(res.data.weather[0].main);
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
          });
        })
        .catch((err) => {
          if (err.response.status == 404) {
            setError("Invalid City Name");
          } else {
            setError("");
          }
          console.log(err);
        });
    }
  };
  return (
    <div className="container">
      <div className="weahter">
        <div className="search">
          <input
            type="text"
            placeholder="Enter city name"
            onChange={(e) => setName(e.target.value)}
          />
          <button>
            <img
              src="./images/search.png"
              alt="icon-search"
              onClick={handleClick}
            />
          </button>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>
        <div className="winfo">
          <img src={data.image} alt={data.image} />
          <h1>{data.celcius < 50 ? data.celcius : "Error"}°c</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img
                src="./images/humidity-wave-moisture.png"
                alt="img_Humidity"
              />
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img
                src="./images/humidity-wave-moisture.png"
                alt="icons-wind-cloud"
              />
              <div className="wind">
                <p>{data.speed.toFixed(1)}km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
