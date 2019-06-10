
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

import DatePicker from 'react-date-picker';
import FormControlFeedback from 'react-bootstrap/lib/FormControlFeedback';
import FormControlStatic from 'react-bootstrap/lib/FormControlStatic';


var evaluator={}

class AddEvaluator extends Component {
    constructor(props){
        super(props);

        this.state={
            evaluatorName:"",
            evaluatorEmail:"",
        }

       
        this.onEvaluatorNameChanged=function(e){
            this.setState({
              evaluatorName:e.target.value
            })
        }.bind(this);
          this.onEvaluatorEmailChanged=function(e){
            this.setState({
              evaluatorEmail:e.target.value
            })
        }.bind(this);
        this.onAddEvaluator=function(){
             evaluator={
              _id:this.props.parent.state.lastEvaluatorId+1,
              name:this.state.evaluatorName,
              email:this.state.evaluatorEmail
            }
            var evaluatorsArr=this.props.parent.state.evaluators;
            evaluatorsArr.push(evaluator);
            this.props.parent.setState({
              isMyEvalVisible:false,    
              lastEvaluatorId:this.props.parent.state.lastEvaluatorId+1,
              evaluators:evaluatorsArr
            });
          }.bind(this);

          this.onCancleEvlauator=function(){
            this.props.parent.setState({
              isMyEvalVisible:false
            });
          }.bind(this);
    }

    render(){
    return(<Panel header={<span>Add an Evaluator</span>} >
    <div className="row">
      <div className="col-lg-6">
        <Form>
          <FormGroup controlId="formBasicText">
            <ControlLabel>Evaluator Name</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Evaluator Name"
              onChange={this.onEvaluatorNameChanged}
            />
            <FormControlFeedback />
          </FormGroup>

          <FormGroup controlId="formBasicText2">
            <ControlLabel>Email Address</ControlLabel>
            <FormControl
              type="text"                     
              placeholder="Email Address"
              onChange={this.onEvaluatorEmailChanged}
            />
            
            <FormControlFeedback />
          </FormGroup>
          <FormGroup controlId="formBasicText2">
           <Button bsStyle="primary" onClick={this.onAddEvaluator}>Add</Button>{'    '}
           <Button bsStyle="warning" onClick={this.onCancleEvlauator}>Cancle</Button>
            <FormControlFeedback />
          </FormGroup>
        
        </Form>
      </div>
    </div>
  </Panel>);
  }
}

export default AddEvaluator;
