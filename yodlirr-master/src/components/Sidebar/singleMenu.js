
import React, { Component } from 'react';
import MySvg from "./mySvg"

const  SingleMenu=(props)=>{   
return (<div  style={{color:"white",listStyleType:"none",padding:"10px"}}>                       
        <MySvg title={props.title} type={props.type} to={props.to} single={true} style={{color:"white"}}/>    
    </div>) 
    }

export default SingleMenu