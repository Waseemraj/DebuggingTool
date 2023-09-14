import { createContext, useState,useContext} from "react";
import axios from "axios";

const Usercontext = createContext()

export const useUserDetails = ()=> {

    const contextValue = useContext(Usercontext);
      if (!contextValue) {
        throw new Error(
          "useOrderDetails must be called from within an OrderDetailsProvider"
        );
      }
    return contextValue;
}

export const Usermapping = (props)=>{

    const [userFound,setUserFound] = useState(false);
    const [userCreationDate,setUserCreationDate] = useState('')
    const [userSubscribed,setUserSubscribed] = useState(false);
    const [name,setName] = useState('')
    const [userActive, setUserActive] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [lastLogin, setLastLogin] = useState('');
    const [User, setUser] = useState({
        environment: "Integration",
        jiraAccess: "Yes",
        jiradetail: '',
        userdetail: '',
        token: '',
    })
    
    let msuserid;

    const checkID  = async (items,User) =>  {
              
              console.log(items)
              console.log('Email validation ', /\S+@\S+\.\S+/.test(User.userdetail))

              if(true){
                const api = `https://identitybts.webex.com/identity/scim/8845b4ec-5fde-49df-8837-53932da40be2/v1/Users/${User.userdetail}`
                await axios.get(api, { headers: {"Authorization" : `Bearer ${User.token}`} })
                .then(res => {
                  setName(res.data.name.givenName)
                  setUserActive(res.data.active)
                  setLastLogin(res.data.meta.lastLoginTime)
                  setPhoneNumber(res.data.phoneNumbers[0].value)
                  User.userdetail = res.data.id
                  console.log(res)
                  setUser({ ...User, userdetail: res.data.id })
                  console.log(User.userdetail)
                })
                .catch((error=>{
                  console.log(error)
                }))
              }

              if(items.wxUserMapping[User.userdetail] !== undefined){
                setUserFound(true)
                msuserid = items.wxUserMapping[User.userdetail].msUserId
                setUserCreationDate(items.msUserMapping[msuserid].msRefreshTokenCreationDay);
                // console.log(msuserid,userCreationDate);
              }

              else if(items.msUserMapping[User.userdetail]!== undefined){
                setUserFound(true)
                msuserid = items.msUserMapping[User.userdetail]
                setUserCreationDate(items.msUserMapping[User.userdetail].msRefreshTokenCreationDay);
                // console.log(msuserid,userCreationDate);
              }

              else{
                setUserFound(false)
              }
    }
    
    const checkSub = async (items,ids,User) => {
      if(true){ // regex code to validate correct format of userID
        const api = `https://identitybts.webex.com/identity/scim/8845b4ec-5fde-49df-8837-53932da40be2/v1/Users/${User.userdetail}`
        await axios.get(api, { headers: {"Authorization" : `Bearer ${User.token}`} })
        .then(res => {
          console.log(res)
          User.userdetail = res.data.id
          setUser({ ...User, userdetail: res.data.id })
          console.log(User.userdetail)
        })
        .catch((error)=>{
          console.log(error)
        })
      }

      console.log(items)
      if(items.wxUserMapping[User.userdetail] !== undefined){
        msuserid = items.wxUserMapping[User.userdetail].msUserId
      }
      else
        msuserid = User.userdetail
      let i;
        for(i=0 ; i<ids.length;i++){
          if(ids[i].msUserId === msuserid){
            setUserSubscribed(true);
            break;
          }
        }
        if(i === ids.length)
        setUserSubscribed(false)
    }

    const value = { User, checkID, userActive, phoneNumber, lastLogin, userFound, setUser, userCreationDate, checkSub, userSubscribed, name };
    return <Usercontext.Provider value={value} {...props} />;
}