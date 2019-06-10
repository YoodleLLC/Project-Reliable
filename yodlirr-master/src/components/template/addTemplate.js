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
import Dialog from "../common/dialog/dialog"
import FormControlFeedback from 'react-bootstrap/lib/FormControlFeedback';
import FormControlStatic from 'react-bootstrap/lib/FormControlStatic';

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

class displayAddTemplateForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sections: [],
            sectionName: "",
            templateName: "",
            fields: [],
            field: "",
            evaluationCriteria: staticData.evauation_criteria.nominal,
            range: {},
            template: {
                templateName: "",
                sections: []
            },
            filedId: 0,
            isValidName: true,
            isValidSectionName: true,
            isValidField: true,
            isValidScale: true,
            weight: 0,
            isShowingModal: false,
            dialogTitle: "Add Template",
            dialogBody: "Are you sure to want to add a template?"
        }

        this.onTemplateNameBlured = function (e) {
            let name = e.target.value.trim()
            debugger;
            if (nameRx.test(name) && name != "") {
                myValidator.isValidName = true;
                this.setState({
                    name,
                    isValidName: true
                });
            } else {
                myValidator.isValidName = false;
                this.setState({
                    isValidName: false
                });
            }
        }.bind(this);


        this.onScaleRangeBlured = function (e) {

            let scale = e.target.value

            if (rangeRx.test(scale)) {

                let range = this.state.range
                range.scale = scale
                this.setState({
                    range: range
                })
            }
        }.bind(this)
        this.onStartRangeBlured = function (e) {
            debugger

            let scale = e.target.value

            if (rangeRx.test(scale)) {

                let range = this.state.range
                range.start = scale
                this.setState({
                    range: range
                })
            }        

        }.bind(this)

        this.onEndRangeBlured = function (e) {
            debugger

            let scale = e.target.value

            if (rangeRx.test(scale)) {

                let range = this.state.range
                range.end = scale
                this.setState({
                    range: range
                })
            }            

        }.bind(this)

        this.onSectionNameBlured = function (e) {
            let sectionName = e.target.value.trim()
            if (nameRx.test(sectionName) && sectionName != "") {
                myValidator.isValidSectionName = true;
                this.setState({
                    sectionName: e.target.value,
                    isValidSectionName: true
                });
            } else {
                myValidator.isValidSectionName = false;
                this.setState({
                    isValidSectionName: false
                });
            }
        }.bind(this);

        this.onEvaluationCriteriaChanged = function (e) {
            this.setState({
                evaluationCriteria: e.target.value
            });
        }.bind(this);

        this.onNominalBlured = function (e) {
            debugger;
            let range = e.target.value.trim()
            if (nominalRx.test(range) && range != "") {
                myValidator.isValidScale = true;
                this.setState({
                    range,
                    isValidScale: true
                });
            } else {
                myValidator.isValidScale = false;
                this.setState({
                    isValidScale: false
                });
            }
        }.bind(this)


        this.onFieldBlured = function (e) {
            if (true == true) {
                myValidator.isValidField = true;
                this.setState({
                    field: e.target.value,
                    isValidField: true
                });
            } else {
                myValidator.isValidField = false;
                this.setState({
                    isValidField: false
                });
            }
        }.bind(this);

        this.validateFields = function () {
            debugger;
            const {range}=this.state;
            if(range != undefined && rangeRx.test(range.start) && rangeRx.test(range.end) && rangeRx.test(range.scale) ){
                myValidator.isValidScale=true;
                this.setState({
                  range,
                  isValidScale:true
                });
              }else{
                myValidator.isValidScale=false;
                this.setState({
                  isValidScale:false
                });
              }

            for (var k in myValidator) {
                if (!myValidator[k]) {
                    return false
                }
            }
            return true;
        }.bind(this)

        this.onAddFieldClicked = function (e) {

            if (this.validateFields()) {
                var field = {
                    _id: this.state.filedId,
                    field: this.state.field,
                    evaluationCriteria: this.state.evaluationCriteria,
                    answer: ""
                }
                debugger;
                if (this.state.evaluationCriteria == staticData.evauation_criteria.nominal) {
                    field.possibleAnswers = this.state.range
                    field.possibleAnswers = field.possibleAnswers.split(",").filter((p) => {
                        return p != ""
                    })
                    field.possibleAnswers = field.possibleAnswers.join(",")
                }
                else {
                    field.possibleAnswers = this.state.range.start + "-" + this.state.range.end + "-" + this.state.range.scale
                }
                this.state.fields.push(field);

                var fieldArr = this.state.fields;
                this.setState({
                    fields: fieldArr,
                });
                var lastSection;
                var sectionArr = this.state.template.sections;
                if (sectionArr > 0) {
                    lastSection = this.state.sections[sectionArr - 1];
                    lastSection.fields.push(field);
                    this.state.sections[sectionArr - 1] = lastSection;
                    this.setState({
                        template: {
                            templateName: this.state.templateName,
                            sections: sectionArr,
                            range: {}
                        }
                    });
                } else {
                    lastSection = [{
                        sectionName: this.state.sectionName,
                        fields: fieldArr
                    }];
                    this.setState({
                        template: {
                            templateName: this.state.templateName,
                            sections: lastSection,
                            range: {}
                        }
                    });
                }

                this.setState({
                    field: "",
                    filedId: this.state.filedId + 1,
                    range: ""
                });
                debugger;
                this.refs.txtField.value = ""
            } else {
                console.log("please check the errors")
            }
        }.bind(this);



        this.onAddSectionClicked = function () {
            debugger
            let sectionName = this.refs.txtSection.value.trim()
            let weight = parseInt(this.refs.secweight.value)
            if (nameRx.test(sectionName) && sectionName != "" && weight > 0 && weight < 101) {
                let fieldWeight = weight / this.state.fields.length
                this.state.fields.map(f => {
                    f.weight = fieldWeight
                })
                var section = {
                    sectionName: this.state.sectionName,
                    fields: this.state.fields,
                    weight: weight

                };
                var sectionArray = this.state.sections;
                sectionArray.push(section);

                weight = this.state.sections.reduce((acc, s) => acc + s.weight, 0)

                this.setState({
                    weight: weight,
                    sections: sectionArray,
                    field: "",
                    range: "",
                    fields: [],
                    sectionName: ""
                });

                this.refs.txtSection.value = ""
                this.refs.secweight.value = 0
            }
            else {
                myValidator.isValidSectionName = false;
                this.setState({ isValidSectionName: false })
            }


        }.bind(this);

        this.onAddTemplateClicked = function () {
            debugger;
            this.refs.dialog.openDialog()
        }.bind(this);

        this.saveTemplate = function () {
            debugger
            if (nameRx.test(this.state.name) && this.state.sections.length > 0) {
                var template = {
                    name: this.state.name,
                    sections: this.state.sections,
                    date: new Date().formatMMDDYYYY()
                };
                let body = JSON.stringify({
                    template: template
                })
                postData(URL.ADDTEMPLATE, body).
                    then(r => r.json().then(d => console.log(d))).
                    catch()
                window.location.reload();
            }
        }.bind(this)
    }

    render() {
        return (
            <div className="conatainer">
                <Dialog ref="dialog" onOKClicked={this.saveTemplate} title={this.state.dialogTitle} body={this.state.dialogBody} />
                <div className="row">
                    <div className="col-lg-10">
                        <PageHeader>Add Template</PageHeader>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Panel header={<span>Add an Evaluation Template</span>} >
                            <div className="row">
                                <div className="col-lg-6">
                                    <Form>
                                        <FormGroup controlId="tName" className={this.state.isValidName ? "" : "has-error"}>
                                            <ControlLabel>Name</ControlLabel>
                                            <FormControl type="text" placeholder="Enter Template Name" onBlur={this.onTemplateNameBlured} />
                                            <FormControlFeedback />
                                            <HelpBlock style={{ display: this.state.isValidName ? "none" : "block" }}>{warnings.name}</HelpBlock>
                                        </FormGroup>
                                        <FormGroup controlId="AddSection">
                                            <ControlLabel>Add Section</ControlLabel>
                                            <FormControlFeedback />
                                        </FormGroup>
                                        <FormGroup controlId="weightage">

                                            <ControlLabel>Weightage of Section</ControlLabel>
                                            <select className="col-md-3 form-control" ref="secweight">
                                                {
                                                    [...Array(101).keys()].map(k => {
                                                        return <option value={k}>{k}</option>
                                                    })
                                                }
                                            </select>
                                            <div style={{ paddingBottom: 20 + "px" }}>
                                                {"  "}
                                            </div>
                                        </FormGroup>

                                        <FormGroup ControlId="section" className={this.state.isValidSectionName ? "" : "has-error"}>
                                            <ControlLabel>Section Name</ControlLabel>
                                            <input className="form-control" type="text" placeholder="Enter Section name" ref="txtSection" onBlur={this.onSectionNameBlured} />
                                            <FormControlFeedback />
                                            <HelpBlock style={{ display: this.state.isValidSectionName ? "none" : "block" }}>{warnings.sectionName}</HelpBlock>
                                        </FormGroup>
                                        <FormGroup ControlId="field" className={this.state.isValidField ? "" : "has-error"}>
                                            <ControlLabel>Field</ControlLabel>
                                            <textarea type="text" placeholder="Enter Field" ref="txtField" onBlur={this.onFieldBlured} className="form-control" />
                                            <FormControlFeedback />
                                            <HelpBlock style={{ display: this.state.isValidField ? "none" : "block" }}>{warnings.field}</HelpBlock>
                                        </FormGroup>
                                        <FormGroup ControlId="evaluationTechnique">
                                            <ControlLabel>Evaluation Technique</ControlLabel>
                                            <FormControl className="col-md-3" componentClass="select" value={this.state.evaluationCriteria} onChange={this.onEvaluationCriteriaChanged}>
                                                <option value={staticData.evauation_criteria.nominal}>Nominal</option>
                                                <option value={staticData.evauation_criteria.ordinal}>Ordinal</option>
                                            </FormControl>
                                            <FormControlFeedback />
                                        </FormGroup>
                                        <FormGroup ControlId="evaluationTechnique">
                                            <div><span><br></br></span></div>
                                        </FormGroup>
                                        <FormGroup ControlId="scale" className={this.state.isValidScale ? "" : "has-error"}>
                                            <div>
                                                <ControlLabel>Range</ControlLabel>
                                            </div>
                                            {
                                                (() => {
                                                    if (this.state.evaluationCriteria == staticData.evauation_criteria.ordinal) {
                                                        return (
                                                            <div className="row">
                                                                <div className="col-lg-4">
                                                                    <FormControl type="text" placeholder="Start" id="start" onBlur={this.onStartRangeBlured} />
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <FormControl type="text" placeholder="End" id="end" onBlur={this.onEndRangeBlured} />
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <FormControl type="text" placeholder="Scale" id="Scale" onBlur={this.onScaleRangeBlured} />
                                                                </div>
                                                            </div>)
                                                    } else {
                                                        return (
                                                            <FormControl type="text" placeholder="Enter comma seperated values like Low, Medium ,High" onBlur={this.onNominalBlured} />
                                                        )
                                                    }
                                                })()

                                            }
                                            <FormControlFeedback />
                                            <HelpBlock style={{ display: this.state.isValidScale ? "none" : "block" }}>{warnings.scale}</HelpBlock>
                                        </FormGroup>
                                        <FormGroup ControlId="btnAddField">
                                            <Button onClick={this.onAddFieldClicked}>Save Field</Button>
                                        </FormGroup>
                                        <FormGroup ControlId="btnAddSection">
                                            <Button onClick={this.onAddSectionClicked}>Save Section</Button>
                                        </FormGroup>
                                        <FormGroup ControlId="btnAddTemplate">
                                            <Button onClick={this.onAddTemplateClicked}>Save Template</Button>
                                        </FormGroup>
                                    </Form>
                                </div>
                                <div className="col-lg-6">
                                    <TemplatePriview weight={this.state.weight} title={this.state.templateName} template={this.state.template} />
                                </div>
                            </div>
                        </Panel>
                    </div>
                </div>
            </div>

        );
    }
}

export default displayAddTemplateForm;
