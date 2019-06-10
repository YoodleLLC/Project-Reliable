

import React, {  Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import Pagination from 'react-bootstrap/lib/Pagination';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Well from 'react-bootstrap/lib/Well';
import ProposalTable from './proposaltable';
import TopHeader from '../common/pageheader/topheader';


class Proposal extends Component {
  constructor(props){
    super(props);
   
    this.state={
      onProposalPastDueClicked:{},
    }
  
  
    this.componentDidMount=()=>{
      this.setState({
          pastDueDate:this.refs.ProposalTable
      });
      
    }

    this.onActivityinPastMonthClicked=()=>{
      this.pt.onActivityinPastMonthClicked();
    }


    this.onProposalsDueTodayClicked=()=>{
      this.pt.onProposalsDueTodayClicked();
    }

    this.onActiveProposalClicked=()=>{
      this.pt.onActiveProposalClicked();
     }
  
    this.onProposalPastDueClicked=()=>{
     this.pt.onProposalPastDueClicked();
    }
  }
 
  

  render(){

  return (
    <div >
        <TopHeader title={this.props.keywords.project}/>
        <ProposalTable title={this.props.keywords.project} ref={(pt)=>{this.pt=pt}}/>
    </div>)

}
}



export default Proposal;