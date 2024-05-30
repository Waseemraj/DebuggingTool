import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./Forms.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useUserDetails } from "../Contexts/Usercontext";
import { Userinfo } from "./Userinfo";
import { aore, afra, achm } from "../data";

export const Forms = () => {
  const {
    User,
    setUser,
    checkID,
    checkSub,
    machineBearerToken,
    getaccessToken,
    getBearerToken,
  } = useUserDetails();
  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);
  const [snackopen, setSnackOpen] = useState(false);
  const handleClose = () => {
    setSnackOpen(false);
  };
  const INT_BASE_URL = `https://msft-presence-service.int-first-general1.ciscospark.com/`;

  useEffect(() => {
    getBearerToken();
  }, []);
  useEffect(() => {
    if (machineBearerToken) {
      getaccessToken(machineBearerToken);
    }
  }, [machineBearerToken]);

  let allmaps = {};
  async function handleSubmit(e) {
    e.preventDefault();

    if (User.environment === "Production") {
      // fetchUserData(PROD_PEOPLE, mail);
      let userExists = false;
      if (aore.wxUserMapping && aore.wxUserMapping[User.userdetail]) {
        const { wxUserId, msUserId, wxOrgId } =
          aore.wxUserMapping[User.userdetail];
        return (
          <Userinfo wxUserId={wxUserId} msUserId={msUserId} wxOrgId={wxOrgId} />
        );
      }
      if (achm.wxUserMapping && achm.wxUserMapping[User.userdetail]) {
        const { wxUserId, msUserId, wxOrgId } =
          achm.wxUserMapping[User.userdetail];
        return (
          <Userinfo wxUserId={wxUserId} msUserId={msUserId} wxOrgId={wxOrgId} />
        );
      }
      if (afra.wxUserMapping && afra.wxUserMapping[User.userdetail]) {
        const { wxUserId, msUserId, wxOrgId } =
          afra.wxUserMapping[User.userdetail];
        return (
          <Userinfo wxUserId={wxUserId} msUserId={msUserId} wxOrgId={wxOrgId} />
        );
      }
      if (!userExists) {
        window.alert("User does not exist");
      }
    } else {
      const Mapping_URL =
        INT_BASE_URL + "msft-presence-service/api/v1/allUserMapping";
      await axios
        .get(Mapping_URL, {
          headers: { Authorization: `Bearer ${User.token}` },
        })
        .then((res) => {
          allmaps = res.data;
          if (User.userdetail.length !== 0) {
            setInfo(true);
          }
          checkID(res.data, User);
        });

      const Subscription_URL =
        INT_BASE_URL + "msft-presence-service/api/v1/allSubscriptions";
      await axios
        .get(Subscription_URL, {
          headers: { Authorization: `Bearer ${User.token}` },
        })
        .then((res) => {
          checkSub(allmaps, res.data.subscribedUser, User);
        });
      if (User.userdetail.length === 0 || User.token.length === 0) {
        setError(true);
      } else {
        setSnackOpen(true);
      }
    }
  }

  return (
    <>
      {snackopen && (
        <Snackbar
          open={snackopen}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Submitted Successfully
          </Alert>
        </Snackbar>
      )}
      <div className="container1">
        <div className="box1">
          <div className="first_section">
            <div className="head">Header</div>
            <div className="content_type">
              Content-Type <span>application/json</span>
            </div>
            <div className="auth">
              <div className="auth-text">Authorization</div>
              <div className="token">
                <span className="bearer_text">Bearer</span>
                <input
                  type="password"
                  className="bearer_input"
                  readOnly="readOnly"
                  value={User.token}
                />
              </div>
            </div>
          </div>
          <div className="second_section">
            <form className="forms" onSubmit={handleSubmit}>
              <div className="request">Request</div>
              <div className="enviroment">
                <span className="enviromentvalue"> Environment</span>
                <select
                  id="Environment"
                  onChange={(e) => {
                    e.preventDefault();
                    setUser({ ...User, environment: e.target.value });
                  }}
                >
                  <option>Integration</option>
                  <option>Production</option>
                </select>
              </div>
              <div className="inputfield">
                <input
                  id="inputfield"
                  type="text"
                  placeholder="Provide Webex user id"
                  onChange={(e) => {
                    {
                      e.target?.value
                        ? setUser({ ...User, userdetail: e.target.value })
                        : setUser({ ...User, userdetail: "" });
                    }
                    //setUser({ ...User, userdetail: e.target.value });
                  }}
                />
              </div>
              {error && User.userdetail.length <= 0 ? (
                <span className="text-red-500 ml-[151px]">
                  This field should not be empty
                </span>
              ) : (
                ""
              )}
              <button className="button" onClick={handleSubmit}>
                Run
              </button>
            </form>
          </div>
          <div className="userInfo">{info && <Userinfo />}</div>
        </div>
      </div>
    </>
  );
};
