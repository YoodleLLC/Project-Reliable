
'use strict';

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

import Autosuggest, { ListAdapter } from 'react-bootstrap-autosuggest';

 export default class NoteListAdapter extends Component {
   constructor(props){
       super(props);
   }
  
 
 render() {
    return (<Autosuggest
                    datalist={this.props.datalist}
                    placeholder="Search Users"
            />)
          }         
}