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



class TemplatePriview extends Component{
    constructor(props){
        super(props);     
   }

render(){
    debugger
  
   
 return(
  <div>       
    <div >
       <Panel header={this.props.template.name} style={{border: 1}}>                                   
        <div>                                 
            <div>
                <h3>Total Weight: {this.props.weight} </h3>
                {
                    this.props.template.sections.map((section,index )=>{
                        return(<div key={index}>
                            <h4>Section: {section.sectionName}</h4> 
                            <h4>Weightage: {section.weight}</h4> 
                            {                               
                            section.fields.map((fld,index)=>{
                                return( <div key={index}>                                   
                                    <h4>Field</h4>
                                    <h5>{fld.field}</h5>
                                    <div className="row">
                                        <div className="col-lg-6">Evaluation Type: {fld.evaluationCriteria}</div>
                                        <div className="col-lg-6">Value: {fld.possibleAnswers}</div>
                                    </div>                
                                    </div>);                                
                            })
                        }    
                        </div>)
                    }) 
                }
                </div>
            </div>
        </Panel>
        </div>
    </div>    
            )
    }
            
}

export default TemplatePriview;