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
import TopHeader from "../common/pageheader/topheader"
import AddTrainingView from "./main/addTrainingView"
import ModuleInfo from "./moduleInfoPanel"


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



export default class Calibrate extends Component {

    render(){
        return(
        <div>
           <TopHeader title={"Training"}/>
          
           <AddTrainingView/>
           
           <ModuleInfo/>
        </div>)
    }
}