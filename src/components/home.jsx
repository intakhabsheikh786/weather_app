import React, { Component } from "react";
import WeatherInfo from "./weather_info";
import Search from "../common/search";
import LocationBtn from "../common/location_btn";
import Loading from "../common/loading_screen";
import { getDataOnLoad } from "../utils/functions";
import DayInfo from "./dayinfo";

class Home extends Component {
  state = {
    LocationPermission: this.props.LocationPermission,
    loading: true,
    data: "",
  };

  LoadData = async () => {
    const result = await getDataOnLoad();
    if (result["err_code"]) {
      alert("Please allow location to see your current location weather");
      return;
    }
    this.setState({ data: result, LocationPermission: "granted" });
  };

  async componentDidMount() {
    const { LocationPermission } = this.state;
    if (LocationPermission === "granted") {
      const result = await getDataOnLoad();
      this.setState({ data: result });
    }

    this.setState({ loading: false });
  }

  render() {
    const { loading, LocationPermission, data } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        {LocationPermission === "granted" ? (
          <React.Fragment>
            <WeatherInfo data={data} />
            <Search />
            <DayInfo daily_weather={data.daily_weather} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <LocationBtn HandleOnLoadData={this.LoadData} />
            <Search />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Home;
