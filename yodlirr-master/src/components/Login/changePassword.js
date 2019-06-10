

import React, {  Component, ChangeEvent } from 'react';
// import { Panel, Input, Button } from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import { FormControl, Checkbox } from 'react-bootstrap';
import validator from 'validator';
import postData from '../common/common';
import sData from '../common/staticData';

const title = 'Log In';

const emailRegEx=/^/;
const nameRx=new RegExp('^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$');
const passRexEx=new RegExp("(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\@\!\~\?]).{7,}");

var pattern = /^$/; 

class ChangePassword extends Component{
    constructor(props, context) {
        super(props)

        this.state={
          userName:"",
          password:"",
        }

        this.onPassBlured=function(e){
          this.setState({
            password:e.target.value
          });

        }.bind(this);
         
          
        this.onCPassBlured=function(e){
           if(this.state.password==e.target.value){
               this.setState({

               })
           }
  
          }.bind(this);
     
        this.onUserNameBlured=function(e){
          if(validator.isEmail(e.target.value)){
            this.setState({
              userName:e.target.value
            });
          }            
           else{
             alert("Enter Valid Email Address");
           }       
        }.bind(this);

        this.onSubmit=function(e){
          e.preventDefault();
          debugger;
          let tempPass=this.state.password  
          let username=this.state.userName
          let body=JSON.stringify({username,tempPass})
                    
          postData(sData.URL.users.updatePass,body)
          .then((resp) => {
            if(resp.status===200 & resp.statusText==="OK") {
              
              alert("Password Updated Sucessfully")
                  window.location.reload(); 
             }
             else{             
              resp.json().then(d=>{
                if(d.message!=""){
                    alert(d.message)
                }else{
                  
                }
              }) 
            }   
                                                       
          })
          .catch(err=>alert(err))
          
         
        }.bind(this);

        this.onForgotPass=function(e){
          e.preventDefault();
          let username=this.state.userName;
          let body=JSON.stringify({username})
          postData(sData.URL.users.forgotPass,body)                     
        
          
          
         
        }.bind(this);
    }

    render(){
      
  return (
    <div className="col-md-4 col-md-offset-4">
      <div className="text-center">
        <h1 className=""></h1>
        
      </div>

      <Panel header={<h3>Change Your Password</h3>} className="login-panel">

        <form role="form" >
          <fieldset>
            <div className="form-group">
              <FormControl
                type="text"
                className="form-control"
                placeholder="Username"
                name="name"
                onBlur={this.onUserNameBlured}
              
              />
            </div>

            <div className="form-group">
              <FormControl
                className="form-control"
                placeholder="Password"
                type="password"
                name="password"
                onBlur={this.onPassBlured}
              />
            </div>    

              <div className="form-group">
              <FormControl
                className="form-control"
                placeholder="Confirm Password"
                type="password"
                name="password"
                onBlur={this.onCPassBlured}
              />
            </div>     
            <Button type="submit" bsSize="large" bsStyle="success" onClick={this.onSubmit} >Change</Button> {" "}
            <Button type="reset" bsSize="large" bsStyle="warning" >Cancle</Button>            
          </fieldset>
        </form>

      </Panel>      
    </div>

  );
}
}




export default ChangePassword;
