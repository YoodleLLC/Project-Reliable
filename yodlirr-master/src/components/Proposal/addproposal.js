
import React, {  Component } from 'react';
import { Route } from 'react-router-dom';

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

import AddEvaluator from './addevaluator';
import evaluator from '../Evaluator/evaluator';
import sData from '../common/staticData';
import postData from '../common/common';
var evaluators = []

const nameRx = new RegExp('^[A-Za-z :-]+$');

var myValidators = {
  isValidDate: false,
  isValidEval: false,
  isValidProcurementOfficer: false,
  isValidTemplate: false,
  isValidName: false
}
const warning = {
  date: "Date should be greater or equal than today",
  evaluator: "Select atleast one evaluator",
  procurementOfficer: "Select ",
  template: "Select template ",
  null: "This field should not be null",
  name: "Name containes only characters"
}
class AddProposal extends Component {

  constructor(props) {
    super(props);



    Date.prototype.formatMMDDYYYY = function () {
      return (this.getMonth() + 1) +
        "/" + this.getDate() +
        "/" + this.getFullYear();
    }

    this.state = {
      due_date: new Date().formatMMDDYYYY(),

      proposal: {},
      name: "",
      selectedEvaluatorsToRemove: [],
      selectedEvaluatorsToAdd: [],
      procurementOfficers: [],
      selectedProcurementOfficer: {},
      selectedTemplate: "",
      templates: [],
      isMyEvalVisible: false,
      evaluators: [],
      lastEvaluatorId: 20,
      allEvaluators: [],
      isValid: true,
      isValidDate: true,
      isValidEval: true,
      isValidProcurementOfficer: true,
      isValidTemplate: true,
      isValidName: true,
    }



    this.onNameBlured = function (e) {
      if (nameRx.test(e.target.value)) {
        myValidators.isValidName = true;
        this.setState({
          isValidName: true,
          name: e.target.value
        });
      } else {
        myValidators.isValidName = false;
        this.setState({ isValidName: false });
      }
    }.bind(this);

    this.onDateChanged = function (date) {
      debugger;
      let today = new Date();
      if (date >= today) {
        myValidators.isValidDate = true;
        this.setState({
          due_date: date.formatMMDDYYYY(),
          isValidDate: true
        })
      }
      else {
        myValidators.isValidDate = false;
        this.setState({
          isValidDate: false
        });
      }
    }.bind(this);

    this.onAddEvaluator = function () {
      let selectedEval = this.state.evaluators;
      this.state.selectedEvaluatorsToAdd.forEach(e => {
        selectedEval.push(this.state.allEvaluators.find(ev => { return ev._id == e }
        )
        )
      });
      evaluators = selectedEval;
      debugger;
      this.setState({
        evaluators: selectedEval
      });
    }.bind(this);
    this.onRemoveEvaluator = function (e) {
      let evaluatorToRemoveArr = [];
      this.state.selectedEvaluatorsToRemove.forEach(e => {
        evaluatorToRemoveArr.push(this.state.allEvaluators.find(ev => { return ev._id == e }
        )
        )
      });
      let evalArr = this.state.evaluators;
      evaluatorToRemoveArr.forEach(e => {
        let index = evalArr.indexOf(e);

        if (index > -1) {
          evalArr.splice(index, 1);
        }
      });
      this.setState({
        evaluators: evalArr
      });
    }.bind(this);
    this.evaluatorToRemoveChanged = function (e) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      this.setState({
        selectedEvaluatorsToRemove: value
      });
    }.bind(this);

    this.onProcurementOfficerChanged = function (e) {
      debugger;
      if (e.target.value != "") {
        let poValues = e.target.value.split(" ");
        let po = {};
        po._id = poValues[0];
        po.fname = poValues[1];
        po.lname = poValues[2];
        po.email = poValues[3];
        myValidators.isValidProcurementOfficer = true;
        this.setState({
          selectedProcurementOfficer: po,
          isValidProcurementOfficer: true
        });
      }
      else {
        myValidators.isValidProcurementOfficer = false;
        this.setState({
          isValidProcurementOfficer: false
        });
      }
    }.bind(this);

    this.onTemplateChanged = function (e) {
      debugger;
      if (e.target.value != "") {
        myValidators.isValidTemplate = true;
        this.setState({
          selectedTemplate: e.target.value,
          isValidTemplate: true
        });
      }
      else {
        myValidators.isValidTemplate = false;
        this.setState({
          isValidTemplate: false
        });
      }
    }.bind(this);

    this.evaluatorToAddChanged = function (e) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      this.setState({
        selectedEvaluatorsToAdd: value
      });

    }.bind(this);


    this.CreateProposal = function () {
      let project = {}
      let section = {}
      project.name = this.state.name;
      project.due_date = this.state.due_date;
      project.evaluators = this.state.evaluators;
      project.created_date = new Date().formatMMDDYYYY();
      project.start_date = new Date().formatMMDDYYYY();
      project.templateId = this.state.selectedTemplate;
      project.procurementOfficer = this.state.selectedProcurementOfficer;
      project.status = "Active";

      let body = JSON.stringify({ project })
      postData(sData.URL.projects.add_project, body).then(response => { response.json() })
        .catch(error => console.error('Error:', error))
        .then(response => {
          debugger
          console.log('Success:', response)
        });

    };

    this.onCreateProposal = function (e) {
      e.preventDefault();

      if (this.validate()) {
        this.CreateProposal();
        window.location.reload();
      }
      else {
        alert("Something is wrong");
      }
    }.bind(this);

    this.validate = function () {
      if (this.state.evaluators.length > 0) {
        myValidators.isValidEval = true
      } else {
        myValidators.isValidEval = false
        return false;
      }
      for (var k in myValidators) {
        if (!myValidators[k]) {
          return false
        }
      }
      return true;
    }

    this.getEvaluators = function () {
      fetch(sData.URL.users.getevaluators, { credentials: 'include' })
        .then(response => response.json())
        .then(response => {
          this.setState({
            allEvaluators: response
          })
        }).catch(err => alert(err));
    }
    this.getProcurementOfficer = function () {

      fetch(sData.URL.users.getprocurementofficers, { credentials: 'include' })
        .then(response => response.json())
        .then(response => {
          response.unshift({ _id: "", fname: "Select ", lname: " ", email: "" })
          this.setState({
            procurementOfficers: response
          })
        }).catch(err => alert(err));
    }.bind(this)
    this.getTemplates = function () {
      debugger;
      fetch(sData.URL.templates.names, { credentials: 'include' })
        .then(response => response.json())
        .then(response => {
          response.unshift({ _id: "", name: "Select Template" })
          this.setState({
            templates: response
          });
        }).catch(err => alert(err));
    }


  }

  componentDidMount() {
    this.getProcurementOfficer();
    this.getEvaluators();

    this.getTemplates();
    debugger;
    this.refs.dp.wrapper.setAttribute("style", "z-index:1000")
  }

  render() {
    debugger;
    if (this.props.keywords != undefined) {
      const MyEvaluator = (props) => {
        if (this.state.isMyEvalVisible)
          return (<div className="row">
            <div className="col-lg-6">
              <Form>
                <FormGroup controlId="UserSelection">
                  <ControlLabel>Evlauators</ControlLabel>
                  <FormControl componentClass="select" multiple placeholder="Select User" style={{ height: "400px" }}>
                    {
                      this.state.allEvaluators.filter(
                        e => !this.props.parent.state.evaluators.name.includes(e.name)
                      ).map((user, index) => {
                        return (<option value={user._id} key={index}>{user.name}</option>)
                      })
                    }
                  </FormControl>
                  <FormControlFeedback />
                </FormGroup>
                <FormGroup controlId="submitbuttons">
                  <Button bsStyle="primary" onClick={this.onAddEvaluator}>Add</Button>{'    '}
                  <Button bsStyle="warning" onClick={this.onCancleEvlauator}>Cancle</Button>
                  <FormControlFeedback />
                </FormGroup>
              </Form>
            </div>
          </div>)
        else
          return null;
      }

      const AddTemplate = () => (
        <Route render={({ history }) => (
          <Button
            type='button'
            onClick={() => { history.push('/template/template/addtemplate') }}
          >
            Add New Template
          </Button>
        )} />
      )

      return (
        <div>

          <div className="row">
            <div className="col-lg-12">
              <PageHeader>Create {this.props.keywords.project}</PageHeader>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <Panel header={<span>Create {this.props.keywords.project}</span>} >
                <div className="row">
                  <div className="col-lg-6">
                    <Form>
                      <FormGroup controlId="name"
                        className={this.state.isValidName ? "" : "has-error"}>
                        <ControlLabel>{this.props.keywords.project} Name</ControlLabel>
                        <FormControl
                          type="text"
                          placeholder="Enter  Name"
                          onBlur={this.onNameBlured}
                        />
                        <FormControlFeedback />
                        <HelpBlock style={{ display: this.state.isValidName ? "none" : "block" }}>{warning.name}</HelpBlock>
                      </FormGroup>

                      <FormGroup controlId="date"
                        className={this.state.isValidDate ? "" : "has-error"}
                      >
                        <ControlLabel>Due Date</ControlLabel>
                        <DatePicker
                          onClick={this.datePickerClicked}
                          onChange={this.onDateChanged}
                          value={this.state.due_date}
                          ref="dp"
                        />
                        <FormControlFeedback />
                        <HelpBlock style={{ display: this.state.isValidDate ? "none" : "block" }}>{warning.date}</HelpBlock>
                      </FormGroup>

                      <FormGroup controlId="formBasicText2">
                        <ControlLabel>Evaluators</ControlLabel>
                        <FormControl componentClass="select" multiple onChange={this.evaluatorToRemoveChanged}>
                          {this.state.evaluators.map(function (user, index) {
                            return <option key={index} value={user._id}>{user.fname}{","}{user.lname}{"("}{user.email}{")"}</option>
                          })}
                        </FormControl>
                        <Button onClick={this.onRemoveEvaluator} >Remove Evalutor</Button>
                      </FormGroup>

                      <FormGroup controlId="evaluator"
                        className={this.state.isValidProcurementOfficer ? "" : "has-error"}
                      >
                        <ControlLabel>{this.props.keywords.procurementOfficer}</ControlLabel>
                        <FormControl componentClass="select" placeholder={"Select " + this.props.keywords.procurementOfficer} onChange={this.onProcurementOfficerChanged} >

                          {
                            this.state.procurementOfficers.map(po => {
                              return (<option key={po._id} p={po} value={po._id + " " + po.fname + " " + po.lname + " " + po.email}>{po.fname + " " + po.lname}</option>)
                            })
                          }

                        </FormControl>
                        <FormControlFeedback />
                        <HelpBlock style={{ display: this.state.isValidProcurementOfficer ? "none" : "block" }}>{warning.procurementOfficer}</HelpBlock>
                      </FormGroup>

                      <FormGroup controlId="template"
                        className={this.state.isValidTemplate ? "" : "has-error"}
                      >
                        <ControlLabel>Evluation Criteria</ControlLabel>
                        <FormControl componentClass="select" placeholder="Select Template" onChange={this.onTemplateChanged}>
                          {
                            this.state.templates.map(t => {
                              return (<option key={t._id} value={t._id}>{t.name}</option>)
                            })
                          }
                        </FormControl>
                        <FormControlFeedback />
                        <HelpBlock style={{ display: this.state.isValidTemplate ? "none" : "block" }}>{warning.template}</HelpBlock>
                      </FormGroup>



                      <FormGroup controlId="formBasicText2">
                        <AddTemplate />
                        <FormControlFeedback />
                      </FormGroup>

                      <FormGroup controlId="formBasicText2">
                        <Button bsStyle="primary" type='submit' onClick={this.onCreateProposal}>Create</Button> {'       '}
                        <Button bsStyle="warning" type='reset'>Cancle</Button>
                        <FormControlFeedback />
                      </FormGroup>
                    </Form>
                  </div>
                </div>
              </Panel>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-6">
                  <Form>
                    <FormGroup controlId="UserSelection">
                      <ControlLabel>Evlauators</ControlLabel>
                      <FormControl componentClass="select" onChange={this.evaluatorToAddChanged} multiple placeholder="Select User" style={{ height: "400px" }}>
                        {
                          this.state.allEvaluators.filter(e => !evaluators.includes(e))
                            .map((user, index) => {
                              return (<option value={user._id} key={index}>{user.fname}{","}{user.lname}{"("}{user.email}{")"}</option>)
                            })
                        }
                      </FormControl>
                      <FormControlFeedback />
                    </FormGroup>

                    <FormGroup controlId="formBasicText2">
                      <Button onClick={this.onAddEvaluator}>Add Evalutor</Button>
                      <FormControlFeedback />
                    </FormGroup>

                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
      return null
    }
  }
}

export default AddProposal;
