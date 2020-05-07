import React from "react";
import { getCoordinates } from "../utils/functions";
import { primaryColor } from "../styles/constant";

const LocationBtn = (props) => {
  const { HandleOnLoadData } = props;

  return (
    <div
      style={{
        backgroundColor: primaryColor.color,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        flexDirection: "column",
      }}
      className="container-fluid"
    >
      <h4 style={{ color: "white" }}>
        Please allow location permission to see weather for current city
      </h4>
      <button
        style={{
          border: "1px solid grey",
          borderRadius: 20,
          padding: 10,
          width: 200,
          textAlign: "center",
          backgroundColor: "white",
          color: primaryColor.color,
        }}
        onClick={HandleOnLoadData}
      >
        Allow
      </button>
    </div>
  );
};

export default LocationBtn;
