import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./Forms.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useUserDetails } from "../Contexts/Usercontext";
import { Userinfo } from "./Userinfo";
import { aore, afra, achm } from "../data";

export const Forms = () => {
  
  var base64 = require("base-64");
  const { User, setUser, checkID, checkSub } = useUserDetails();
  const [error, setError] = useState(false);
  const [info, setinfo] = useState(false);
  const [machinebearertoken, setmachinebearertoken] = useState("");
  const [snackopen, setSnackOpen] = useState(false);
  const handleClose = () => {
    setSnackOpen(false);
  };
  const INT_BASE_URL = `https://msft-presence-service.int-first-general1.ciscospark.com/`;
  const myName = "Presence Diagnostic Tool";
  const myPassword = "FVXM.sefn.13.AFVZ.gkmo.05.QDFN.bzmo.1345";

  // this function we will used to get the bearer token
  const getBearerToken = async () => {
    try {
      const response = await fetch(
        "https://idbrokerbts.webex.com/idb/token/a93dde14-65b7-4a59-81dd-28962a8473e3/v2/actions/GetBearerToken/invoke",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: myName,
            password: myPassword,
            adminUser: false,
          }),
        }
      );

      const data = await response.json();
      setmachinebearertoken(data.BearerToken);
      // console.log("machine token",data.BearerToken );
      return data.BearerToken;
    } catch (error) {
      console.log("error is there", error);
    }
  };
  // this function will get the actual bearer token or access token which we will use inplace of the bearer token
  const getaccessToken = async (machinebearertoken) => {
    try {
      const username =
        "Cb573ac3100d8d2848c473d6792dcd615738aac32cfaa38c0f812cde1a5c3dd60";
      const password =
        "51284f705f2ae64dff66f4a4e279665b11c4b7d423d54f0ea9c17ef9fc147122";
      const formdata = {
        grant_type: "urn:ietf:params:oauth:grant-type:saml2-bearer",
        scope:
          "spark:xsi spark:organizations_read spark:calls_read spark:calls_write broadworks-connector:user Identity:SCIM Identity:Config spark:all",
        assertion: `${machinebearertoken}`,
      };
      const formBody = Object.keys(formdata)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(formdata[key])
        )
        .join("&");
      // Create a base64 encoded string for basic authentication
      const base64Credentials = btoa(`${username}:${password}`);

      const response = await fetch(
        "https://idbrokerbts.webex.com/idb/oauth2/v1/access_token",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            // Include the basic auth credentials in the Authorization header
            Authorization: `Basic ${base64Credentials}`,
          },
          // Stringify your body object
          body: formBody,
        }
      );

      const data = await response.json();
      // console.log("machine beare token is", data.access_token);
      setUser((prevUser) => ({ ...prevUser, token: data.access_token }));
    } catch (error) {
      console.error(error, "error is there");
      console.log("we have encounter error");
    }
  };
 
  
  
  useEffect(() => {
    getBearerToken();
    
  }, []); 
    useEffect(() => {
   
    if (machinebearertoken) {
      getaccessToken(machinebearertoken);
    }
  }, [machinebearertoken]); 

  let allmaps = {};
  async function handleSubmit(e) {
    e.preventDefault();
    
    
    if (User.environment === "Production") {
      console.log("Production Environment");
      // fetchUserData(PROD_PEOPLE, mail);
      let userExists = false;
      if (aore.wxUserMapping && aore.wxUserMapping[User.userdetail]) {
        console.log(aore.wxUserMapping[User.userdetail]);
        const { wxUserId, msUserId, wxOrgId } =
          aore.wxUserMapping[User.userdetail];
        return (
          <Userinfo wxUserId={wxUserId} msUserId={msUserId} wxOrgId={wxOrgId} />
        );
      }
      if (achm.wxUserMapping && achm.wxUserMapping[User.userdetail]) {
        console.log(achm.wxUserMapping[User.userdetail]);
        const { wxUserId, msUserId, wxOrgId } =
          achm.wxUserMapping[User.userdetail];
        return (
          <Userinfo wxUserId={wxUserId} msUserId={msUserId} wxOrgId={wxOrgId} />
        );
      }
      if (afra.wxUserMapping && afra.wxUserMapping[User.userdetail]) {
        console.log(afra.wxUserMapping[User.userdetail]);
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
         if(User.userdetail.length!==0){
          setinfo(true);
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
     <div className="content_type">Content-Type <span>application/json</span></div>
     <div className="auth">
     <div className="auth-text">Authorization</div>
     <div className="token">
      <span className="bearer_text">Bearer</span><input type="password"  className="bearer_input" readOnly="readOnly" value={User.token} />
     </div>
     </div> 
     
    </div>
    <div className="second_section">
    <form className="forms" onSubmit={handleSubmit}>
      <div className="request">Request</div>
            <div className="enviroment">
             <span className="enviromentvalue"> Environment</span>
              <select id="Environment" onChange={(e) => {
                  e.preventDefault();
                  setUser({ ...User, environment: e.target.value });
                }} >
                <option >Integration</option>
                <option >Production</option>

              </select>
            </div>
            <div className="inputfield">
              <input id="inputfield"  type="text" placeholder="Provide Webex user id"  onChange={(e) => {
                  {e.target?.value?setUser({ ...User, userdetail: e.target.value }):setUser({ ...User, userdetail:"" });}
                  //setUser({ ...User, userdetail: e.target.value });
                }}/>
            </div>
            {error && User.userdetail.length <= 0 ? (
              <span style={{ color: "red", marginLeft: "151px" }}>
                {" "}
                This field should not be empty{" "}
              </span>
            ) : (
              ""
            )}
            <button className="button" onClick={handleSubmit}   >
              Run
            </button>
          </form>
    </div>
    <div className="userInfo">{info&&<Userinfo />}</div>
   </div>

    
      
    </div>
  </>
  );
};
