import React, {
    
    Component
} from 'react';
import {
    Panel,
    Button,    
    PageHeader,
    ControlLabel,
    FormControl,
    FormGroup,    
    Form,    
} from 'react-bootstrap';
import FormControlFeedback from 'react-bootstrap/lib/FormControlFeedback';
import sData from '../common/staticData';
import postData from '../common/common';

export default class Roles extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedUser: {},
            selectedRoles: [],
            isSelected: [],
            name: "",
            roles: [],
            users: [],
            userRoles:[],
            allRoles:[],
        };
        
         this.usersChanged = function(e) {
             if(this.state.allRoles.length<=0){
                this.getRoles();
             }
            var options = e.target.options;
            var value = [];
            for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
            this.setState({
                selectedUser: value
            });
            let user = this.state.users.find(u => u._id == value[0]);
            this.selectRoles(user);
        }.bind(this);

        this.onSave = function() {                     
            let body=JSON.stringify({userRoles:this.state.userRoles})  
            postData(sData.URL.roles.update_roles,body)
            .then(d=>d.json().then(res=>{
                if(res.state=="200"){
                    window.location.reload();
                }
            })
        ).catch(e=>console.log(e)).then(s=>console.log(s));              
            
        }.bind(this)

      

        this.onNameChange = function(e) {
            this.state.users.find(user => user._id == e.target.value);
        }.bind(this);

        this.rolesChanged = function(e) {
            debugger;
            var options = e.target.options;
            var value = [];
            for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }

            debugger;

            //get index of selected user
            var indexOfSelectedUser = this.state.users.findIndex(u =>{return u._id == this.state.selectedUser});
           
            //get user for which the roles are updated
            var userToUpdate = this.state.users[indexOfSelectedUser];

            //assign roles
            userToUpdate.role = value;
            
            let userRoles=this.state.userRoles;
            let urIndex= userRoles.findIndex(ur=>{return ur._id==userToUpdate._id});
            if(urIndex>=0){
                userRoles[urIndex]=userToUpdate;
            }else{
                userRoles.push(userToUpdate)
            }
            //update users arr and state
            var usersArr = this.state.users;
            usersArr[indexOfSelectedUser] = userToUpdate;

            this.setState({
                users: usersArr,
                userRoles,
            });


        }.bind(this);

        this.componentDidMount = function() {
            debugger;
            this.getUsers();                     
        };

        this.getUsers = function() {
            fetch(sData.URL.roles.get_roles,{ credentials: 'include'})
                .then(response => response.json())
                .then(users => {
                    this.setState({
                        users
                    });
                }).catch(err => alert(err));
        }
        this.getRoles = function() {
            fetch(sData.URL.roles.get_all,{ credentials: 'include'})
                .then(response => response.json())
                .then(response => {
                    debugger;
                    this.setState({
                        allRoles:response
                    })                
                }).catch(err => alert(err));
        }
        this.selectRoles = function(user) {           
            let selectedRolesArr = [];
            user.role.forEach(roleId => {
                selectedRolesArr[roleId - 1] = true;
            });

            this.setState({
                isSelected: selectedRolesArr
            })
        }
    }

    render(){
        return (
            <div>
            <div className="row">
              <div className="col-lg-12">
                <PageHeader>Roles</PageHeader>
              </div>
            </div>
      
            <div className="row">
              <div className="col-lg-6">
                <Panel header={<span>Add/Update Roles</span>} >
                  <div className="row">
                    <div className="col-lg-6">
                      <Form>                     
                        <FormGroup controlId="UserSelection">
                          <ControlLabel>Users</ControlLabel>
                          <FormControl componentClass="select" multiple onChange={this.usersChanged} placeholder="Select User">
                         {
                             this.state.users.map((user,index)=>{
                              return(<option  value={user._id} key={index}>{user.fname}</option>)
                             })
                          }                           
                          </FormControl>                   
                          <FormControlFeedback />
                        </FormGroup>                                                                                
                        <FormGroup controlId="roleSelection">
                          <ControlLabel>Roles</ControlLabel>
                          <FormControl componentClass="select" multiple onChange={this.rolesChanged} ref="roles" >
                         {  
                             this.state.allRoles.map((role,index)=>{
                              return(<option selected={this.state.isSelected[role._id-1]} value={role._id} key={index}>{role.name}</option>)
                             })
                          }                           
                          </FormControl>                   
                          <FormControlFeedback />
                        </FormGroup>   
                        <FormGroup controlId="UserSelection">
                         <Button bsStyle="primary" onClick={this.onSave}>Save</Button>{' '}
                         <Button bsStyle="warning" onClick={this.onCancle}>Cancle</Button>                  
                          <FormControlFeedback />
                        </FormGroup>                         
                      </Form>
                    </div>
                  </div>
                </Panel>
              </div>
              <div className="col-lg-6">
                
              </div>
            </div>
          </div>
        );
      }
    

}