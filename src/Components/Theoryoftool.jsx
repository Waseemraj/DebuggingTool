import React from 'react'
import './Theoryoftool.scss'
import commonText from './Commontext'
export default function Theoryoftool() {
  return (
    <>
    <div className="theory w-1/2 h-[71.5vh]">
         <div className="details">
<div className="head">Mapping and Subscription status</div>
<div className="overview">
  {commonText.Theoryoftool.overview}
</div>
<div className="basic_info">
  <div className="mapping-subscription-info">
    <div className="mapping-subscription-text">Mapping</div>
    <div className="mapping-subscription-details">{commonText.Theoryoftool.mappingtheory}</div>
  </div>
   <div className="mapping-subscription-info">
    <div className="mapping-subscription-text">Subscription</div>
    <div className="mapping-subscription-details">{commonText.Theoryoftool.subscriptiontheory}</div>
  </div>
</div>

         </div>
    </div>
    </>
  )
}
