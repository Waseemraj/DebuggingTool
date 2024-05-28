import React from "react";
import "./Gettingstarted.scss";
export default function Gettingstarted() {
  return (
    <>
      <div className="Gettingstarted">
        <div className="heading">Getting Started With Bi-Directional Tool</div>
        <div className="details">
          <div className="info">
            Get Mapping and subscription status of User's with the help of this
            tool
          </div>
          <div className="overview_head">Overview</div>
          <p className="overview">
            When using this designated tool, administrators can quickly determine
            a user's mapping and subscription status. By searching for a user,
            if no records are found, it indicates the user has not logged into
            the Webex Calling Integration app within Microsoft Teams. The TAC or
            engineering team would then prompt the user to log in at least once.
            For users present in the system, the tool checks if they have an
            active subscription to facilitate presence updates from MS Teams to
            Webex. This process ensures that user access and service
            integrations are both up-to-date and functioning as intended,
            streamlining the management of user statuses within the organization
          </p>
        </div>
      </div>
    </>
  );
}
