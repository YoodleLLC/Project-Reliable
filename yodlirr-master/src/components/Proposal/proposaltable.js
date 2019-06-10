

import React, {  Component } from 'react';
import { Link } from 'react-router-dom'
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
import Pagination from 'react-bootstrap/lib/Pagination';

import Well from 'react-bootstrap/lib/Well';
import sData from '../common/staticData';
import postData from '../common/common';

Date.prototype.formatMMDDYYYY = function(){
  return (this.getMonth() + 1) + 
  "/" +  (this.getDate()) +
  "/" +  this.getFullYear();
}



const title = 'Table';

class ProposalTable extends Component {
  constructor(props, context){
    super(props, context);
   
    
   

    this.state={
      projects:[]
    }

    this.componentDidMount=function(){
        fetch(sData.URL.projects.get_all,{ credentials: 'include'})
        .then(response => response.json())
        .then(response => {
        this.setState({
          projects:response
        })
        }).catch(err=>alert(err));
    };

    this.onActiveProposalClicked=function(){
      let activeProposals=this.state.projects.filter((r)=>{
        return (r.status=="Active");
      });
      this.setState({projects:activeProposals });
    }


    this.onActivityinPastMonthClicked=function(){
      let activePastMonth=this.state.projects.filter((r)=>{
        return (r.status=="Active");
      });
      this.setState({projects:activePastMonth });
    }

    this.onProposalsDueTodayClicked=function(){
      let dueTodayProposals=this.state.projects.filter((r)=>{
      
        alert(r.date)
        return (r.date==new Date().formatMMDDYYYY());
      });
      debugger;
      this.setState({projects:dueTodayProposals });
    }

    this.onProposalPastDueClicked=function(){ 
      let pastDueProposals=this.state.projects.filter((r)=>{
        return (r.status=="Active");
      });
      this.setState({projects:pastDueProposals });
    }

    this.onNameClicked=function(){
      this.state.projects.sort(function(d1,d2){
          if(d1.name<d2.name){
            return -1;
          }
          if(d1.name>d2.name){
            return 1;
          }
          if(d1.name==d2.name){
            return 0;
          }        
      });
      this.setState({projects:this.state.projects });
    }.bind(this);
   
    
    this.onEvaluatorClicked=function(){
      this.state.projects.sort(function(d1,d2){
          if(d1.evaluators<d2.evaluators){
            return -1;
          }
          if(d1.evaluators>d2.evaluators){
            return 1;
          }
          if(d1.evaluators==d2.evaluators){
            return 0;
          }        
      });
      this.setState({projects:this.state.projects });
    }.bind(this);
   
    this.onDateClicked=function(){
      this.state.projects.sort(function(d1,d2){
          if(d1.date<d2.date){
            return -1;
          }
          if(d1.date>d2.date){
            return 1;
          }
          if(d1.date==d2.date){
            return 0;
          }        
      });
      this.setState({projects:this.state.projects });
    }.bind(this);
   
    

    this.onStatusClicked=function(){
      this.state.projects.sort(function(d1,d2){
          if(d1.status<d2.status){
            return -1;
          }
          if(d1.status>d2.status){
            return 1;
          }
          if(d1.status==d2.status){
            return 0;
          }        
      });
      this.setState({projects:this.state.projects });
    }.bind(this);
   
   
  }
 

  render(){

  return (
    <div className="row">      
       <div className="col-lg-12">
        <Panel header={<span>{this.props.title}</span>} >
          <div>
            <div className="dataTable_wrapper">
              <div
                id="dataTables-example_wrapper"
                className="dataTables_wrapper form-inline dt-bootstrap no-footer"
              >
                <div className="row">
                  <div className="col-sm-9">
                    <div className="dataTables_length" id="dataTables-example_length">
                      <label htmlFor={'show'}> Show
                        <select
                          name="dataTables-example_length"
                          aria-controls="dataTables-example"
                          className="form-control input-sm"
                          id="show" onChange={(e)=>alert(e.target.value)}
                        >
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                        </select>
                        entries
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div id="dataTables-example_filter" className="dataTables_filter">
                      <label htmlFor={'search'}>Search:
                        <input
                          type="search"
                          className="form-control input-sm"
                          placeholder=""
                          aria-controls="dataTables-example"
                          id="search"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <table
                      className="table table-striped table-bordered table-hover dataTable no-footer"
                      id="dataTables-example"
                      role="grid"
                      aria-describedby="dataTables-example_info"
                    >
                      <thead>
                        <tr role="row">
                          <th
                            className="sorting_asc"
                            tabIndex="0"
                            aria-controls="dataTables-example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Rendering engine: activate to sort column descending"
                            aria-sort="ascending"
                            style={{ width: 265 }}
                            onClick={this.onNameClicked}
                          >
                          Name
                          </th>
                          <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="dataTables-example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Browser: activate to sort column ascending"
                            style={{ width: 321 }}
                            onClick={this.onEvaluatorClicked}
                          >
                          Evaluators
                          </th>
                          <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="dataTables-example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Platform(s): activate to sort column ascending"
                            style={{ width: 299 }}
                            onClick={this.onDateClicked}
                          >
                         Date
                          </th>
                          <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="dataTables-example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Engine version: activate to sort column ascending"
                            style={{ width: 231 }}
                            onClick={this.onStatusClicked}
                          >
                          Status
                          </th>   
                          <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="dataTables-example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Engine version: activate to sort column ascending"
                            style={{ width: 231 }}
                            onClick={this.onStatusClicked}
                          >
                          Report
                          </th>                       
                        </tr>
                      </thead>
                      <tbody>
                      {
                        this.state.projects.map( (d,index)=> {
                          return(
                          <tr key={index}>
                          <td>{d.name}</td>
                          <td>{d.evaluators.length}</td>
                          <td>{d.due_date}</td>
                          <td>{d.status}</td>
                          <td>                          
                            <Button bsStyle="primary" id={d._id}  >
                            <Link to={"../reports/"+d._id} style={{color:'aliceblue'}}>Report</Link></Button> </td>
                        </tr>)
                        })}

                      </tbody>
                    </table>
                  </div>
                </div>
               </div>
               </div>
               </div>
               </Panel>
               </div>
               </div>
            
              
  );
}
}




export default ProposalTable;