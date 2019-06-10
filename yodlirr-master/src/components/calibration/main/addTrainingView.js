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

import AddModule from "./addModule"
import ModuleSetings from "./moduleSettings"
import "./main.css"
import AddTrainingName from "./addTraining";
import sData from "../../common/staticData";
import postData from "../../common/common";

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
    name: "Name does not contain other than characters",
    sectionName: "Name does not contain other than characters",
    address: "Enter address",
    scale: "For nominal add , seperated values. For ordinal Add only digits"
}

var myValidator = {
    isValidName: false,
    isValidSectionName: false,
    isValidField: false,
    isValidScale: false
}

export default class AddTrainingView extends Component {

    constructor(props){
        super(props)
        this.state={
            training:{
                modules:[]
            },
            modulesInfo:[],
            cModule:{},
            isAddTriningVisible:true,
            isModuleSettingsVisible:false,
            isAddModuleVisible:false
        }
    }

    setCurrentModule=function(cModule){      
        try{
            cModule=cModule.module
            cModule.id= this.state.training.modules[this.state.training.modules.length-1]!=undefined?this.state.training.modules[this.state.training.modules.length-1]+1:1
            this.setState({cModule})
        }catch(err){
            alert(err)
        }
       
    }.bind(this)

    updateTraining=function(tObj){
        try{
        let training={}
        Object.assign(training,this.state.training,tObj)        
        this.setState({training})
        }catch(err){
            
        }
    }.bind(this)
    

    addModule=function(fields){
        debugger
        let training=this.state.training
        let cModule =this.state.cModule
        let mod=Object.assign(cModule,{fields})
        training.modules.push(mod)
        let modulesInfo=this.state.modulesInfo
        modulesInfo.push({
            weightage:cModule.weightage,
            number_fields:cModule.fields.length,
            name:cModule.name,
            id:cModule.id
        })

        this.setState({training,
            isAddTriningVisible:false,
            isModuleSettingsVisible:true,
            isAddModuleVisible:false,
            modulesInfo,
            cModule:{}
        })
    }.bind(this)

    onNextTraining=function(){
        this.setState({
            isAddTriningVisible:false,
            isModuleSettingsVisible:true,
            isAddModuleVisible:false
        })
    }.bind(this)

    onNextModule=function(){
        this.setState({
            isAddTriningVisible:false,
            isModuleSettingsVisible:false,
            isAddModuleVisible:true
        })
    }.bind(this)
    

    onModuleSettingBack=function(){
        this.setState({
            isAddTriningVisible:true,
            isModuleSettingsVisible:false,
            isAddModuleVisible:false
        })
    }.bind(this)

    onAddModuleBack=function(){
        this.setState({
            isAddTriningVisible:false,
            isModuleSettingsVisible:true,
            isAddModuleVisible:false
        })
    }.bind(this)

    onCurrentModuleDeleted=(moduleId)=>{        
        debugger
        let cModuleIndex= this.state.training.modules.findIndex(m=>{
            return m.id===moduleId
        })                    
        this.state.training.modules.splice(cModuleIndex,1)
        this.state.modulesInfo.splice(cModuleIndex,1)
        this.setState({
            training:this.state.training,
            modulesInfo:this.state.modulesInfo
        })
        
    }

    onSubmitTraining=function(){
        debugger
        let training=this.state.training
        if(this.state.training.modules.length>0 ){
            let weightage=0
            training.modules.forEach(m => {
                weightage=weightage+m.weightage
            });
            if(weightage==100){
                let training=this.state.training
                let body=JSON.stringify({training})
                postData(sData.URL.training.add,body).then(d=>d.json()).then(
                    res=>{
                       alert("Training submitted successuffly.")
                       this.setState({
                        isAddTriningVisible:true,
                        isModuleSettingsVisible:false,
                        isAddModuleVisible:false
                    })
                    }
                )
            }else{
                alert("Weightage of modules should be 100")    
            }         
        }
        else{
            alert("Add atleast one module")
        }
    }.bind(this)

    render(){
        debugger
        const AddTrainingNameWrapper=(props)=>{
            debugger
            if(this.state.isAddTriningVisible){
                return ( 
                    <div>
                        <AddTrainingName {...props} title="Training Name" />                                               
                    </div>
                )
            }    
            else return null
        }
        
        const ModuleSetingsWrapper=(props)=>{
            if(this.state.isModuleSettingsVisible){
                return ( 
                        <ModuleSetings {...props} />                                           
                )
            }    
            else return null
        }
        
        const AddModuleWrapper=(props)=>{
            if(this.state.isAddModuleVisible){
                return (                  
                        <AddModule {...props} />                                         
                )
            }    
            else return null
        }

        return(                  
        <div>
            <AddTrainingNameWrapper onNextTraining={this.onNextTraining} updateTraining={this.updateTraining} />
            <ModuleSetingsWrapper onCurrentModuleDeleted={this.onCurrentModuleDeleted} modulesInfo={this.state.modulesInfo} cModule={this.state.cModule} onModuleSettingBack={this.onModuleSettingBack} onNextModule={this.onNextModule} setCurrentModule={this.setCurrentModule}  />
            <AddModuleWrapper onAddModuleBack={this.onAddModuleBack} results={this.state.cModule.result} onSaveTraining={this.onSaveTraining} addModule={this.addModule} />           
            <Button onClick={this.onSubmitTraining}  bsStyle="primary">Submit Training</Button>
        </div>)
    }
}

