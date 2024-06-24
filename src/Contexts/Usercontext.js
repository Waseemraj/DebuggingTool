import { createContext, useState, useContext } from "react";
import axios from "axios";

const Usercontext = createContext()

export const useUserDetails = () => {
  const contextValue = useContext(Usercontext);
  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be called from within an OrderDetailsProvider"
    );
  }
  return contextValue;
}
export const Usermapping = (props) => {
  const [mapping_or_subscription, setmapping_or_subscription] = useState("")
  const [MsUserid, setMsUserid] = useState()
  const [userFound, setUserFound] = useState(false);
  const [userCreationDate, setUserCreationDate] = useState('')
  const [userSubscribed, setUserSubscribed] = useState(false);
  const [lastLogin, setLastLogin] = useState('');
  const [userloggedin, setuserloggedin] = useState(false)//we will set userloggedin on false as default
  const myName = "Presence Diagnostic Tool";
  const myPassword = "FVXM.sefn.13.AFVZ.gkmo.05.QDFN.bzmo.1345";
  const [machineBearerToken, setMachineBearerToken] = useState("");
  const [User, setUser] = useState({
    environment: "Integration",
    jiraAccess: "Yes",
    jiradetail: '',
    userdetail: '',
    token: '',
    mail: '',
    orgId: ''
  })
  const BASE_URL = 'https://identitybts.webex.com'
  const USER_DETAIL_API = `${BASE_URL}/identity/scim/${User.orgId}/v2/Users/${User.userdetail}`
  let msuserid;
  const checkID = async (items, User) => {
    if (items.wxUserMapping[User.userdetail] !== undefined) {
      setUserFound(true)

      msuserid = items.wxUserMapping[User.userdetail].msUserId
      setMsUserid(msuserid)
      setUserCreationDate(items.msUserMapping[msuserid].msRefreshTokenCreationDay);

    }
    else if (items.msUserMapping[User.userdetail] !== undefined) {
      setUserFound(true)
      msuserid = items.msUserMapping[User.userdetail]
      setUserCreationDate(items.msUserMapping[User.userdetail].msRefreshTokenCreationDay);
    }
    else {
      setUserFound(false)
    }
  }
  const checkSub = async (items, ids, User) => {



    if (items.wxUserMapping[User.userdetail] !== undefined) {
      msuserid = items.wxUserMapping[User.userdetail].msUserId
    }
    else
      msuserid = User.userdetail
    let i;
    for (i = 0; i < ids.length; i++) {
      if (ids[i].msUserId === msuserid) {
        setUserSubscribed(true);
        break;
      }
    }
    if (i === ids.length)
      setUserSubscribed(false)


  }

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
      setMachineBearerToken(data.BearerToken);
    } catch (error) {
      console.error('Error:', error)
    }
  };
  // this function will get the actual bearer token or access token which we will use inplace of the bearer token
  const getaccessToken = async (machineBearerToken) => {
    try {
      const username =
        "Cb573ac3100d8d2848c473d6792dcd615738aac32cfaa38c0f812cde1a5c3dd60";
      const password =
        "51284f705f2ae64dff66f4a4e279665b11c4b7d423d54f0ea9c17ef9fc147122";
      const formdata = {
        grant_type: "urn:ietf:params:oauth:grant-type:saml2-bearer",
        scope:
          "spark:xsi spark:organizations_read spark:calls_read spark:calls_write broadworks-connector:user Identity:SCIM Identity:Config spark:all",
        assertion: `${machineBearerToken}`,
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
      setUser((prevUser) => ({ ...prevUser, token: data.access_token }));
    } catch (error) {
      console.error('Error:', error)
    }
  };


  const value = { User, checkID, setmapping_or_subscription, lastLogin, mapping_or_subscription, machineBearerToken, userFound, getaccessToken, setUser, getBearerToken, userCreationDate, checkSub, userSubscribed, userloggedin, setuserloggedin, MsUserid };
  return <Usercontext.Provider value={value} {...props} />;
}