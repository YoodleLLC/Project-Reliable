import React, { PropTypes, Component } from 'react';
import {
  Panel,
  Button,
  Col,
  PageHeader,
  ControlLabel,
  FormControl,
  HelpBlock,
  FormGroup,
  Checkbox,
  Form,
  Radio,
  InputGroup,
  Glyphicon } from 'react-bootstrap';
import FormControlFeedback from 'react-bootstrap/lib/FormControlFeedback';
import FormControlStatic from 'react-bootstrap/lib/FormControlStatic';
import InputGroupAddon from 'react-bootstrap/lib/InputGroupAddon';
import URL from "../common/staticData";


export default class TaskGenerator extends Component{

    constructor(props){
        super(props);

        this.state={
           
        };

        this.onTaskGenerateed=function(){

        }.bind(this);
      
}


    render(){
        return (
            <div>
            <div className="row">
              <div className="col-lg-12">
                <PageHeader>Generate Tasks</PageHeader>
              </div>
            </div>
      
            <div className="row">
              <div className="col-lg-12">
                <Panel header={<span>Generate Tasks</span>} >
                  <div className="row">
                    <div className="col-lg-6">
                      <Form>                     
                       
                      
                      <Button onClick={this.onTaskGenerateed}>Generate</Button> 
                    </Form>
                    </div>
                  </div>
                </Panel>
              </div>
             
            </div> 
          </div>
        );
      }
    

}