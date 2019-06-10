
import React, {  Component } from 'react';
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

import FormControlFeedback from 'react-bootstrap/lib/FormControlFeedback';
import FormControlStatic from 'react-bootstrap/lib/FormControlStatic';

import AddEvaluator from './addevaluator';
import evaluator from '../Evaluator/evaluator';
import Proposal from '../Proposal/proposaltable';
import staticData from '../common/staticData';

const URL={
  ViewProposal:"http://localhost:5000/projects/",
  AllProposals:"http://localhost:5000/projects/all",
  GetEvaluators:"http://localhost:5000/projects/evaluators"
}

class ViewProposal extends Component{

    constructor(props){
        super(props)

        this.state={
          projects:[],
          project:{},        
          evaluators:[],
          pOfficer:{},
          isVisible:false,
          className:"col-lg-12"
        };

        this.onNameClicked=function(e){
          debugger;
          fetch(staticData.URL.projects.project+e.target.id,{ credentials: 'include'})
          .then(response => response.json())
          .then(response => {
            debugger;
          this.setState({
            isVisible:true,
            project:response[0],
            evaluators:response[0].evaluators,
            pOfficer:response[0].procurementOfficer,
            className:"col-lg-6"
            
          });          
          }).catch(err=>alert(err));
        }.bind(this);

        this.onUpdateClicked=function(e){
            alert(e.target.name)
        }.bind(this);
    }

    componentDidMount(){

      fetch(URL.AllProposals,{ credentials: 'include'})
      .then(response => response.json())
      .then(response => {
        debugger;
      this.setState({
        projects:response,       
      })
      }).catch(err=>alert(err));
    }

    render(){

      const View=(props)=>{
        debugger;
        if(props.isVisible){

          const {project,evaluators,pOfficer}=props;
          return(<div className="col-lg-6">                              
          <Panel header="Proposal" style={{border: 1}}>                                   
                            <div>                                 
                              <div className="row">                                      
                                  <h3 className="col-lg-6">Proposal Name</h3>
                                  <h3 className="col-lg-6">{project.name}</h3>                                      
                              </div>                                    
                              <div className="row">                                      
                                  <h4 className="col-lg-6">Status</h4>
                                  <h4 className="col-lg-6">{project.status}</h4>                                      
                              </div>
                              <div className="row">                                      
                                  <h4 className="col-lg-6">Due Date</h4>
                                  <h4 className="col-lg-6">{project.due_date}</h4>                                      
                              </div>
                              <div className="row">                                      
                                  <h4 className="col-lg-6">Start Date</h4>
                                  <h4 className="col-lg-6">{project.start_date}</h4>                                      
                              </div>
                              <div className="row">                                      
                                  <h4 className="col-lg-6">Template</h4>
                                  <h4 className="col-lg-6">{project.name}</h4>                                      
                              </div>
                              <div className="row">                                      
                                  <h4 className="col-lg-6">Procurement Officer</h4>
                                  <h4 className="col-lg-6">{pOfficer.fname} </h4>                                      
                              </div> 
                              <div className="row">                                      
                                  <h4 className="col-lg-6">Evaluators</h4>                                     
                              </div>            
                              {
                                evaluators.map((e)=>{
                                  return(
                                    <div className="row">                                      
                                      <h4 className="col-lg-6">Name</h4>
                                      <h4 className="col-lg-6">{e.fname} </h4>                                      
                                    </div> 
                                  )
                                })
                              }                   
                           </div>       
                        </Panel>             
                      </div>)
        }else{
          return null
        }
      }

        return(
        <div>
            <div className="row">
              <div className="col-lg-12">
                <PageHeader>View Proposal</PageHeader>
              </div>
            </div>
      
            <div className="row">
              <div className={this.state.className}>                
                  <table
                      className="table table-striped table-bordered table-hover dataTable no-footer"
                      id="dataTables-example"
                      role="grid"
                      aria-describedby="dataTables-example_info"
                    >
                      <thead>
                        <tr role="row">
                          <th
                            tabIndex="0"
                            aria-controls="dataTables-example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Rendering engine: activate to sort column descending"
                            aria-sort="ascending"                            
                            onClick={this.onNameClicked}
                          >
                          Name
                          </th>                          
                          <th                            
                            tabIndex="0"
                            aria-controls="dataTables-example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Engine version: activate to sort column ascending"
                            
                            onClick={this.onStatusClicked}
                          >
                          Status
                          </th>                         
                          <th
                            
                            tabIndex="0"
                            aria-controls="dataTables-example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Engine version: activate to sort column ascending"                            
                            onClick={this.onStatusClicked}
                          >
                          Update
                          </th>  
                          <th
                            className="col-lg-3"
                            tabIndex="0"
                            aria-controls="dataTables-example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Engine version: activate to sort column ascending"                            
                            onClick={this.onStatusClicked}
                          >
                          Delete
                          </th>                        
                        </tr>
                      </thead>
                      <tbody>
                      {
                        this.state.projects.map( (d,index)=> {
                          return(
                          <tr key={index} className="gradeA odd" role="row">
                          <td className="col-lg-3"><a onClick={this.onNameClicked} id={d._id} name={d.name} >{d.name}</a></td>                        
                          <td className="col-lg-3">{d.status}</td>
                          <td  className="col-lg-3"><Button bsStyle="primary" onClick={this.onUpdateClicked} id={d._id} name={d.name}>Update</Button></td>                        
                          <td  className="col-lg-3"><Button bsStyle="danger" onClick={this.onDeleteClicked} id={d._id} name={d.name}>Delete</Button></td>                        
                        </tr>)
                        })}

                      </tbody>
                    </table>
                  
                  </div>               
                  <View {...this.props} isVisible={this.state.isVisible} project={this.state.project} evaluators={this.state.evaluators} pOfficer={this.state.pOfficer}/>
              </div>
            
          </div>)
    }

}

export default ViewProposal;