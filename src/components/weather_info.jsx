import React, { Component } from "react";
import Loading from "../common/loading_screen";

import humidityimg from "../assets/weather_icon/humidity.png";
import windimg from "../assets/weather_icon/wind.png";
import pressureimg from "../assets/weather_icon/pressure.png";
import { primaryColor } from "../styles/constant";

class WeatherInfo extends Component {
  state = {
    data: "",
    loading: true,
  };

  componentDidMount() {
    this.setState({ data: this.props.data });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    const { data } = this.state;

    const {
      temp,
      humidity,
      pressure,
      wind_speed,
      icon,
      city,
      country,
      current_date: date,
    } = data;

    return (
      <div
        style={{ backgroundColor: primaryColor.color }}
        className="container-fluid"
      >
        <div
          style={{
            margin: "auto",
            flexDirection: "column",
            color: "white",
          }}
          className="row container"
        >
          <h3>
            {city},{country}
          </h3>
          <h5>{date}</h5>
        </div>
        <div style={{ margin: "auto" }} className="row container">
          <div className="col-sm-6 rightdiv">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="row"
            >
              <div
                style={{
                  flex: 1,
                }}
              >
                <h1 style={{ fontSize: 100, color: "white" }}>{temp}°</h1>
              </div>
              <div
                style={{
                  flex: 1,
                }}
              >
                <img
                  src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                  style={{ width: 120, height: 120, alignSelf: "center" }}
                  alt="cloud"
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              color: "white",
            }}
            className="col-sm-6 leftdiv"
          >
            <div style={{ flex: 1 }}>
              <h2>{wind_speed}</h2>
              <img src={windimg} alt="" style={{ width: 40, height: 40 }} />
              <h6>Wind</h6>
            </div>
            <div style={{ flex: 1 }}>
              <h2>{pressure}</h2>
              <img src={pressureimg} alt="" style={{ width: 40, height: 40 }} />
              <h6>Pressure</h6>
            </div>
            <div style={{ flex: 1 }}>
              <h2>{humidity}</h2>
              <img src={humidityimg} alt="" style={{ width: 40, height: 40 }} />
              <h6>Humidity</h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherInfo;
