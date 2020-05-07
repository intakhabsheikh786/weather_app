import React, { Component } from "react";
import Loading from "../common/loading_screen";
import LocationBtn from "../common/location_btn";
import cloudimg from "../assets/weather_icon/mooncloud.png";
import humidityimg from "../assets/weather_icon/humidity.png";
import windimg from "../assets/weather_icon/wind.png";
import pressureimg from "../assets/weather_icon/pressure.png";
import { primaryColor } from "../styles/constant";
import {
  rev_geocoding,
  // checkLocationPermission,
  getCoordinates,
  getWeatherData,
} from "../utils/functions";

class WeatherInfo extends Component {
  state = {
    address: {
      city: "",
      country: "",
    },
    current_date: new Date().toDateString(),
    data: {
      location_obj: {
        latitude: "",
        longitude: "",
        LocationStatus: this.props.LocationStatus,
      },
      current_weather: {
        temp: 31,
        humidity: 20,
        wind_speed: 26,
        pressure: 10,
        icon: "",
      },
    },
    loading: true,
  };

  async componentDidMount() {
    if (this.state.data.location_obj.LocationStatus === "granted") {
      getCoordinates(
        (coodinates) => {
          this.handleLocationService({
            latitude: coodinates.latitude,
            longitude: coodinates.longitude,
            LocationStatus: "granted",
          });
          const {
            latitude: lat,
            longitude: lon,
          } = this.state.data.location_obj;

          rev_geocoding(lat, lon).then((res) => {
            const address = {};
            address.city = res.address.city;
            address.country = res.address.country;
            this.setState({ address });
          });
          getWeatherData(lat, lon).then((res) => {
            console.log(res);
            const current_weather = {};
            const { temp, pressure, humidity, wind_speed } = res.current;
            const { icon } = res.current.weather[0];
            current_weather.temp = temp;
            current_weather.pressure = pressure;
            current_weather.humidity = humidity;
            current_weather.wind_speed = wind_speed;
            current_weather.icon = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            const { data } = this.state;
            data.current_weather = current_weather;
            this.setState({ data, loading: false });
          });
        },
        (err) => {
          console.log("err");
        }
      );
    } else {
      this.setState({ loading: false });
    }
  }

  handleLocationService = (obj) => {
    let old_data = this.state.data;
    old_data.location_obj = obj;
    this.setState({ data: old_data });
  };

  render() {
    if (this.state.loading) {
      return <Loading></Loading>;
    }
    const {
      temp,
      humidity,
      pressure,
      wind_speed,
      icon,
    } = this.state.data.current_weather;
    return (
      <div
        style={{ backgroundColor: primaryColor.color }}
        className="container-fluid"
      >
        {this.state.data.location_obj.LocationStatus === "granted" ? (
          <React.Fragment>
            <div
              style={{
                margin: "auto",
                flexDirection: "column",
                color: "white",
              }}
              className="row container"
            >
              <h3>
                {this.state.address["city"]},{this.state.address["country"]}
              </h3>
              <h5>{this.state.current_date}</h5>
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
                      src={icon}
                      style={{ width: 150, height: 150, alignSelf: "center" }}
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
                  <h1>{wind_speed}</h1>
                  <img src={windimg} alt="" style={{ width: 40, height: 40 }} />
                  <h6>Wind</h6>
                </div>
                <div style={{ flex: 1 }}>
                  <h1>{pressure}</h1>
                  <img
                    src={pressureimg}
                    alt=""
                    style={{ width: 40, height: 40 }}
                  />
                  <h6>pressure</h6>
                </div>
                <div style={{ flex: 1 }}>
                  <h1>{humidity}</h1>
                  <img
                    src={humidityimg}
                    alt=""
                    style={{ width: 40, height: 40 }}
                  />
                  <h6>humidity</h6>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <LocationBtn onLocationChange={this.handleLocationService} />
        )}
      </div>
    );
  }
}

export default WeatherInfo;
