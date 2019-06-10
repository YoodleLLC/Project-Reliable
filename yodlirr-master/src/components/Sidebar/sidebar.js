import React, { Component } from 'react';
import styles from './sideBarMenu.css';
import {Nav, NavItem, Navbar, NavDropdown, MenuItem,} from 'react-bootstrap';
import SvgIcon from 'react-icons-kit';
import {ic_library_books,ic_dashboard,ic_settings_applications,ic_work,ic_question_answer,ic_tag_faces,ic_supervisor_account, ic_assignment_ind} from 'react-icons-kit/md'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Menu from "./menu";
import SingleMenu from "./singleMenu";
import Dashboard from '../Dashboard/dashboard';
import Proposal from '../Proposal/proposal';
import Evaluator from '../Evaluator/evaluator';
import Task from '../Task/task';
import Settings from '../Settings/settings';
import Vendor from '../Vendor/vendor';
import AddVendor from '../Vendor/addvendor';
import AddProposal from '../Proposal/addproposal';
import AddTemplate from '../template/addTemplate';
import Templates from '../template/templates';
import AddEvaluator from '../Evaluator/addevaluator';
import Roles from '../Roles/roles';
import dashboard from '../Dashboard/dashboard';
import AttachVendor from "../Proposal/attachVendor";
import AttachRFPs from "../Proposal/attachRFPs";
import ViewProposal from '../Proposal/viewproposal';
import Login from '../Login/login';
import Vendors from '../Vendor/vendor';
import Users from '../Evaluator/users';
import UpdatePass from '../Login/changePassword';
import Report from '../report/reports';
import TemplateView from '../template/templates';
import sData from "../common/staticData";
import Trainings from "../calibration/trainings/training";
import Calibrate from "../calibration/calibrate";
import AttachEvaluators from "../calibration/attach/attachEvaluator";
import TrainingTasks from "../calibration/tasks/tasks";

export default class sideBarMenu extends Component{

    constructor(props){
        super(props)


        this.state={
            keywords:{}
          }
          debugger
          fetch(sData.URL.projects.keywords,{ credentials: 'include'})
          .then(response => response.json())
          .then(response => {    
              debugger
            this.setState({
                keywords:response.keywords
            });
          }).catch(err=>alert(err)); 
        this.close=function(){
           let mainDiv= document.getElementById("sideBar") 
        }.bind(this)

     
    
          this.componentDidMount=function(){
            debugger
         
    }
}

    render() {

      debugger

    return (
        <Router>
                <div id="sideBar" className="row">
                    <div className="col-lg-2" style={{backgroundColor:"#003f56",height:"1000px"}}>                       
                    <SingleMenu title={"Dashboard"} type={ic_dashboard} to="/dashboard" />
                    <Menu svg={{title:this.state.keywords.project,type:ic_question_answer}} subMenu={[{to:"/proposal/add",name:"Create "+this.state.keywords.project},{to:"/proposal/view",name:"View "+this.state.keywords.project},{to:"/proposal/attach/vendors",name:"Attach "+this.state.keywords.vendors},{to:"/proposal/attach/RFPs",name:"Attach "+this.state.keywords.RFPs}]} />
                    <Menu svg={{title:this.state.keywords.vendors,type:ic_tag_faces}} subMenu={[{to:"/vendor/add",name:"Add "+this.state.keywords.vendors},{to:"/vendor/view",name:"View "+this.state.keywords.vendors}]} />
                    <Menu svg={{title:"Evaluators",type:ic_supervisor_account}} subMenu={[{to:"/evaluator/add",name:"Add Evaluator"},{to:"/evaluator/view",name:"View Evaluators"}]} />
                    <Menu svg={{title:"Templates",type:ic_library_books}} subMenu={[{to:"/template/add",name:"Add Templates"},{to:"/template/view",name:"View Templates"}]} />
                    <Menu svg={{title:"Calibration",type:ic_library_books}} subMenu={[{to:"/calibration/add",name:"Add Training"},{to:"/calibration/trainings",name:"Trainings"},{to:"/calibration/attachEvaluators",name:"Attach Evaluators"},{to:"/calibration/tasks",name:"Tasks"}]}/>
                    <SingleMenu title={"Tasks"} type={ic_work} to="/tasks"/>
                    <SingleMenu title={"Roles"} type={ic_assignment_ind} to="/roles"/>
                    <SingleMenu title={"Settings"} type={ic_settings_applications} to="/settings"/>                
                    </div> 
                    <div className="col-lg-10" >
                    <Route exact path="/" render={() => {return <Dashboard keywords={this.state.keywords} {...this.props}/>;}}/>  
                    <Route path="/updatePass" render={()=>{return <UpdatePass keywords={this.state.keywords} {...this.props}/>}} />          
                    <Route path="/login" render={()=>{return <Login keywords={this.state.keywords} {...this.props}/>}}/>
                    <Route path="/dashboard" render={() => {return <Dashboard keywords={this.state.keywords} {...this.props}/>;}}/>                                                               
                    <Route path="/vendor/add" render={() => {return <AddVendor keywords={this.state.keywords} {...this.props}/>}}/>                        
                    <Route path="/vendor/view" render={()=>{return <Vendors keywords={this.state.keywords} {...this.props}/>}}/>    
                    <Route path="/evaluator/add" render={() => {return <AddEvaluator  keywords={this.state.keywords} {...this.props}/>;}}/>                  
                    <Route path="/evaluator/view" render={()=>{return <Users keywords={this.state.keywords} {...this.props}/>}}/>
                    <Route path="/settings"  render={(e)=>{return <Settings keywords={this.state.keywords} {...this.props}/>}}/>                        
                    <Route path="/proposal/add" render={() => {return <AddProposal keywords={this.state.keywords} {...this.props}/>;}}/>
                    <Route path="/proposal/view" render={()=>{return <Proposal keywords={this.state.keywords} {...this.props}/>}}/>
                    <Route path="/proposal/attach/vendors" render={()=>{return <AttachVendor keywords={this.state.keywords}  {...this.props}/>}}/>   
                    <Route path="/proposal/attach/RFPs" render={()=>{return <AttachRFPs keywords={this.state.keywords} {...this.props}/>}} />
                    <Route path="/template/add" render={() => {return <AddTemplate keywords={this.state.keywords} {...this.props}/>;}}/>
                    <Route path="/template/view" render={() => {return <TemplateView keywords={this.state.keywords} {...this.props}/>;}}/>
                    <Route path="/reports/:proposalId" render={(props)=>{return <Report  {...props}/>}}/>
                    <Route path="/roles" render={() => {return <Roles keywords={this.state.keywords} {...this.props}/>;}}/>
                    <Route path="/tasks" render={()=>{return <Task keywords={this.state.keywords} {...this.props}/>}}/>    
                    <Route path="/calibration/add" render={()=>{return <Calibrate keywords={this.state.keywords} {...this.props}/>}}/>
                    <Route path="/calibration/trainings" render={()=>{return <Trainings  keywords={this.state.keywords} {...this.props} />}}/>
                    <Route path="/calibration/attachEvaluators" render={()=>{return <AttachEvaluators  keywords={this.state.keywords} {...this.props} />}}/>
                    <Route path="/calibration/tasks" render={()=>{return <TrainingTasks  keywords={this.state.keywords} {...this.props} />}}/>
                    </div>   
                </div>        
        </Router>
            
      );
        }
    }
