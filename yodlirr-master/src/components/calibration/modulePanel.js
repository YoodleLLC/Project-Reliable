import React, {
    PropTypes,
    Component
} from 'react';
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
    Glyphicon,
} from 'react-bootstrap';
import Dialog from "../common/dialog/dialog"
import FormControlFeedback from 'react-bootstrap/lib/FormControlFeedback';
import FormControlStatic from 'react-bootstrap/lib/FormControlStatic';
import InputGroupAddon from 'react-bootstrap/lib/InputGroupAddon';
import TemplatePriview from './templatepreview';
import staticData from '../common/staticData';
import postData from '../common/common';

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

export default class ModulePanel extends Component {

    render(){
        return(
        <div>
                
        </div>)
    }
}