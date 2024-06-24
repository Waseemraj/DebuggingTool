import React from "react";
import "./Userinfo.scss";
import { useUserDetails } from "../Contexts/Usercontext";

import { useState, useEffect } from "react";

export const Userinfo = ({ props }) => {
  const [mapingstatus, setmapiingstatus] = useState("");
  const [subscriptionstatus, setsubscriptionstatus] = useState("");
  const { userFound, mapping_or_subscription, userSubscribed } =useUserDetails();
  const [Remark, setRemark] = useState("");
  const [mapping, setmapping] = useState("");
  const [subscription, setsubscription] = useState("");
  useEffect(() => {
    if (mapping_or_subscription == "mapping") {
      setmapping("mapping");
    } else {
      setsubscription("subscription");
    }

    if (userFound) {
      if (userSubscribed) {
        setmapiingstatus("Wx User Id and MS User Id are Mapped properly");
        setsubscriptionstatus("This User Is Subscribed");
        setRemark(
          "Based on the above information,we are concluding that this user presence works smoothly."
        );
      } else {
        setsubscriptionstatus("Mapping is Present ,User is not Subscribed.");
        setRemark(
          "Based on the above information,we are concluding that this user is mapped but not Subscribed"
        );
      }
    } else {
      setsubscriptionstatus(
        "Mapping is missing ,User will not be able to Subscribed."
      );
      setmapiingstatus("Wx User Id and MS User Id are not Mapped properly");
      setRemark(
        "Based on the above information,we are concluding that this user needs to login into integeration app."
      );
    }
  }, [userFound, userSubscribed]);
  return (
    <>
      <div className="user_info">
        <div className="box_1">
          {mapping && (
            <div className="mapping_staus">
              <div className="mapping_text ">Mapping Status</div>
              <span className="status">:</span>{" "}
              <div className="status">{mapingstatus}</div>
            </div>
          )}

          {subscription && (
            <div className="mapping_staus">
              <div className="mapping_text">Subscription Status</div>
              <span className="status">:</span>{" "}
              <div className="status">{subscriptionstatus}</div>
            </div>
          )}
          <div className="remark">
            <div>Remark</div>
            <span className="status">:</span>
            <div className="status">{Remark}</div>
          </div>
        </div>
      </div>
    </>
  );
};
