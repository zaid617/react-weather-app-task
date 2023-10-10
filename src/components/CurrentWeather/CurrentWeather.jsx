import { useEffect, useState } from "react";
import axios from "axios";
import "./currentWeather.css";

export default function CurrentWeather() {
  let [currentWeather, setCurrentWeather] = useState([]);
  let [city, setCity] = useState("");
  let [country, setCountry] = useState("");
  let [currentLink, setCurrentLink] = useState(
    "https://developer.accuweather.com/sites/default/files/01-s.png"
  );

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then(async (data) => {
        let userLocation = await axios.get(
          `http://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=Nds12t5IJ9cPQ0G2hUxW5pZYsjHMXI3s&q=${data.ip}`
        );

        let currentWeatherData = await axios.get(
          `http://dataservice.accuweather.com/currentconditions/v1/${userLocation.data.Key}?apikey=Nds12t5IJ9cPQ0G2hUxW5pZYsjHMXI3s`
        );

        setCurrentWeather(currentWeatherData.data);
        setCountry(userLocation?.data?.Country?.LocalizedName);
        setCity(userLocation?.data?.AdministrativeArea?.LocalizedName);

        setCurrentLink(
          `https://developer.accuweather.com/sites/default/files/${
            currentWeatherData.data[0].WeatherIcon < 10
              ? "0" + currentWeatherData.data[0].WeatherIcon
              : currentWeatherData.data[0].WeatherIcon
          }-s.png`
        );
      });
  };

  return (
    <div className="currentWeather">
      <h1 className="current">Current Weather</h1>

      <hr className="hr" />

      {currentWeather.map((item) => (
        <>
          <img src={currentLink} className="sun" alt="" />
          <h1 className="weatherTemp">
            {item.Temperature.Metric.Value} &#8451;
          </h1>
          <p className="info">{item.WeatherText}</p>
          <div className="hr"></div>
          <h2 className="city">
            {city} <span style={{ fontSize: "12px" }}>{`(${country})`}</span>
          </h2>
        </>
      ))}
    </div>
  );
}
