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

import ResultSet from "./ResultSet"
import staticData from '../../common/staticData';
import postData from '../../common/common';
import ModuleTable from "./moduleTable";



const title = 'Add Template';
const passRexEx = new RegExp("(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\@\!\~\?]).{7,}");
const nameRx = new RegExp('^[A-Za-z 0-9/:/-/,/(/)]+$');
const weightageRx = new RegExp("^([0-9]{1,2}||100)$");
const emailRx = new RegExp('^[A-Za-z]+$');
const nominalRx = new RegExp('^[A-Za-z, ]+$');
const rangeRx = new RegExp('^[0-9]{1,8}$');
const URL = {
    ADDTEMPLATE: "http://localhost:5000/templates/addtemplate",
}
const warnings = {
    name: "Name does not contain other than characters",
    weightage: "Select in between 1 - 10",
    video: "Upload proper Video",
    resultSet: "Add valid name",
    
}

var myValidator = {
    isValidName: false,
    isValidWeightage:false,
    isValidVideo: false,
    isValidScore:false,
}


export default class ModuleSettings extends Component {

    constructor(props) {
        super(props)
        this.state = {
           moduleAns:[],
           isValidName: true,
           isValidWeightage:true,
           isValidVideo: true,
           isResultSet: true,           
           isValidScore:true,
           name:this.props.cModule.name!=undefined?this.props.cModule.name:"",
           weightage:this.props.cModule.weightage!=undefined?this.props.cModule.weightage:"",
           video:this.props.cModule.video!=undefined?this.props.cModule.video:"",
           description:this.props.cModule.description!=undefined?this.props.cModule.description:"",
           results:this.props.cModule.result!=undefined?this.props.cModule.result:[],
           minScore:this.props.cModule.minScore!=undefined?this.props.cModule.minScore:0          
        }
    }   

    onNameChanged=(e)=>{
        let name=e.target.value
        this.setState({name})
    }

    onDescriptionChanged=(e)=>{
        let description=e.target.value
        this.setState({description})
    }

    onVideoChanged=(e)=>{
        let video=e.target.value
        this.setState({video})
    }

    onDescriptionBlured=function(e){
        let description=e.target.value
        this.setState({description})
    }.bind(this)

    onNameBlured=function(e){
        debugger
        let name=e.target.value
        if(nameRx.test(name)){
            myValidator.isValidName=true
            this.setState({isValidName:true, name})    
        }else{
            myValidator.isValidName=false
            this.setState({isValidName:false})    
        }
    }.bind(this)

    onWeightageChanged=function(e){
        debugger
        let weightage=e.target.value    
        if(weightageRx.test(weightage)){
            weightage=parseInt(weightage) 
            if(weightage>0){
                myValidator.isValidWeightage=true
                this.setState({isValidWeightage:true, weightage})    
            }else{
                myValidator.isValidWeightage=false
                this.setState({isValidWeightage:false})    
            }          
        }else{
            myValidator.isValidWeightage=false
            this.setState({isValidWeightage:false})    
        }        
    }.bind(this)

    onVideoBlured=function(e){
        debugger        
        let video=e.target.value
        if(video.trim()!=""){
            myValidator.isValidVideo=true
            this.setState({video,isValidVideo:true})
        }            
        else{
            myValidator.isValidVideo=false
            this.setState({video,isValidVideo:false})
        }
    }.bind(this)

    onModuleSettingBack=function(){
        this.setState({
            name:"",
            weightage:"",
            video:"",
            results:[],  
            description:"",
            minScore:0,
        })
        this.props.onModuleSettingBack()
    }.bind(this)

    onMinScoreChanged=function(e){
        debugger
        let minScore=e.target.value    
        if(weightageRx.test(minScore)){
            minScore=parseInt(minScore) 
            if(minScore>0){
                myValidator.isValidScore=true
                this.setState({isValidScore:true, minScore})    
            }else{
                myValidator.isValidScore=false
                this.setState({isValidScore:false})    
            }          
        }else{
            myValidator.isValidScore=false
            this.setState({isValidScore:false})    
        }        
    }.bind(this)

     getVideoID=function(url) {
       
    }
    
    validator=()=>{
        for(var mv in myValidator){
            if(!myValidator[mv]){
                return false
            }
        }
        return true
    }

    onNextModule=function(){
        debugger                
        if(this.validator()){
        let result=this.refs.resultSet.state.results
        let video=this.state.video       
        if(result.length==this.refs.resultSet.state.totalResults){
            let module={
                name:this.state.name,         
                weightage:this.state.weightage,
                video:this.state.video,
                minScore:this.state.minScore,   
                description:this.state.description,             
                result
            }
            debugger;
            this.props.setCurrentModule({module})
            this.props.onNextModule()
        }else{
            alert("Result contains only characters")
        }
    }else{
            alert("Choose all fields correctly")
    }
}.bind(this)

    render() {
        return (
            <div className="conatainer">

                <div className="row">
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Panel header={<span>Add Module</span>} >
                            <div className="row">
                                <div className="col-lg-6">
                                    <Form>
                                        <FormGroup  className={this.state.isValidName? "" : "has-error"}>
                                            <ControlLabel>Name</ControlLabel>
                                            <FormControl type="text" placeholder="Enter Module Name" onBlur={this.onNameBlured} value={this.state.name} onChange={this.onNameChanged} />
                                            <FormControlFeedback />
                                            <HelpBlock style={{ display: this.state.isValidName ? "none" : "block" }}>{warnings.name}</HelpBlock>
                                        </FormGroup>  
                                        <FormGroup controlId="descr" >
                                            <ControlLabel>Description</ControlLabel>
                                            <FormControl type="text" placeholder="Enter Module Description" value={this.state.description} onBlur={this.onDescriptionBlured} onChange={this.onDescriptionChanged} />
                                            <FormControlFeedback />
                                            {/* <HelpBlock style={{ display: this.state.isValidName ? "none" : "block" }}>{warnings.name}</HelpBlock> */}
                                        </FormGroup>                                                                        
                                        <FormGroup controlId="weightage"  className={this.state.isValidWeightage ? "" : "has-error"} style={{ paddingBottom: "20px" }} >
                                            <ControlLabel>Weightage of Module</ControlLabel>
                                            <select className="col-md-3 form-control" value={this.state.weightage}  onChange={this.onWeightageChanged}>
                                                {
                                                    [...Array(101).keys()].map(k => {
                                                        return <option key={k} value={k}>{k}</option>
                                                    })
                                                }
                                            </select>
                                            <div style={{ paddingBottom: "20px" }}>
                                                {"  "}
                                            </div>
                                        </FormGroup>                                                                                                                       
                                        <FormGroup controlId="weightage"  className={this.state.isValidWeightage ? "" : "has-error"} style={{ paddingBottom: "20px" }} >
                                            <ControlLabel>Minimum Passing score in %</ControlLabel>
                                            <select className="col-md-3 form-control" onChange={this.onMinScoreChanged} value={this.state.minScore}>
                                                {
                                                    [...Array(101).keys()].map(k => {
                                                        return <option key={k} value={k}>{k}</option>
                                                    })
                                                }
                                            </select>
                                            <div style={{ paddingBottom: "20px" }}>
                                                {"  "}
                                            </div>
                                        </FormGroup>  
                                        <FormGroup  className={this.state.isValidVideo ? "" : "has-error"}>
                                            <ControlLabel>Upload Video</ControlLabel>
                                            <FormControl type="text" placeholder="Enter Training Name" onBlur={this.onVideoBlured} value={this.state.video} onChange={this.onVideoChanged}/>
                                            <FormControlFeedback />
                                            <HelpBlock style={{ display: this.state.isValidField ? "none" : "block" }}>{warnings.field}</HelpBlock>
                                        </FormGroup>                                           
                                        <ResultSet ref="resultSet" results={this.state.results}/>                           
                                    </Form>
                                </div>
                                <div className="col-lg-6">
                                    <ModuleTable  {...this.props}/>
                                </div>
                            </div>

                        </Panel>
                    </div>
                </div>
                <Button bsStyle="warning" onClick={this.onModuleSettingBack}>Back</Button>
                <Button style={{display: "block",margin: "0 auto" }}  bsStyle="primary" onClick={this.onNextModule}>Next</Button>
            </div>)
    }
}
