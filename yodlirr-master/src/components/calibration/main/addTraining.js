import React, {    
    Component
} from 'react';
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
import Dialog from "../../common/dialog/dialog"
import FormControlFeedback from 'react-bootstrap/lib/FormControlFeedback';
import FormControlStatic from 'react-bootstrap/lib/FormControlStatic';

import DatePicker from 'react-date-picker';
import postData from '../../common/common';
import { compose } from 'redux';

const nameRx = new RegExp('^[A-Za-z 0-9/:/-/,/(/)]+$');

const warnings = {
    name: "Name does not contain other than characters",
    date:"date should be equal or greater than today"
}

var myValidator = {
    isValidName: false,  
    isValidDate:false, 
}

Date.prototype.formatMMDDYYYY = function () {
    return (this.getMonth() + 1) +
      "/" + this.getDate() +
      "/" + this.getFullYear();
  }


export default class AddTraining extends Component {

    constructor(props){
        super(props)
        this.state={
            isValidName:true,
            name:"",
            due_date: new Date().formatMMDDYYYY(),
            isValidDate:true,
        }
    }

    onTrainingNameBlured=(e)=>{
        let name=e.target.value
        if(nameRx.test(name)){ 
            this.setState({isValidName:true,name})     
            myValidator.isValidName=true                  
        }else{
            this.setState({isValidName:false,name})     
            myValidator.isValidName=false     
        }        
    }
    
    onDateChanged = function (date) {
        debugger;
        let today = new Date();
        if (date >= today) {
          myValidator.isValidDate = true;
          this.setState({
            due_date: date.formatMMDDYYYY(),
            isValidDate: true
          })
        }
        else {
          myValidator.isValidDate = false;
          this.setState({
            isValidDate: false
          });
        }
      }.bind(this);

    validator=()=>{
        debugger
        for(var mv in myValidator){
            if(!myValidator[mv]) return false
        }
        return true
    }

    
    onNextTraining=function(){   
        if(this.validator()){
            this.props.updateTraining({
                name:this.state.name,
                due_date: new Date().formatMMDDYYYY(),
            })
            this.props.onNextTraining()
        }else{
            alert("Please choose name and date correctly")    
        }             
       
    }.bind(this)

    componentDidMount(){
        this.refs.dp.wrapper.setAttribute("style", "z-index:1000")        
    }

    render(){
        return(
            <div className="conatainer">                              
            <div className="row">
                <div className="col-lg-12">
                    <Panel header={<span>{this.props.title}</span>} >
                        <div className="row">
                            <div className="col-lg-6">
                                <Form >
                                    <FormGroup controlId="tName" className={this.state.isValidName ? "" : "has-error"}>
                                        <ControlLabel>Name</ControlLabel>
                                        <FormControl type="text" placeholder="Enter Training Name" onBlur={this.onTrainingNameBlured} />
                                        <FormControlFeedback />
                                        <HelpBlock style={{ display: this.state.isValidName ? "none" : "block" }}>{warnings.name}</HelpBlock>
                                    </FormGroup>    
                                    <FormGroup controlId="date"
                                            className={this.state.isValidDate ? "" : "has-error"}
                                        >
                                            <ControlLabel>Due Date</ControlLabel>
                                            <DatePicker
                                            onClick={this.datePickerClicked}
                                            onChange={this.onDateChanged}
                                            value={this.state.due_date}
                                            ref="dp"
                                            />
                                            <FormControlFeedback />
                                            <HelpBlock style={{ display: this.state.isValidDate ? "none" : "block" }}>{warnings.date}</HelpBlock>
                                        </FormGroup>                                                                                                        
                                </Form>
                            </div>                                
                        </div>
                    </Panel>
                </div>
            </div>
            <Button  style={{display: "block",margin: "0 auto" }} onClick={this.onNextTraining} bsStyle="primary">Next</Button>
        </div>
)
    }
}