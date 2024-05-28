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
    console.log(User.userdetail, userSubscribed, "data is ")
    console.log('Email validation ', /\S+@\S+\.\S+/.test(User.userdetail))

    if (items.wxUserMapping[User.userdetail] !== undefined) {
      setUserFound(true)

      msuserid = items.wxUserMapping[User.userdetail].msUserId
      setMsUserid(msuserid)
      setUserCreationDate(items.msUserMapping[msuserid].msRefreshTokenCreationDay);
      // console.log(msuserid,userCreationDate);
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


    console.log(items)
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

    console.log(User.userdetail, userSubscribed)
  }
  const value = { User, checkID, setmapping_or_subscription, lastLogin, mapping_or_subscription, userFound, setUser, userCreationDate, checkSub, userSubscribed, userloggedin, setuserloggedin, MsUserid };
  return <Usercontext.Provider value={value} {...props} />;
}