import React, { useEffect, useState } from "react";
import axios from "axios";
import sunrise from "../assets/images/sunriseset.png";
import sundefault from "../assets/images/sundefault.png";
import humi from "../assets/images/humi.png";
import vision from "../assets/images/vision.png";
import windspeed from "../assets/images/windspeed.png";
import moon from "../assets/images/moon.webp";
import Card from "./InfoCard";
import CircularProgress from "@mui/joy/CircularProgress";

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  const [sunset, setSunset] = useState("");
  const [sunriseVal, setSunrise] = useState("");
  const [img, setImg] = useState(null);
  //
  const API_KEY = "1b06fa8d6468063d2fbbfcdca37c01e3";

  const dateFomatter = (date) => {
    const ssrDate = new Date(date * 1000);
    const ssTime = ssrDate.toLocaleTimeString();

    return ssrDate.toLocaleTimeString();
  }
  const imageSetter = (response) => {
    if (response.data.weather[0].icon === "01n") {
      setImg(moon);
    } else if (response.data.weather[0].icon === "01d") {
      setImg(sundefault);
    } else if (response.data.weather[0].icon === "02d") {
      setImg(
        "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-cloudy-day-sun-daytime-vector-png-image_4812652.png"
      );
    } else if (
      response.data.weather[0].icon === "03d" ||
      response.data.weather[0].icon === "03n"
    ) {
      setImg(
        "https://png.pngtree.com/png-vector/20220917/ourmid/pngtree-vector-illustration-of-weather-icons-for-cloudy-days-vector-png-image_35563450.png"
      );
    } else if (
      response.data.weather[0].icon === "04d" ||
      response.data.weather[0].icon === "04n"
    ) {
      setImg(
        "https://images.vexels.com/media/users/3/154439/isolated/preview/9aa850bbf2e13772e4fef33d2fc81f9d-dark-clouds-icon.png"
      );
    } else if (
      response.data.weather[0].icon === "09d" ||
      response.data.weather[0].icon === "09n"
    ) {
      setImg(
        "https://cdn0.iconfinder.com/data/icons/weather-status/64/weatherfilled-09-512.png"
      );
    } else if (response.data.weather[0].icon === "10d") {
      setImg(
        "https://cdn3.iconfinder.com/data/icons/picons-weather/57/13_showers-512.png"
      );
    } else if (response.data.weather[0].icon === "10n") {
      setImg("https://cdn-icons-png.flaticon.com/512/7696/7696717.png");
    } else if (
      response.data.weather[0].icon === "11d" ||
      response.data.weather[0].icon === "11n"
    ) {
      setImg(
        "https://icon-library.com/images/thunderstorm-icon/thunderstorm-icon-7.jpg"
      );
    } else if (
      response.data.weather[0].icon === "13d" ||
      response.data.weather[0].icon === "13n"
    ) {
      setImg(
        "https://www.freepnglogos.com/uploads/snowflake-png/snowflake-snow-winter-image-pixabay-9.png"
      );
    } else if (
      response.data.weather[0].icon === "50d" ||
      response.data.weather[0].icon === "50n"
    ) {
      setImg("https://cdn-icons-png.flaticon.com/512/175/175872.png");
    }
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1b06fa8d6468063d2fbbfcdca37c01e3&units=metric`
      );
      setSunset(dateFomatter(response.data.sys.sunset))
      setSunrise(dateFomatter(response.data.sys.sunrise));
      imageSetter(response);
      setWeather(response.data);
      console.log(response.data.weather);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
          );
          setSunset(dateFomatter(response.data.sys.sunset))
          setSunrise(dateFomatter(response.data.sys.sunrise));
          imageSetter(response);
          setWeather(response.data);
        } catch (error) {
          console.error(error);
        }
      });
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div className="min-h-screen text-white bg-gradient-to-tr from-[#373b52] to-[#1d1e26]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchWeather();
        }}
        className="flex p-[20px]"
      >
        <input
          className="bg-transparent outline-none flex-grow text-[#BFD2FF]"
          type="text"
          value={city}
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="delete_btn">Search</button>
      </form>
      {weather ? (
        //if had weather
        <>
          <div className="">
            <div className="flex my-[20px] sm:my-[50px] w-full justify-center items-center space-x-[0%] sm:space-x-[50%]">
              <div className="">
                <h1 className="text-5xl sm:text-8xl pt-2">{`${weather.main.temp}°`}</h1>
                <h1 className="text-1xl sm:text-3xl pt-2">
                  {`${weather.weather[0].main},`}{" "}
                  <p className="text-sm sm:text-2xl">
                    {weather.weather[0].description}
                  </p>
                </h1>
                <h1 className="text-xl pt-2">
                  {`${weather.name},`}{" "}
                  <p className="text-sm sm:text-base">{weather.sys.country}</p>
                </h1>
                <h1 className="text-base sm:text-xl pt-2">{`${weather.main.temp_max}° / ${weather.main.temp_min}° Feels like ${weather.main.feels_like}°`}</h1>
              </div>

              <div>
                <img className="bimg_size" src={img} alt="" />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4  p-[9px] w-full ">
              <div className="card_design my-[15px]">
                <img className="img_size" src={sunrise} alt="" />
                <div className="card_text text-xs sm:text-lg px-[5px] text-[#afafaf]">
                  <div>
                    <h1>Sunset</h1>
                    <h1>{sunriseVal}</h1>
                  </div>
                  <div>
                    <h1>Sunrise</h1>
                    <h1>{sunset}</h1>
                  </div>
                </div>
              </div>

              <Card
                url={humi}
                title="Humidity"
                val={`${weather.main.humidity}`}
              />
              <Card
                url={vision}
                title="Visibility"
                val={`${weather.visibility}`}
              />
              <Card
                url={windspeed}
                title="Wind Speed"
                val={`${weather.wind.speed} Km/h`}
              />
            </div>
          </div>
        </>
      ) : (
        //if not
        <>
          <div className="min-h-screen w-full flex flex-col justify-center items-center">
            <p className="mb-10 font-bold">If not stop loading, try checking location permissions.</p>
            <CircularProgress color="neutral"
              size="lg"
              value={40}
              variant="soft" />
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherCard;
