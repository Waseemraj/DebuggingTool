import React from 'react'
import './Theoryoftool.scss'
export default function Theoryoftool() {
  return (
    <>
    <div className="theory" style={{width:'50%',height:'71.5vh'}}>
         <div className="details">
<div className="head">Mapping and Subscription status</div>
<div className="overview">
  This tool will provide you the Mapping and Subscription status of the particular user on the basis of user's Webex user Id.
</div>
<div className="basic_info">
  <div className="mapping-subscription-info">
    <div className="mapping-subscription-text">Mapping</div>
    <div className="mapping-subscription-details">Mapping basically here means that CAT1 flow is there i.e user is logged in MSFT pluggin.</div>
  </div>
   <div className="mapping-subscription-info">
    <div className="mapping-subscription-text">Subscription</div>
    <div className="mapping-subscription-details">Subscription basically here means that CAT2 flow is there i.e  user's presence works smoothly.</div>
  </div>
</div>

         </div>
    </div>
    </>
  )
}
