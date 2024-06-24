import React from "react";
import "./Gettingstarted.scss";
import commonText from './Commontext'
export default function Gettingstarted() {
  return (
    <>
      <div className="Gettingstarted">
        <div className="heading">Getting Started With Bi-Directional Tool</div>
        <div className="details">
          <div className="info">
          {commonText.Gettingstarted.heading}
          </div>
          <div className="overview_head">Overview</div>
          <p className="overview">
          {commonText.Gettingstarted.description}
          </p>
        </div>
      </div>
    </>
  );
}
