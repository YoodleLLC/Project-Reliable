

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

import proposal from '../../components/Proposal/proposal';
import sData from '../../components/common/staticData';
import postData from '../../components/common/common'

class SubmittedPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSectionId: 0,
            currentFieldId: 0,
            leftVisibility: "",
            rightVisibility: "",
            proposal: undefined,
            fields: undefined
        }
       
        this.checkNextPrevVisibility = function (proposal) {
            if (proposal.sections.length <= 1 && proposal.sections[0].fields.length <= 1) {
                this.setState({
                    leftVisibility: "hidden",
                    rightVisibility: "hidden"
                })
            } else {
                this.setState({
                    leftVisibility: "hidden",
                    rightVisibility: ""
                })
            }
        }

        this.checkNextVisibility = function (currentFieldId, currentSectionId, numberOfFields, numberOfSections) {

            if (numberOfSections == currentSectionId + 1 && numberOfFields == currentFieldId) {
                this.setState({
                    leftVisibility: "",
                    rightVisibility: "hidden"
                })

            } else {
                this.setState({
                    leftVisibility: "",
                })
            }
        }

        this.getNext = function () {

            let numberOfFields = this.state.proposal.sections[this.state.currentSectionId].fields.length;
            let numberOfSections = this.state.proposal.sections.length;
            let currentFieldId = this.state.currentFieldId + 1;
            let currentSectionId = this.state.currentSectionId + 1;

            debugger


            if (numberOfFields > currentFieldId) {
                this.setState({
                    currentFieldId: currentFieldId,
                });
                this.checkNextVisibility(currentFieldId, currentSectionId, numberOfFields, numberOfSections)
            }
            else if (numberOfSections > currentSectionId) {
                currentFieldId = 0;
                numberOfFields = this.state.proposal.sections[currentSectionId].fields.length;
                this.setState({
                    currentSectionId: currentSectionId,
                    currentFieldId: currentFieldId,
                });
                this.checkNextVisibility(1, currentSectionId, numberOfFields, numberOfSections)
            }



        }.bind(this);

        this.checkPrevVisibility = function (currentFieldId, currentSectionId, numberOfFields, numberOfSections) {

            if (currentSectionId + 1 == 1 && currentFieldId == 0) {
                this.setState({
                    leftVisibility: "hidden",
                    rightVisibility: ""
                })
            } else {
                this.setState({
                    rightVisibility: "",
                })
            }
        }

        this.getPrev = function () {
            debugger;

            let currentFieldId = this.state.currentFieldId - 1;
            let currentSectionId = this.state.currentSectionId - 1;
            let numberOfFields = 0;
            let numberOfSections = this.state.numberOfSections;

            if (0 <= currentFieldId) {
                this.setState({
                    // rightVisibility:"hidden",
                    currentFieldId: currentFieldId,
                });
                this.checkPrevVisibility(currentFieldId, currentSectionId + 1, numberOfFields, numberOfSections)
            }
            else if (0 <= currentSectionId) {
                numberOfFields = this.state.proposal.sections[currentSectionId].fields.length - 1
                currentFieldId = currentFieldId < 0 ? numberOfFields : currentFieldId
                this.setState({
                    // leftVisibility:"",
                    currentSectionId: currentSectionId,
                    currentFieldId: currentFieldId,
                });

                this.checkPrevVisibility(currentFieldId, currentSectionId, numberOfFields + 1, numberOfSections)
            }
        }.bind(this);
    }

    componentDidMount(){
        let body = JSON.stringify({
            id: this.props.taskId
        })
        postData(sData.URL.evauation.get_response, body)
        .then(res => res.json())
        .then(pRes => {
            debugger;
            fetch(sData.URL.templates.get_template + this.props.templateID)
                .then(res => res.json())
                .then(res => {
                    debugger;
                    var i = 0
                    res[0].sections.forEach(sec => {
                        sec.fields.forEach(field => {
                            debugger;
                            field.answer = pRes.fields[i].answer
                            field.description = pRes.fields[i].description
                            i++
                        })
                    })

                    this.setState({
                        proposal: res[0]
                    })

                    this.checkNextPrevVisibility(res[0]);
                }).catch(err => alert(err))

        })
        .catch(err => console.log(err))
    }



    render() {



        var { proposal, fields, currentSectionId, leftVisibility, rightVisibility, currentFieldId } = this.state;

        debugger;
        if (proposal == undefined || proposal.sections == undefined) {
            return null;
        }
        else {

            return (
                <div className="col-lg-6">
                    <div className="row">

                        <Form>
                            <FormGroup controlId="proposal">
                                <ControlLabel>Proposal: {proposal.name}</ControlLabel>
                                <FormControlFeedback />
                            </FormGroup>

                            <FormGroup controlId="section">
                                <ControlLabel>Section: {proposal.sections[currentSectionId].sectionName}</ControlLabel>
                                <FormControlFeedback />
                            </FormGroup>


                            <FormGroup controlId="question">
                                <ControlLabel>Question {proposal.sections[currentSectionId].fields[currentFieldId].field}</ControlLabel>
                                <FormControlFeedback />
                            </FormGroup>


                            <FormGroup controlId="answer">
                                <ControlLabel>Your Response : {proposal.sections[currentSectionId].fields[currentFieldId].answer}</ControlLabel>
                                <FormControlFeedback />
                            </FormGroup>

                            <FormGroup controlId="description">
                                <ControlLabel>Description : {proposal.sections[currentSectionId].fields[currentFieldId].description}</ControlLabel>
                                <FormControlFeedback />
                            </FormGroup>
                        </Form>
                        <div className="row">
                            <span>{"  "}</span>
                        </div>

                        <div style={{ paddingTop: "40px" }}>
                            <div className="col-lg-10">

                                <Button bsStyle='danger' className={leftVisibility} onClick={this.getPrev}><span className="glyphicon-arrow-left"></span></Button>
                            </div>
                            <div className="col-lg-2 clearfix pull-right">
                                <FormGroup controlId="formBasicText2">
                                    <Button bsStyle='primary' className={rightVisibility} onClick={this.getNext}><span className="glyphicon-arrow-right"></span></Button>{' '}
                                    <FormControlFeedback />
                                </FormGroup>
                            </div>
                        </div>

                    </div>
                </div>
            )
        }
    }
}


export default SubmittedPanel;