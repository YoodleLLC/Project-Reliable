
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const MySvg=(props)=>{
    if(!props.single){
        return (<div size="25" fill="currentColor" style={{display: "inline-flex","justifyContent": "center",alignItems: "center"}}>
        <svg fill="currentColor" height="25" width="25" viewBox="0 0 24 24" style={{display: "inline-block", verticalAlign: "middle"}}>
            <path d={props.type.children[0].attribs.d}></path>
        </svg>
        <span> {props.title}</span>
     </div>)
    }else{
        return (<div size="25" fill="currentColor" style={{display: "inline-flex","justifyContent": "center",alignItems: "center"}}>
               <svg fill="currentColor" height="25" width="25" viewBox="0 0 24 24" style={{display: "inline-block", verticalAlign: "middle"}}>
                   <path d={props.type.children[0].attribs.d}></path>
               </svg>
               <span> <Link to={props.to} style={{color:"white"}} > {props.title}</Link></span>
            </div>)
    }
    
   }

export default MySvg