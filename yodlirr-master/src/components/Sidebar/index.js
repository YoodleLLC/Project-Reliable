//https://github.com/wmira/react-sidenav

import React, { Component } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router'
import { withRR4,Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
import {BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_business } from 'react-icons-kit/md/ic_business';
import { ic_business_center } from 'react-icons-kit/md/ic_business_center';
import { ic_format_list_bulleted } from 'react-icons-kit/md/ic_format_list_bulleted';
import { ic_people } from 'react-icons-kit/md/ic_people';
import { ic_shopping_cart } from 'react-icons-kit/md/ic_shopping_cart';
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
const Icon20 = props => <SvgIcon size={props.size || 20} icon={props.icon} />;
const SideNav = withRR4();

class Sidebar extends Component {

    constructor(props) {
        super(props);

    }

    renderDashboad = () => {
        return <Dashboard/>;
    }

   

  render() {
    return (
    <Router>
        <div >
           
        <div className="col-lg-2" style={{background: '#2c3e50', color: '#FFF',paddingLeft:0,paddingRight:0,height: window.outerHeight}}> 
            <SideNav highlightColor='#E91E63' highlightBgColor='#00bcd4' defaultSelected='sales'>       
            <Nav id='login'>
                    <NavIcon><SvgIcon size={20} icon={ic_aspect_ratio}/></NavIcon>    
                    <NavText >Login</NavText>                    
                </Nav>
                <Nav id='dashboard'>
                    <NavIcon><SvgIcon size={20} icon={ic_aspect_ratio}/></NavIcon>    
                    <NavText >Dashboard</NavText>
                </Nav>
                <Nav id='proposal'>
                    <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                    <NavText> Proposals </NavText>
                    <Nav id="addproposal">
                        <NavIcon><Icon20 size={16} icon={ic_business_center} /></NavIcon>
                        <NavText> Add Proposal </NavText>
                    </Nav>
                    <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                    <NavText> Proposals </NavText>
                    <Nav id="viewproposal">
                        <NavIcon><Icon20 size={16} icon={ic_business_center} /></NavIcon>
                        <NavText> View Proposal </NavText>
                    </Nav>
                    <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                    <NavText> Proposals </NavText>
                    <Nav id="attachvendor">
                        <NavIcon><Icon20 size={16} icon={ic_business_center} /></NavIcon>
                        <NavText> Attach Vendors </NavText>
                    </Nav>
                    <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                    <NavText> Proposals </NavText>
                    <Nav id="attachRFPs">
                        <NavIcon><Icon20 size={16} icon={ic_business_center} /></NavIcon>
                        <NavText> Attach RFPs </NavText>
                    </Nav>
                </Nav>
                <Nav id="vendor">
                    <NavIcon><Icon20 icon={ic_people} /></NavIcon>
                    <NavText> Vendors </NavText>
                    <Nav id="addvendor">
                        <NavIcon><Icon20 size={16} icon={ic_aspect_ratio} /></NavIcon>
                        <NavText> Add Vendor </NavText>
                    </Nav>   
                    <Nav id="view">
                        <NavIcon><Icon20 size={16} icon={ic_aspect_ratio} /></NavIcon>
                        <NavText>Vendors </NavText>
                    </Nav>                  
                </Nav>
                <Nav id='evaluator'>
                    <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                    <NavText> Evaluators </NavText>
                    <Nav id="addevaluator">
                        <NavIcon><Icon20 size={16} icon={ic_business_center} /></NavIcon>
                        <NavText> Add Evaluator </NavText>
                    </Nav>
                    <Nav id="view">
                        <NavIcon><Icon20 size={16} icon={ic_business_center} /></NavIcon>
                        <NavText> Users </NavText>
                    </Nav>
                </Nav>
                <Nav id='settings'>
                    <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                    <NavText> Settings </NavText>
                </Nav>
                <Nav id='roles'>
                    <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                    <NavText> Roles </NavText>
                   
                </Nav>
                <Nav id='reports'>
                    <NavIcon><SvgIcon size={20} icon={ic_aspect_ratio}/></NavIcon>    
                    <NavText >Report</NavText>
                </Nav>
                <Nav id='template'>
                    <NavIcon><SvgIcon size={20} icon={ic_format_list_bulleted}/></NavIcon>
                    <NavText> Template </NavText>
                    <Nav id="addtemplate">
                        <NavIcon><Icon20 size={16} icon={ic_business_center} /></NavIcon>
                        <NavText><Link to="/template/template/addtemplate"> Add Template </Link></NavText>
                    </Nav>
                    <Nav id="templates">
                        <NavIcon><Icon20 size={16} icon={ic_business_center} /></NavIcon>
                        <NavText> Templates </NavText>
                    </Nav>                   
                </Nav>
                <Nav id='tasks'>
                    <NavIcon><SvgIcon size={20} icon={ic_format_list_bulleted}/></NavIcon>
                    <NavText> Tasks </NavText>                                                   
                </Nav>
            </SideNav>
        </div>
        <div className="col-lg-9" >
                        <Route exact path="/updatePass" render={()=>{return <UpdatePass/>}} />          
                        <Route excat path="/login" render={()=>{return <Login/>}}/>
                        <Route path="/dashboard" render={() => {return <Dashboard/>;}}/>
                        <Route path="/tasks" render={()=>{return <Task/>}}/>                            
                        <Route exact path="/proposal" render={()=>{return <Proposal/>}}/>
                        <Route path="/vendor/vendor/addvendor" render={() => {return <AddVendor/>}}/>                        
                        <Route path="/vendor/vendor/view" render={()=>{return <Vendors/>}}/>
                        <Route excat path="/vendor/addvendor" render={()=>{return <AddVendor/>}}/>
                        <Route path="/evaluator/evaluator/view" render={()=>{return <Users/>}}/>
                        <Route path="/settings"  render={(e)=>{return <Settings/>}}/>                        
                        <Route path="/proposal/proposal/addproposal" render={() => {return <AddProposal/>;}}/>
                        <Route path="/proposal/proposal/attachRFPs" render={()=>{return <AttachRFPs/>}} />
                        <Route path="/evaluator/evaluator/addevaluator" render={() => {return <AddEvaluator/>;}}/>
                        <Route path="/template/template/templates" render={() => {return <Templates/>;}}/>
                        <Route path="/template/template/templates1" render={() => {return <Templates/>;}}/>
                        <Route path="/template/template/addtemplate" render={() => {return <AddTemplate/>;}}/>
                        <Route path="/roles" render={() => {return <Roles/>;}}/>
                        <Route path="/proposal/proposal/viewproposal" render={()=>{return <ViewProposal/>}}/>
                        <Route path="/proposal/proposal/attachvendor" render={()=>{return <AttachVendor/>}}/>   
                        <Route path="/reports/:proposalId" render={(props)=>{return <Report {...props}/>}}/>
        </div>
     </div>
    </Router>)
  }
}


export default Sidebar;
