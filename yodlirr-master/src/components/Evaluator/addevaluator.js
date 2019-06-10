
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

import DatePicker from 'react-date-picker';
import FormControlFeedback from 'react-bootstrap/lib/FormControlFeedback';
import FormControlStatic from 'react-bootstrap/lib/FormControlStatic';

import validator from 'validator';
import sData from '../common/staticData';
import postData from '../common/common';

const passRexEx=new RegExp("(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\@\!\~\?]).{7,}");
const nameRx=new RegExp('^[A-Za-z]+$');
const phRx=new RegExp("^([0-9]{3})-([0-9]{3})-([0-9]{4})$");
const emailRx=new RegExp('^[A-Za-z]+$');

const warnings={
  ph_no:"Write Phone number in xxx-xxx-xxxx format",
  fname:"Name does not contain other than characters",
  lname:"Name does not contain other than characters",
  email:"Enter proper email address",
  password:"Password is not matching with requirements",
  cpassword:"Confirm Password is not matching with password",
  address:"Enter address",
  null:""
}

var roles=[];
var  myValidators={
  isValidFname:false,
  isValidLname:false,
  isValidEmail:false,
  isValidPassword:false,
  isValidCPassword:false,
  isValidPh:false,
  isValidAddress:false
}           

class AddEvaluator extends Component {
    constructor(props){
        super(props);

        this.state={
            fname:"",
            lname:"",
            ph:"",
            email:"",
            pass:"",
            cPass:"",
            role:[],
            address:"",
            roles:[],                       
            isValidFname:true,
            isValidLname:true,
            isValidEmail:true,
            isValidPassword:true,
            isValidCPassword:true,
            isValidPh:true,
            isValidAddress:true
                     
        }

        this.rolesChanged=function(e){
          debugger;
          var options = e.target.options;
          var value = [];
          for (var i = 0, l = options.length; i < l; i++) {
              if (options[i].selected) {
                  value.push(options[i].value);
              }
          }
          this.setState({
            role:value
          });
        }.bind(this);      
          this.onLNameBlured=function(e){
            debugger;
            
            if(nameRx.test(e.target.value)){           
              myValidators.isValidLname=true
              this.setState({
                lname:e.target.value,
                isValidLname:true
              });
            }
            else{              
              myValidators.isValidLname=false
              this.setState({              
                isValidLname:false
              });
            }            
        }.bind(this);

          this.onEmailBlured=function(e){            
            if(validator.isEmail(e.target.value)){                         
              myValidators.isValidEmail=true
              this.setState({
                email:e.target.value,
                isValidEmail:true
              });
            }
            else{              
              myValidators.isValidEmail=false
              this.setState({              
                isValidEmail:false
              });
            }            
        }.bind(this);
       
       
        this.onFNameBlured=function(e){
       
          if(nameRx.test(e.target.value)){           
            myValidators.isValidFname=true
            this.setState({
              lname:e.target.value,
              isValidFname:true
            });
          }
          else{
            myValidators.isValidFname=false
            this.setState({              
              isValidFname:false
            });
          }         
      }.bind(this);
     
      this.onCPasswordBlured=function(e){        
      if(this.state.pass==e.target.value){  
        myValidators.isValidCPassword=true                 
        this.setState({         
          isValidCPassword:true,
        });
      }
      else{        
        myValidators.isValidCPassword=false
        this.setState({                        
          isValidCPassword:false  
        });
      }    
      }.bind(this);
      this.onPassBlured=function(e){        
        
      if(true == true){     
        myValidators.isValidPassword=true              
        this.setState({         
          isValidPassword:true,
          pass:e.target.value
        });
      }
      else{
        myValidators.isValidPassword=false
        this.setState({              
          isValidPassword:false,  
        });
      }   
      }.bind(this);
     this.onPhBlured=function(e){
      myValidators.isValidPh=true
      if(phRx.test(e.target.value)){           
        
        this.setState({
          ph:e.target.value,
          isValidPh:true
        });
      }
      else{
        myValidators.isValidPh=false
        this.setState({              
          isValidPh:false
        });
      }     
        
    }.bind(this);
      this.onAddressBlured=function(e){
        myValidators.isValidAddress=true        
      if(e.target.value!=""){                  
        this.setState({
          address:e.target.value,
          isValidAddress:true   
        });
      }
      else{      
        myValidators.isValidAddress=false
        this.setState({              
          isValidAddress:false
        })
      }     
      }.bind(this);

      this.validate=function(){
        for(var k in myValidators){
          debugger;
          if(myValidators[k]==false)
          {
            return false;
          }
        }   
      return true;
    }

        this.onAddEvaluator=function(e){
          e.preventDefault();
          if(this.validate()){
            let user={              
              fname:this.state.fname,
              lname:this.state.lname,              
              email:this.state.email,
              pass:this.state.pass,
              address:this.state.address,
              ph:this.state.ph,
              role:this.state.role,
              username:this.state.email,     
                       
            }
        
           let body=JSON.stringify({user})
                
            postData(sData.URL.users.add_user,body).
            then(d=>d.json()).catch(e=>console.log(e)).then(s=>console.log(s));              
            window.location.reload();
           }
           else{
             alert("All data is not propoer");
           }
          }.bind(this);

          this.onCancleEvlauator=function(){
           
          }.bind(this);


          this.getRoles=function(){
            fetch(sData.URL.roles.get_all,{ credentials: 'include'})
            .then(response => response.json())
            .then(response => {
            this.setState({
              roles:response
            })
            }).catch(err=>alert(err));
        }

        this.componentDidMount=function(){
          this.getRoles();
       };
    }

    render(){
    return(
      <div>
     <div className="row">
       <div className="col-lg-12">
          <PageHeader>User</PageHeader>
       </div>
    </div>
    <Panel header={<span>Add User</span>} >
    <div className="row">
      <div className="col-lg-6">
        <Form>
          <FormGroup controlId="formBasicText" 
          className={this.state.isValidFname?"":"has-error"}
          >
            <ControlLabel>First Name</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter First Name"              
              onBlur={this.onFNameBlured}
              
            />
            <FormControlFeedback />
            <HelpBlock style={{display:this.state.isValidFname?"none":"block"}}>{warnings.fname}</HelpBlock>
          </FormGroup>

          <FormGroup controlId="formBasicText"
           className={this.state.isValidLname?"":"has-error"}
          >
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Last Name"             
              onBlur={this.onLNameBlured}
             
            />
            <FormControlFeedback />
            <HelpBlock style={{display:this.state.isValidLname?"none":"block"}}>{warnings.lname}</HelpBlock>
          </FormGroup>

          <FormGroup controlId="formBasicText"
          className={this.state.isValidEmail?"":"has-error"}
          >
            <ControlLabel>Email Address</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Email Address"            
              onBlur={this.onEmailBlured}
              
            />
            <FormControlFeedback />
            <HelpBlock style={{display:this.state.isValidEmail?"none":"block"}}>{warnings.email}</HelpBlock>
          </FormGroup>

          <FormGroup controlId="formBasicText2"
          className={this.state.isValidPassword?"":"has-error"}
          >
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="text"                     
              placeholder="Enter Password"        
              onBlur={this.onPassBlured}
              
            />            
            <FormControlFeedback />         
            <HelpBlock style={{display:this.state.isValidPassword?"none":"block"}}>{warnings.password}</HelpBlock>   
          </FormGroup>
          <FormGroup controlId="formBasicText2"
          className={this.state.isValidCPassword?"":"has-error"}
          >
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
              type="text"                     
              placeholder="Confirm Password"
              onBlur={this.onCPasswordBlured}
              
            />            
            <FormControlFeedback />     
            <HelpBlock style={{display:this.state.isValidCPassword?"none":"block"}}>{warnings.cpassword}</HelpBlock>       
          </FormGroup>
          <FormGroup controlId="roleSelection" 
          >
              <ControlLabel>Roles</ControlLabel>
              <FormControl componentClass="select" multiple onChange={this.rolesChanged} ref="roles" >
              {  
                  this.state.roles.map((role,index)=>{
                    debugger;
                    if(role != undefined){
                        return(<option value={role._id} key={index}>{role.name}</option>)
                      }
                  })
              }
              </FormControl>                   
             <FormControlFeedback />
          </FormGroup> 
          <FormGroup controlId="formBasicText2"
          className={this.state.isValidPh?"":"has-error"}
          >
            <ControlLabel>Enter Phone Number</ControlLabel>
            <FormControl
              type="text"                     
              placeholder="phone number"
              
              onBlur={this.onPhBlured}
              className={this.state.isValidPh?"":"has-error"}
            />            
            <FormControlFeedback />    
            <HelpBlock style={{display:this.state.isValidPh?"none":"block"}}>{warnings.ph_no}</HelpBlock>        
          </FormGroup>
          <FormGroup controlId="formBasicText2"
          className={this.state.isValidEmail?"":"has-error"}
          >
            <ControlLabel>Enter Address</ControlLabel>
            <textarea
              type="text"           
              placeholder="Enter Address"
              onBlur={this.onAddressBlured}
              className={this.state.isValidAddress?"form-control":"form-control has-error"}
            />            
            <HelpBlock style={{display:this.state.isValidAddress?"none":"block"}}>{warnings.address}</HelpBlock>
            <FormControlFeedback />            
          </FormGroup>
          <FormGroup controlId="formBasicText2">
           <Button bsStyle="primary" type="submit" onClick={this.onAddEvaluator}>Add</Button>{'    '}
           <Button bsStyle="warning" type="reset"  onClick={this.onCancleEvlauator}>Cancle</Button>
            <FormControlFeedback />
          </FormGroup>
        
        </Form>
      </div>
    </div>
  </Panel>
  </div>);
  }
}

export default AddEvaluator;
