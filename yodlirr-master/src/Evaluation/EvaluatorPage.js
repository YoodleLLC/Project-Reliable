
import React, {  Component } from 'react';
import {
  Panel,
  Button,  
  PageHeader,
  } from 'react-bootstrap';
import FormControlFeedback from 'react-bootstrap/lib/FormControlFeedback';
import FormControlStatic from 'react-bootstrap/lib/FormControlStatic';

import sData from '../components/common/staticData';
import postData from '../components/common/common';
import EvaluationPanel from './evaluationPanel';

class EvaluatorPage extends Component{

    constructor(props){
        
        super(props);
        this.state={       
            isTable:true,
            tasks:[],
            taskId:{},            
            taskStatus:"",           
        };


        this.onTaskClicked=function(){
            this.state.tasks.sort(function(d1,d2){
                if(d1.task<d2.task){
                  return -1;
                }
                if(d1.task>d2.task){
                  return 1;
                }
                if(d1.task==d2.task){
                  return 0;
                }        
            });
            this.setState({tasks:this.state.tasks });
          }.bind(this);
         
          this.onTaskOpened=function(proposalId,templateId,taskId,status,vendor){
              this.props.onTaskOpened(proposalId,templateId,taskId,status,vendor);
            debugger;
            this.setState({
              taskStatus:status,             
            });
            fetch(sData.URL.templates.get_template+templateId,{credentials: 'include'}).
              then(r=>r.json()).
              then(res=>{debugger}
            )
          }.bind(this);                  
   
          this.onProposalClicked=function(){
            this.state.tasks.sort(function(d1,d2){
                if(d1.this.state.proposal<d2.this.state.proposal){
                  return -1;
                }
                if(d1.this.state.proposal>d2.this.state.proposal){
                  return 1;
                }
                if(d1.this.state.proposal==d2.this.state.proposal){
                  return 0;
                }        
            });
            this.setState({data:this.state.tasks });
          }.bind(this);
         
          this.onEveluatorClicked=function(){
            this.state.tasks.sort(function(d1,d2){
                if(d1.evaluator<d2.evaluator){
                  return -1;
                }
                if(d1.evaluator>d2.evaluator){
                  return 1;
                }
                if(d1.evaluator==d2.evaluator){
                  return 0;
                }        
            });
            this.setState({data:this.state.tasks });
          }.bind(this);
         
          this.onDueDateClicked=function(){
            this.state.tasks.sort(function(d1,d2){
                if(d1.due_date<d2.due_date){
                  return -1;
                }
                if(d1.due_date>d2.due_date){
                  return 1;
                }
                if(d1.due_date==d2.due_date){
                  return 0;
                }        
            });
            this.setState({data:this.state.tasks });
          }.bind(this);

          this.componentDidMount=function(){
            debugger;       
             fetch(sData.URL.task.evaluator_publishedTasks,{ credentials: 'include'})
             .then(response => response.json())
             .then(response => {      
               debugger;
               this.setState({tasks:response })
             }).catch(err=>alert(err)); 
          }
    }


    
    render(){
      
    
        return(
          <div style={{paddingLeft: '20px',paddingRight: '20px'}}>
              <div className="row">
                  <div className="col-lg-12">
                      <PageHeader>Tasks</PageHeader>
                  </div>
              </div>
              <div className="row">
                  <div className="col-lg-12">
                      <Panel header={<span>View Proposal</span>} >
                          <div>
                              <div className="dataTable_wrapper">
                                  <div id="dataTables-example_wrapper" className="dataTables_wrapper form-inline dt-bootstrap no-footer">

                                      <div className="row">
                                          <div className="col-sm-9">
                                              <div className="dataTables_length" id="dataTables-example_length">
                                                  <label htmlFor={ 'show'}> Show
                                        <select
                                         onChange={(e)=>alert(e.target.value)}
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

                                      </div>

                                      <div className="row">
                                          <div className="col-sm-12">
                                              <table className="table table-striped table-bordered table-hover dataTable no-footer" id="dataTables-example" role="grid" aria-describedby="dataTables-example_info">
                                                  <thead>
                                                      <tr role="row">
                                                          <th  style={{ width: 265 }} >
                                                              Status
                                                          </th>
                                                          <th style={{ width: 321 }} >
                                                              Proposal
                                                          </th>
                                                          <th   >
                                                              Vendor
                                                          </th>
                                                          <th  >
                                                              Due Date
                                                          </th>
                                                          <th   >
                                                              View
                                                          </th>
                                                      </tr>
                                                  </thead>
                                                  <tbody>
                                                      { this.state.tasks.map( function(task,index) { return(
                                                      <tr key={index} className="gradeA odd" role="row">
                                                          <td className="sorting_1"><a id={task.templateId} href="#">{task.status}</a></td>
                                                          <td>{task.proposal.name}</td>
                                                          <td>{task.vendor.name+" "+task.vendor.domain}</td>
                                                          <td>{task.due_date}</td>
                                                          <td>
                                                              <Button onClick={()=>this.onTaskOpened(task.proposal._id,task.templateId,task._id,task.status,task.vendor)}>View</Button>
                                                          </td>
                                                      </tr>) },this)}

                                                  </tbody>
                                              </table>
                                          </div>
                                      </div>
                                      <div className="row">
                                          <div className="col-sm-6">
                                              <div className="dataTables_info" id="dataTables-example_info" role="status" aria-live="polite">
                                                  Showing 1 to 10 of 57 entries
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                          </div>
                      </Panel>
                  </div>
              </div>
          </div>)
    }
  }  

export default EvaluatorPage;