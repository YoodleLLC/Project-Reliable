

import React, {  Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import Pagination from 'react-bootstrap/lib/Pagination';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Well from 'react-bootstrap/lib/Well';
import TrainingTable from '../trainings/trainingTable';
import TopHeader from '../../common/pageheader/topheader';


class Trainings extends Component {
  constructor(props){
    super(props);
   
    this.state={
      onProposalPastDueClicked:{},
    }
  
  
    this.componentDidMount=()=>{
     
      
    }

  
  }
 
  

  render(){

  return (
    <div >
        <TopHeader title="Trainings"/>
        <TrainingTable title="List of Trainings" />
    </div>)

}
}



export default Trainings;