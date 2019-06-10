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


import staticData from '../../common/staticData';
import postData from '../../common/common';
import moduleSettings from "../main/moduleSettings"

Date.prototype.formatMMDDYYYY = function () {
    return (this.getMonth() + 1) +
        "/" + this.getDate() +
        "/" + this.getFullYear();
}


const title = 'Add Template';
const passRexEx = new RegExp("(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\@\!\~\?]).{7,}");
const nameRx = new RegExp('^[A-Za-z 0-9/:/-/,/(/)]+$');
const phRx = new RegExp("^([0-9]{3})-([0-9]{3})-([0-9]{4})$");
const emailRx = new RegExp('^[A-Za-z]+$');
const nominalRx = new RegExp('^[A-Za-z, ]+$');
const rangeRx = new RegExp('^[0-9]{1,8}$');
const URL = {
    ADDTEMPLATE: "http://localhost:5000/templates/addtemplate",
}
const warnings = {
    ph_no: "Write Phone number in xxx-xxx-xxxx format",
    Field: "Field does not contain other than characters",
    sectionName: "Name does not contain other than characters",
    address: "Enter address",
    scale: "For nominal add , seperated values. For ordinal Add only digits"
}

var myValidator = {
    isDescription: false,
    isValidField: false,
}

export default class AddModule extends Component {

    constructor(props) {
        super(props)
        this.state = {           
            isDescription: true,
            isValidField: true,            
            field:"",
            expectedAns:"",
            description:""  ,
            fields: []     
        }
    }


    onFieldBlured=function(e){
        let field=e.target.value
    
        if(field.trim()!=""){
            this.setState({
                field,
                isValidField:true,
            })
            myValidator.field=true
        }else{
            this.setState({                
                isValidField:false,
            })
            myValidator.field=false
        }

    }.bind(this)

    onDescriptionBlured=function(e){
        let description=e.target.value        
    
        if(description.trim()!=""){
            this.setState({
                description,
                isValiddescription:true,
            })
            myValidator.description=true
        }else{
            this.setState({                
                isValiddescription:false,
            })
            myValidator.description=false
        }
    }.bind(this)

    onExpectedAnsChanged=function(e){
        let expectedAns=e.target.value
        this.setState({
            expectedAns
        })

    }.bind(this)   

    onAddFieldClicked=function(){
        if(this.state.expectedAns!==""){
            debugger;
            let fields=this.state.fields
                fields.push({ field:this.state.field,
                expectedAns:this.state.expectedAns,
                description:this.state.description ,
            })
            this.setState({fields,
                field:"",
                expectedAns:"",
                description:""  ,
            })
    
            this.refs.txtField.value="",
            this.refs.txtDescription.value="",
            this.refs.ans.selectedIndex=0
        }else{
            alert("Please Select Atleast")
        }      
    }.bind(this)

    onAddModuleClicked=function(){
        debugger;
        this.props.addModule(this.state.fields)
    }.bind(this)

    render() {
        return (
            <div className="conatainer">
                <div className="row">
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Panel header={<span>Add Question</span>} >
                            <div className="row">
                                <div className="col-lg-6">
                                    <Form>                                       
                                        <FormGroup ControlId="field" className={this.state.isValidField ? "" : "has-error"}>
                                            <ControlLabel>Question</ControlLabel>
                                            <textarea type="text" placeholder="Enter Question" ref="txtField" onBlur={this.onFieldBlured} className="form-control" />
                                            <FormControlFeedback />
                                            <HelpBlock style={{ display: this.state.isValidField ? "none" : "block" }}>{warnings.field}</HelpBlock>
                                        </FormGroup>
                                        <FormGroup ControlId="field" className={this.state.isValidField ? "" : "has-error"}>
                                            <ControlLabel>Description</ControlLabel>
                                            <textarea type="text" placeholder="Enter Description" ref="txtDescription" onBlur={this.onDescriptionBlured} className="form-control" />
                                            <FormControlFeedback />
                                            <HelpBlock style={{ display: this.state.isValidField ? "none" : "block" }}>{warnings.field}</HelpBlock>
                                        </FormGroup>
                                        <FormGroup  >
                                            <ControlLabel>Expected Answers</ControlLabel>
                                            <select onChange={this.onExpectedAnsChanged} className="col-md-3 form-control" ref="ans">
                                                    <option key={0} value="">select</option>
                                                {
                                                    this.props.results.map((k,index) => {
                                                        return <option key={index+1} value={index+1}>{k}</option>
                                                    })
                                                }
                                            </select>
                                            <div style={{ paddingBottom: "40px" }}>
                                                {"  "}
                                            </div>
                                        </FormGroup>
                                        <FormGroup ControlId="btnAddField">
                                            <Button bsStyle="primary" onClick={this.onAddFieldClicked}>Save Field</Button>
                                        </FormGroup>
                                        <FormGroup ControlId="btnAddSection">
                                            <Button bsStyle="primary" onClick={this.onAddModuleClicked}>Save Module</Button>
                                        </FormGroup>
                                    </Form>
                                </div>
                            </div>
                        </Panel>

                    </div>
                </div>                            
                <Button style={{marginBottom:"20px"}} bsStyle="warning" onClick={this.props.onAddModuleBack}>Back</Button>               
            </div>)
    }
}

