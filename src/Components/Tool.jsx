import React from 'react'
import Theoryoftool from './Theoryoftool'
import { Forms } from './Forms'
import { useParams } from 'react-router-dom';
import { useUserDetails } from "../Contexts/Usercontext";
import { useEffect } from 'react';

export default function Tool() {
  const {setmapping_or_subscription}=useUserDetails()
  const params=useParams()
   useEffect(() => {
    setmapping_or_subscription(params.maporsub);
   
    
   }, [params.maporsub])
   
   
  
  return (
    <>
    <div className="tool " style={{
        display:'flex',
        
    }}>
    <Theoryoftool/>
    <Forms/>
    </div>
    </>
  )
}
