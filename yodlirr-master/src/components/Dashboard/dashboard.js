import React, { Component } from 'react';
import {
  MenuItem,
  DropdownButton,
  Panel, PageHeader, ListGroup, ListGroupItem, Button,
} from 'react-bootstrap';
  import {Link} from 'react-router-dom';
import StatWidget from './widgets/widgets';
import Proposal from '../Proposal/proposal';
import TopHeader from '../common/pageheader/topheader'; 
import AppData from '../common/staticData';
const title="Dashboard";
class Dashboard extends Component {
constructor(props){
  super(props);

  

  this.state={
    activeProposals:"2",
    proposalsDueToday:"0",
    activityInPastMonth:"10",
    proposalsPastDue:"0",
    pastDueDate:{}
  }

  
    this.componentDidMount=()=>{
      this.setState({
        proposal:this.proposal
      });
      
    }
}

  render() {
    const{widgets_footer} =AppData;
    return (
    <div >
        <TopHeader title={title} />   
        <div className="row" >
          <div className="col-lg-3 col-md-6">
            <StatWidget
              style="panel-primary"
              icon="fa fa-comments fa-5x"
              count={this.state.activeProposals}
              headerText=""
              footerText= {widgets_footer.active_proposals}
              linkTo="/proposal"
              proposal={this.state.proposal}
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <StatWidget
              style="panel-success"
              icon="fa fa-tasks fa-5x"
              count={this.state.proposalsDueToday}
              headerText=""
              footerText={widgets_footer.activity_in_past_month}
              linkTo="/"
              proposal={this.state.proposal}
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <StatWidget
              style="panel-warning"
              icon="fa fa-shopping-cart fa-5x"
              count={this.state.activityInPastMonth}
              headerText=""
              footerText={widgets_footer.proposal_past_due}
              linkTo="/"
              proposal={this.state.proposal}
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <StatWidget
              style="panel-danger"
              icon="fa fa-support fa-5x"
              count={this.state.proposalsPastDue}
              headerText=""
              footerText={widgets_footer.proposal_due_today}
              linkTo="/"
              proposal={this.state.proposal}
            />
          </div>
        </div>
        
        <div>
            <Proposal {...this.props} ref={(p)=>this.proposal=p}  />
        </div>

        </div>
    )
  }
}

export default Dashboard;
