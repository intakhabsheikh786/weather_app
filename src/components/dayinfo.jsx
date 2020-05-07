import React from "react";
import { primaryColor } from "../styles/constant";

const arr = [31, 28, 29, 30, 32];

const day = (obj) => {
  const element = [];
  for (let item in obj) {
    console.log(obj);
    element.push(
      <div
        style={{
          border: "1px solid grey",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          borderRadius: 10,
          marginRight: 5,
          width: 250,
        }}
        key={item}
      >
        <div>
          <h3 style={{ alignSelf: "center" }}>{obj[item].weather}</h3>
          <img
            src={`http://openweathermap.org/img/wn/${obj[item].icon}@2x.png`}
            style={{ width: 150, height: 150 }}
            alt=""
          />
          <h1>
            {Math.round(obj[item].min)}/{Math.round(obj[item].max)}°
          </h1>
        </div>
      </div>
    );
  }
  return element;
};

const DayInfo = ({ daily_weather }) => {
  return (
    <div>
      <center>
        <h2
          style={{
            paddingTop: 15,
            paddingBottom: 15,
            color: primaryColor.color,
          }}
        >
          Five days forecast
        </h2>
      </center>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginRight: 10,
          marginLeft: 10,
          alignItems: "center",
          marginTop: 10,
          color: primaryColor.color,
        }}
        className="container-fluids"
      >
        <div className="row">{day(daily_weather)}</div>
      </div>
    </div>
  );
};

export default DayInfo;
