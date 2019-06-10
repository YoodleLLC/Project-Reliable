import React, {
  
  Component
} from 'react';
import {
  Route
} from 'react-router-dom';
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

import postData from '../common/common';
import sData from '../common/staticData';
import staticData from '../common/staticData';

const title = 'Add Vendor';
const nameRx = new RegExp('^[A-Za-z ]+$');
const idRx=new RegExp('^[A-Za-z0-9]{24}$');
const phRx = new RegExp("^([0-9]{3})-([0-9]{3})-([0-9]{4})$");
const domainRx = new RegExp('^[A-Za-z. @0-9]+$');
const warnings = {
  ph_no: "Write Phone number in xxx-xxx-xxxx format",
  name: "Name does not contain other than characters",
  domain: "Enter valid text",
  null: "This field should not be null"
}

var myValidators = {
  isValidName: false,
  isValidPh: false,
  isValidDomain: false,
  isValidProject:false
}

class AddVendor extends Component {
  constructor(props) {
      super(props);

      this.state = {
          name: "",
          domain: "",
          ph_no: "",
          project: "",
          RFPs: "",
          fileName: "",
          projects: [],
          isValidName: true,
          isValidPh: true,
          isValidDomain: true,
          isValidFile: true,
      };

      this.validate = function() {
        if (idRx.test(this.state.project)) {
            myValidators.isValidProject = true;
        } else {
            myValidators.isValidProject = false;
            return false;
        }
        for (var k in myValidators) {
            if (!myValidators[k]) {
                return false
            }
            return true;
        }
    };

      this.onSubmitClicked = function(e) {
        e.preventDefault();
          if (this.validate()) {
              var vendor = {}
              vendor.name = this.state.name;
              vendor.domain = this.state.domain;
              vendor.ph_no = this.state.ph_no;
              vendor.project = this.state.project;
              vendor.RFPs = this.state.RFPs;
              
              let body= JSON.stringify({vendor})
              postData(sData.URL.vendors.add_vendor, body)
              .then(d=>d.json()
              .then(res=>{
                if(res.statu="200" && res.statusText=="OK"){
                  window.location.reload()
                }
              })
              )
              .catch(err=>alert(err))                          
          }
      }.bind(this);


      this.onNameBlured = function(e) {

          if (!nameRx.test(e.target.value)) {
            myValidators.isValidName=false;
              this.setState({
                  isValidName: false
              });
          } else {
            myValidators.isValidName=true;
              this.setState({
                  isValidName: true,
                  name:e.target.value
              });
          }
      }.bind(this);

      this.onDomainBlured = function(e) {
          if (!domainRx.test(e.target.value)) {
            myValidators.isValidDomain=false;
              this.setState({
                  isValidDomain: false
              });
          } else {
            myValidators.isValidDomain=true;
              this.setState({
                  isValidDomain: true,
                  domain:e.target.value
              });
          }
      }.bind(this);

      this.onPhNoBlured = function(e) {
          debugger;
          if (!phRx.test(e.target.value.toString())) {
            myValidators.isValidPh=false;
              this.setState({
                  isValidPh: false
              });
          } else {
            myValidators.isValidPh=true;
              this.setState({
                  isValidPh: true,
                  ph_no:e.target.value
              });
          }
      }.bind(this);

      this.onProposalChanged = function(e) {
          this.setState({
              project: e.target.value
          })
      }.bind(this);
  }

  componentDidMount() {
      fetch(staticData.URL.projects.names,{ credentials: 'include'}).
      then(d => d.json()).
      then(d => {
          debugger;

          d.unshift({
              _id: "",
              name: "Select"
          });
          this.setState({
              projects: d
          });
      }).catch(err => alert(err));
  }

    render(){
  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader>Add {this.props.keywords.vendors}</PageHeader>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <Panel header={<span>Add {this.props.keywords.vendors}</span>} >
            <div className="row">
              <div className="col-lg-6">
                <Form>
                  <FormGroup
                    controlId="name" 
                    className={this.state.isValidName?"":"has-error"}
                  >
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="Enter Vender's name"                                          
                      onBlur={this.onNameBlured}
                    />
                    <FormControlFeedback />
                    <HelpBlock style={{display:this.state.isValidName?"none":"block"}}>{warnings.name}</HelpBlock>
                  </FormGroup>
                  <FormGroup controlId="domain" 
                  controlId="domain"
                  className={this.state.isValidDomain?"":"has-error"}
                  >
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="Enter Domain"                      
                      onBlur={this.onDomainBlured}
                    />
                    <FormControlFeedback />
                    <HelpBlock style={{display:this.state.isValidDomain?"none":"block"}}>{warnings.domain}</HelpBlock>
                  </FormGroup>

                  <FormGroup controlId="phno" 
                  className={this.state.isValidPh?"":"has-error"}
                  >
                    <ControlLabel>Phone Number</ControlLabel>
                    <FormControl
                    type="text"
                    placeholder="Enter Phone Number"                    
                    onBlur={this.onPhNoBlured}
                  />
                  <FormControlFeedback />
                    <HelpBlock style={{display:this.state.isValidPh?"none":"block"}}>{warnings.ph_no}</HelpBlock>
                  </FormGroup>             
                 
                <FormGroup>
                    <Button type="submit" onClick={this.onSubmitClicked}>Submit</Button>
                    {'  '}
                    <Button type="reset" >Reset</Button>
                </FormGroup>

                  
                </Form>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
}

export default AddVendor;
