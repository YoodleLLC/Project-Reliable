

import React, {  Component } from 'react';
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

class Login extends Component{
    constructor(props, context) {
        super(props)

        this.state={
          userName:"",
          password:"",
          isValidUser:"",
        }

        this.onPassBlured=function(e){

          this.setState({
            password:e.target.value
          });

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
          var user={
            username:this.state.userName,
            pass:this.state.password
          }         
          let body=JSON.stringify({user})
                    
          postData(sData.URL.users.authenticate,body)
          .then((resp) => {
            if(resp.status===200 & resp.statusText==="OK") {             
              this.props.onLogin(true)                
             }
             else{
              this.setState({
                isValidUser:false
              })
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
        <h1 className="">Application Name </h1>
        
      </div>

      <Panel header={<h3>Please Sign In</h3>} className="login-panel">

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
            <Checkbox label="Remember Me" > Remember Me </Checkbox>
            <Button type="submit" bsSize="large" bsStyle="success" onClick={this.onSubmit} block>Login</Button>{" "}
            
          </fieldset>
        </form>

      </Panel>
      <Button type="submit" bsSize="large" bsStyle="primary" onClick={this.onForgotPass} block>Forgot Pass</Button>
    </div>
  );
}
}




export default Login;
