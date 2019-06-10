import React, {  Component } from 'react';
import {
  Panel,
  Button,
  
  PageHeader,
  ControlLabel,
  FormControl,
  HelpBlock,
  FormGroup,
  
  Form,
  
  
  } from 'react-bootstrap';
import FormControlFeedback from 'react-bootstrap/lib/FormControlFeedback';
import FormControlStatic from 'react-bootstrap/lib/FormControlStatic';

import sData from '../../components/common/staticData';
import postData from '../../components/common/common';
import VideoPlayer from './video';
import QA from './QA'
import TopHeader from "../../components/common/pageheader/topheader"
import ModuleView from "./moduleView";
import SideBarModule from "./sidebarModule"


export default class Calibrate extends Component{

    constructor(props){
        super(props)
        this.state={
            name:""
        }
    }
    render(){
        return(
            <div className="container-fluid">                
                <TopHeader title={this.state.name}/>       
                <SideBarModule {...this.props}/>                                     
            </div>) 
    
}
}

