import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavbarComponent from "../common/navbar";
import Footer from "../common/footer";
import NotFound from "../common/not-found";
import Loading from "../common/loading_screen";
import Home from "./home";
import { checkLocationPermission } from "../utils/functions";
import Result from "./result";

class App extends Component {
  state = {
    loading: true,
    LocationPermission: "",
  };

  async componentDidMount() {
    const { state } = await checkLocationPermission();
    this.setState({ LocationPermission: state, loading: false });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <NavbarComponent />
        <Switch>
          <Route path="/result/" component={Result} />
          <Route path="/not-found" component={NotFound} />
          <Route
            path="/"
            exact
            render={(props) => (
              <Home
                LocationPermission={this.state.LocationPermission}
                {...props}
              />
            )}
          />
          <Redirect to="not-found" />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
