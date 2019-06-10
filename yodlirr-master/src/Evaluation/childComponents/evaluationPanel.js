

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
import postData from '../../components/common/common';

var totalFields = 0;
var totalAnsweredField = 0;
class EvaluationPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            proposal: undefined,
            currentSectionId: 0,
            currentFieldId: 0,
            leftVisibility: "",
            rightVisibility: "",
            savedFields: [],
            savedResponses: [],
            submitOn: false,
            description: ""
        }

        this.getPossibleAnswers = function (evaluationCriteria, possibleAnswers) {
            debugger;
            var result = ["Select"];
            if (evaluationCriteria === sData.evauation_criteria.nominal) {
                possibleAnswers = possibleAnswers.split(",");
                possibleAnswers.forEach(pa => {
                    result.push(pa.trim());
                })
                return result;
            }
            else if (evaluationCriteria === sData.evauation_criteria.ordinal) {
                possibleAnswers = possibleAnswers.split("-");
                let start = parseInt(possibleAnswers[0])
                let end = parseInt(possibleAnswers[1])
                let scale = parseInt(possibleAnswers[2])

                var tempPossibleAns = []

                while (end > start) {

                    tempPossibleAns.push(start)
                    start = start + scale
                }
                tempPossibleAns.push(end)
            }
            return result.concat(tempPossibleAns);
        };

        this.onDescriptionChanged = function (e) {
            this.setState({
                description: e.target.value
            })
        }.bind(this)

        this.fetchCallback = function (proposal) {
            debugger;
            let taskId = this.props.taskId
            if (this.props.taskStatus == sData.Task_Status.published) {
                let body = JSON.stringify({ taskId, status: sData.Task_Status.opened })
                postData(sData.URL.task.publish_task, body)
            }

            fetch(sData.URL.evauation.get_savedresponse + taskId, { credentials: 'include' }).
                then(r => r.json()).
                then(res => {
                    debugger;
                    let savedResponses = {}
                    if (res != undefined && res.length > 0) {
                        savedResponses = res[0];
                        savedResponses.fields.forEach(s => {
                            proposal.sections.forEach(sec => {
                                sec.fields.some(f => {
                                    if (f._id == s._id) {
                                        f.answer = s.answer
                                        f.description = s.description
                                        totalAnsweredField++
                                        return true
                                    }
                                })
                            })
                        })
                    }
                    else {
                        savedResponses.taskId = taskId;
                        savedResponses.proposal = { _id: proposal._id, name: proposal.name }
                    }


                    this.setState({
                        proposal: proposal,
                        savedResponses: savedResponses,
                        savedFields: savedResponses.fields != undefined ? savedResponses.fields : [],
                        description: proposal.sections[0].fields[0].description == undefined ? "" : proposal.sections[0].fields[0].description,
                        submitOn: totalAnsweredField == totalFields ? true : false
                    });
                })
        }

        this.onDescriptionBlured = function () {
            debugger;
            try {
                let description = this.refs.txtDescription.value
                if (new RegExp("^[A-z0-9 .#@$%^&()]{0,250}$").test(description)) {
                    let proposal = this.state.proposal;
                    let field = {}
                    let savedFields = this.state.savedFields;
                    let index = savedFields.findIndex(sf => sf._id == proposal.sections[this.state.currentSectionId].fields[this.state.currentFieldId]._id)
                    if (index < 0) {
                        field._id = this.state.proposal.sections[this.state.currentSectionId].fields[this.state.currentFieldId]._id;
                        field.description = description;
                        savedFields.push(field);
                    } else {
                        savedFields[index].description = description;
                        proposal.sections[this.state.currentSectionId].fields[this.state.currentFieldId].description = description
                    }
                    this.setState({
                        proposal: proposal,
                        savedFields: savedFields,
                    });
                }
            } catch (err) {
                console.log(err)
                alert("Error in description")
            }

        }.bind(this)

        this.onAnswerChange = function (e) {
            debugger;
            let proposal = this.state.proposal;


            proposal.sections[this.state.currentSectionId].fields[this.state.currentFieldId].answer = e.target.value == "Select" ? "" : e.target.value;
            let field = {}
            let savedFields = this.state.savedFields;
            let index = savedFields.findIndex(sf => sf._id == proposal.sections[this.state.currentSectionId].fields[this.state.currentFieldId]._id)
            let weight = proposal.sections[this.state.currentSectionId].fields[this.state.currentFieldId].weight;
            let totalAnswers = e.target.length - 2

            field.score = weight * (e.target.selectedIndex - 1) / totalAnswers
            if (index < 0) {

                field._id = this.state.proposal.sections[this.state.currentSectionId].fields[this.state.currentFieldId]._id;
                field.answer = e.target.value;
                let weight = proposal.sections[this.state.currentSectionId].fields[this.state.currentFieldId].weight;
                this.refs.answer
                // fields.score=weight*e.target.value/totalAnswers
                debugger
                savedFields.push(field);
            } else {
                savedFields[index].answer = e.target.value;
            }

            totalAnsweredField = 0;
            proposal.sections.forEach(sec => {
                sec.fields.forEach(field => {
                    if (field.answer != "") {
                        totalAnsweredField++
                    }
                })
            })

            this.setState({
                proposal: proposal,
                savedFields: savedFields,
                submitOn: totalAnsweredField == totalFields ? true : false
            });


        }.bind(this);

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

            if (this.state.proposal.sections.length <= 1 && this.setState.proposal.sections[currentSectionId].fields.length <= 1) {
                this.setState({
                    leftVisibility: "hidden",
                    rightVisibility: "hidden"
                })
            } else if (numberOfSections == currentSectionId + 1 && numberOfFields == currentFieldId) {
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
            if (numberOfFields > currentFieldId) {
                this.setState({
                    currentFieldId: currentFieldId,
                    description: this.state.proposal.sections[currentSectionId - 1].fields[currentFieldId].description == undefined ? "" : this.state.proposal.sections[currentSectionId - 1].fields[currentFieldId].description
                });
                this.checkNextVisibility(currentFieldId, currentSectionId, numberOfFields, numberOfSections)
            }
            else if (numberOfSections > currentSectionId) {
                currentFieldId = 0;
                numberOfFields = this.state.proposal.sections[currentSectionId].fields.length;
                this.setState({
                    currentSectionId: currentSectionId,
                    currentFieldId: currentFieldId,
                    description: this.state.proposal.sections[currentSectionId].fields[currentFieldId].description == undefined ? "" : this.state.proposal.sections[currentSectionId].fields[currentFieldId].description
                });
                this.checkNextVisibility(1, currentSectionId, numberOfFields, numberOfSections)
            }

        }.bind(this);

        this.checkPrevVisibility = function (currentFieldId, currentSectionId, numberOfFields, numberOfSections) {

            if (this.state.proposal.sections.length <= 1 && this.setState.proposal.sections[currentSectionId].fields.length <= 1) {
                this.setState({
                    leftVisibility: "hidden",
                    rightVisibility: "hidden"
                })
            } else if (currentSectionId + 1 == 1 && currentFieldId == 0) {
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
                    description: this.state.proposal.sections[currentSectionId + 1].fields[currentFieldId].description == undefined ? "" : this.state.proposal.sections[currentSectionId + 1].fields[currentFieldId].description
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
                    description: this.state.proposal.sections[currentSectionId].fields[currentFieldId].description == undefined ? "" : this.state.proposal.sections[currentSectionId].fields[currentFieldId].description
                });

                this.checkPrevVisibility(currentFieldId, currentSectionId, numberOfFields + 1, numberOfSections)
            }
        }.bind(this);

        this.onSubmit = function () {
            debugger;
            try {
                let fields = [];
                this.state.proposal.sections.forEach(s => {
                    s.fields.forEach(f => {
                        fields.push(f)
                    })
                })
                let proposal = {
                    _id: this.props.proposalId,
                    fields: this.state.savedFields
                }
                let body = JSON.stringify({ vendor: this.props.vendor, proposal })
                postData(sData.URL.evauation.submit_response, body)
                    .then(res => {
                        if (res.status == "200" && res.statusText == "OK") {
                            body = JSON.stringify({
                                taskId: this.props.taskId,
                                status: sData.Task_Status.submitted
                            })
                            postData(sData.URL.task.publish_task, body).catch(err=>{
                                alert(err)
                                throw err
                            })
                            alert("Data has been submitted successfully")
                            window.location.reload()
                        }
                    })
                    .catch(err => {
                        alert(err)
                        throw err
                    })

                var savedResponses = Object.assign({}, this.state.savedResponses)
                savedResponses.fields = this.state.savedFields;
                body = JSON.stringify({
                    savedResponses
                })
                postData(sData.URL.evauation.save_response, body)
                    .then(res => {
                        if (res.status != "200" && res.statusText != "OK") {
                           console.log("response saved sucessfully")
                        }
                    })
                    .catch(err => alert(err))
            } catch (error) {
                alert(error)
            }




        }.bind(this);

        this.onSave = function () {
            debugger;
            var savedResponses = Object.assign({}, this.state.savedResponses)
            savedResponses.fields = this.state.savedFields;

            savedResponses.proposal._id = this.props.proposalId

            debugger;

            let body = JSON.stringify({
                savedResponses: savedResponses,
            })

            postData(sData.URL.evauation.save_response, body)
                .then(res => {
                    if (res.status == "200" && res.statusText == "OK") {
                        body = JSON.stringify({
                            taskId: this.props.taskId,
                            status: sData.Task_Status.inprogress
                        })
                        postData(sData.URL.task.publish_task, body)
                        alert("Data has been saved successfully")
                        window.location.reload()
                    }
                })
                .catch(err => alert(err))
        }.bind(this)

    }


    componentDidMount() {
        fetch(sData.URL.templates.get_template + this.props.templateID, { credentials: 'include' }).
            then(r => r.json()).
            then(res => {
                debugger;
                this.setState({
                    proposal: res[0]
                })
                this.checkNextPrevVisibility(res[0])
                res[0].sections.forEach(sec => {
                    totalFields = sec.fields.length + totalFields;
                })
                this.fetchCallback(res[0])
            })
            .catch(err => alert(err))
    }



    render() {



        const SubmitButton = () => {
            if (this.state.submitOn) {
                return <Button bsStyle='danger' onClick={this.onSubmit}>Submit</Button>
            }
            else {
                return null
            }
        }

        const { proposal, proposalId, currentSectionId, leftVisibility, rightVisibility, currentFieldId } = this.state;


        if (this.state.proposal == undefined) {
            return null
        } else {
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
                                <ControlLabel>Select Your Response </ControlLabel>
                                <FormControl className="col-md-3" componentClass="select" value={proposal.sections[currentSectionId].fields[currentFieldId].answer} ref="answer" onChange={this.onAnswerChange} placeholder="Select Response">
                                    {
                                        this.getPossibleAnswers(proposal.sections[currentSectionId].fields[currentFieldId].evaluationCriteria, proposal.sections[currentSectionId].fields[currentFieldId].possibleAnswers).map((ans, index) => {
                                            return (<option value={ans} key={index}>{ans}</option>)
                                        })
                                    }

                                </FormControl>
                                <FormControlFeedback />
                            </FormGroup>
                        </Form>
                        <div className="row">
                            <span>{"  "}</span>
                        </div>

                        <FormGroup>
                            <ControlLabel>Description</ControlLabel>
                            <textarea className="form-control" ref="txtDescription" onChange={this.onDescriptionChanged} value={this.state.description} onBlur={this.onDescriptionBlured} />
                        </FormGroup>

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
                        <div className="row">
                            <span>{' '}</span>
                        </div>
                        <div style={{ paddingTop: "20px" }}>
                            <Button bsStyle='primary' onClick={this.onSave}>Save</Button>{' '}
                            <SubmitButton />
                        </div>


                    </div>
                </div>

            )
        }
    }



}


export default EvaluationPanel;