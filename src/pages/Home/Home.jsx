import CurrentWeather from "../.././components/CurrentWeather/CurrentWeather"
import ForcastWeather from "../.././components/ForcastWeather/ForcastWeather"
import "./Home.css"

export default function Home() {

  return (
    <div className="Home">

      <CurrentWeather/>
      <ForcastWeather/>
     
    </div>
  );
}
