import React, { Component } from "react";
import queryString from "query-string";
import WeatherInfo from "./weather_info";
import { getDataOnSubmit } from "../utils/functions";
import Loading from "../common/loading_screen";
import Search from "../common/search";
import DayInfo from "../components/dayinfo";
import { primaryColor } from "../styles/constant";

class Result extends Component {
  state = {
    data: "",
    loading: true,
    error: false,
  };

  async componentDidMount() {
    const { location } = this.props;
    const { city } = queryString.parse(location.search);
    if (city === undefined || city === "") {
      this.props.history.replace("/");
      return false;
    }
    const result = await getDataOnSubmit(city);

    if (result["err_code"]) {
      this.setState({ error: true, loading: false });
      return false;
    }
    this.setState({ data: result, loading: false });
  }

  render() {
    const { data, loading, error } = this.state;
    console.log(error);
    if (loading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        {this.state.error === false ? (
          <React.Fragment>
            <WeatherInfo data={data} />
            <Search />
            <DayInfo daily_weather={data.daily_weather} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div
              style={{
                backgroundColor: primaryColor.color,
                padding: 20,
                color: "white",
              }}
              className="container-fluid"
            >
              <h3>Please enter valid city name</h3>
            </div>
            <Search />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Result;
