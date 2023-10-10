import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./ForCastWeather.css";

export default function ForcastWeather() {
  let [forCastWeather, setForCastWeather] = useState([]);
  let [forCastWeatherIconDay, setForCastWeatherIconDay] = useState(
    "https://developer.accuweather.com/sites/default/files/01-s.png"
  );
  let [forCastWeatherIconNight, setForCastWeatherIconNight] = useState(
    "https://developer.accuweather.com/sites/default/files/30-s.png"
  );
  const [show, setShow] = useState(false);
  let [forCastWeatherSpeci, setForCastWeatherSpeci] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

        let forcastWeatherData = await axios.get(
          `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${userLocation.data.Key}?apikey=Nds12t5IJ9cPQ0G2hUxW5pZYsjHMXI3s`
        );
        setForCastWeather(forcastWeatherData.data.DailyForecasts);
      });
  };

  const getWeather = (data) => {
    setForCastWeatherSpeci(data);
    handleShow(true);

    setForCastWeatherIconDay(
      forCastWeatherSpeci?.Day?.Icon < 0
        ? "0" + forCastWeatherSpeci.Day.Icon
        : forCastWeatherSpeci.Day.Icon
    );
    setForCastWeatherIconNight(forCastWeatherSpeci?.Night?.Icon);
  };

  return (
    <div className="forcastWeather ">
      <h5
        className=" p-2 m-2 bg-dark text-white"
        style={{ position: "sticky", top: "0px", zIndex: "10" }}
      >
        Forecast Weather
      </h5>

      <div className="row d-flex justify-content-center align-items-center ">
        {forCastWeather?.map((item, i) => (
          <div
            key={i}
            className="col-lg-4 m-2 d-flex align-item-center justify-content-center cur"
          >
            <Card
              className="shadow"
              style={{ width: "17rem" }}
              onClick={() => {
                getWeather(item);
              }}
            >
              <Card.Body>
                <Card.Title>
                  <b style={{ fontFamily: "Georgia" }}>
                    {item.Night.IconPhrase}
                  </b>
                </Card.Title>
                <p style={{ fontSize: "10px" }}>
                  <b>Date: </b> {item.Date.slice(0, 10)}
                </p>
                <hr className="hr" />
                <Card.Text>
                  <u style={{ fontFamily: "Georgia" }}>Min-Temp</u> :{" "}
                  <b>{item.Temperature.Minimum.Value} F</b> <br />
                  <u style={{ fontFamily: "Georgia" }}>Max-Temp</u> :{" "}
                  <b>{item.Temperature.Maximum.Value} F</b>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* ////////////////////////////////////////////////////// */}
      {/* Modal */}
      {/* ////////////////////////////////////////////////////// */}

      <Modal
        className="w-100"
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <b>Date :</b> {forCastWeatherSpeci?.Date?.slice(0, 10)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-3">
          <h4>
            <u>TEMPERATURE</u>
          </h4>
          <u style={{ fontFamily: "Georgia" }}>Min-Temp</u> :
          <b>{forCastWeatherSpeci?.Temperature?.Minimum.Value} F</b> <br />
          <u style={{ fontFamily: "Georgia" }}>Max-Temp</u> :
          <b>{forCastWeatherSpeci?.Temperature?.Maximum.Value} F</b>
        </Modal.Body>

        <Modal.Body className="m-3">
          <h4>
            <u>Weather Condition</u>
          </h4>
          <div className="d-flex align-items-center justify-content-between ">
            <span>
              <u style={{ fontFamily: "Georgia" }}>Day-Time</u> :
              <b>{forCastWeatherSpeci?.Day?.IconPhrase} </b> <br />
            </span>
            <img src={forCastWeatherIconDay} alt="" />
          </div>

          <div className="d-flex align-items-center justify-content-between">
            <span>
              <u style={{ fontFamily: "Georgia" }}>Night-Time</u> :
              <b>{forCastWeatherSpeci?.Night?.IconPhrase} </b>
            </span>
            <img src={forCastWeatherIconNight} alt="" />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
