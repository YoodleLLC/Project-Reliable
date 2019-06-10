
import React, { PropTypes, Component } from 'react';
import {
  Panel,
  Button,
  Col,
  PageHeader,
  ControlLabel,
  FormControl,
  HelpBlock,
  FormGroup,
  Checkbox,
  Form,
  Radio,
  InputGroup,
  Glyphicon } from 'react-bootstrap';

import FormControlFeedback from 'react-bootstrap/lib/FormControlFeedback';
import FormControlStatic from 'react-bootstrap/lib/FormControlStatic';
import InputGroupAddon from 'react-bootstrap/lib/InputGroupAddon';
import proposal from './components/Proposal/proposal';
import sData from './components/common/staticData';


class EvaluatorPage extends Component{

    constructor(props){
        super(props);

      
        this.state={
            proposal:{proposalId:""},
            currentSectionId:0,
            currentFieldId:0,
            proposalId:"",
            numberOfFields:1,
            numberOfSections:1,
            leftVisibility:"hidden",
            rightVisibility:"",
            tasks:[],
            savedResponses:{},
            savedFields:[]
        };

       

        this.getPossibleAnswers=function(evaluationCriteria,possibleAnswers){
         
          var result=[" "];
            if(evaluationCriteria === "Nominal"){
              possibleAnswers= possibleAnswers.split(",");
            }
            else{              
              possibleAnswers= possibleAnswers.split("-");
            }      
            return result.concat(possibleAnswers);         
        };

        this.getNext=function(){
         
          let numberOfFields=this.state.proposal.sections[this.state.currentSectionId].fields.length;
          let numberOfSections=this.state.proposal.sections.length;
          
           
              let currentFieldId=this.state.currentFieldId+1;
              if(numberOfFields<=currentFieldId+1 && numberOfSections == this.state.currentSectionId+1){
                this.setState({                  
                  rightVisibility:"hidden",
                  currentFieldId:currentFieldId, 
                });
              }
              else{
                this.setState({                  
                  leftVisibility:"",
                  currentFieldId:currentFieldId, 
                });
              }
                                        
                debugger;
          if(numberOfSections >= this.state.currentSectionId+1 && numberOfFields<=currentFieldId){
              let currentSectionId=this.state.currentSectionId+1;
              let numberOfFields=this.state.proposal.sections[currentSectionId].fields.length;  
              if(numberOfSections>currentSectionId){
                this.setState({
                  rightVisibility:currentSectionId<numberOfFields?"":"hidden",
                  currentFieldId:0,
                  currentSectionId:currentSectionId,
                  leftVisibility:""
                });                
              }                        
            }

            
        }.bind(this);

        this.getPrev=function(){
          debugger;        
          let numberOfFields=this.state.proposal.sections[this.state.currentSectionId].fields.length;
          let numberOfSections=this.state.proposal.sections.length;
          
           
              let currentFieldId=this.state.currentFieldId-1;
              
              if(currentFieldId<=0){
                this.setState({                  
                  leftVisibility:"hidden",
                  currentFieldId:0,                 
                });
              }
              else{
                this.setState({                  
                  rightVisibility:"",
                  currentFieldId:currentFieldId
                });

              }                                                    
              if(numberOfSections >= this.state.currentSectionId+1 && currentFieldId<0){
                let currentSectionId=this.state.currentSectionId-1;  
                let currentFieldId=this.state.proposal.sections[currentSectionId].fields.length-1;            
                if(numberOfSections>currentSectionId){
                  this.setState({
                    leftVisibility:"",
                    rightVisibility:currentFieldId>0? "":"hidden",
                    currentFieldId:currentFieldId,
                    currentSectionId:currentSectionId>0?currentSectionId:0,
                  });                
                }                        
              }
             
        }.bind(this);

        this.onAnswerChange=function(e){
          debugger;
          let proposal=this.state.proposal;

          this.state.proposal.sections[this.state.currentSectionId].fields[this.state.currentFieldId].answer=e.target.value;
          
          let field={}
          let savedFields= this.state.savedFields;
          
          let index=savedFields.findIndex(sf=>sf._id==this.state.proposal.sections[this.state.currentSectionId].fields[this.state.currentFieldId]._id)
          
          if(index<0){
              field._id=this.state.proposal.sections[this.state.currentSectionId].fields[this.state.currentFieldId]._id;
              field.answer=e.target.value;        
              savedFields.push(field);
          }else{
            savedFields[index].answer=e.target.value;
          }
          this.setState({
              proposal:proposal,
              savedFields:savedFields,
          });
        }.bind(this);


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
         
          this.onTaskOpened=function(templateId,taskId){
            debugger;
            fetch(sData.URL.templates.get_template+templateId).
            then(r=>r.json()).
            then(res=>this.fetchCallback(res[0],taskId))
          }.bind(this);
            
          this.fetchCallback=function(proposal,taskId){
            debugger;
            fetch(sData.URL.evauation.get_savedresponse).
            then(r=>r.json()).
            then(res=>{
              let savedResponses={}              

              if(res!=undefined && res.length>0){                           
                savedResponses=res[0];                
                debugger;
                savedResponses.fields.forEach(s=>{
                 proposal.sections.forEach(sec=>{sec.fields.some(f=>{
                   if (f._id==s._id){
                    f.answer=s.answer
                    return true
                   }                                     
                 })                  
                })
              })                                    
            }
            else{
              savedResponses.taskId=taskId;  
              savedResponses.proposal={_id:proposal._id,name:proposal.name}                        
            } 
              this.setState({
                proposal:proposal,
                savedResponses:savedResponses,
                savedFields:savedResponses.fields != undefined ? savedResponses.fields : []
            });
            })        
        }

   
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

          this.onSave=function(){                
            let savedResponses=this.state.savedResponses;
            savedResponses.fields=this.state.savedFields;
            debugger;
            const headers=new Headers();
            headers.append('Content-Type', 'application/json');      
            const options={
              method: 'POST',
              headers,
              body:JSON.stringify({savedResponses:savedResponses})
            };            
            const request=new Request(sData.URL.evauation.save_response,options);
            const response= fetch(request);  
          }.bind(this);

          this.onSubmit=function(){                
           
          }.bind(this);

          this.componentDidMount=function(){
            debugger;
       
             fetch(sData.URL.task.evaluator_task)
             .then(response => response.json())
             .then(response => {      
               debugger;
               this.setState({tasks:response })
             }).catch(err=>alert(err)); 
           }
    }


    
    render(){
        
        class EvaluationPanel extends Component{
            constructor(props){
                super(props);

              
               
            }
            render(){
                debugger;
                 
                const {proposal,proposalId,currentSectionId,leftVisibility,rightVisibility,currentFieldId}=this.props.parent.state;
                const {parent}=this.props;

             
                if(proposal.proposalId=="")
                {
                    return null;
                }
                else
                {
                    return( 
                    <div className="col-lg-6">
                      <div className="row">
                    
                        <Form>                      
                        <FormGroup controlId="proposal">
                            <ControlLabel>Proposal: {proposal.name}</ControlLabel>                                              
                            <FormControlFeedback />
                        </FormGroup>  
            
                        <FormGroup controlId="section">
                            <ControlLabel>Section: {proposal.sections[currentSectionId].sectionName}</ControlLabel>                                              
                            <FormControlFeedback />
                        </FormGroup> 


                        <FormGroup controlId="question">
                            <ControlLabel>Question {proposal.sections[currentSectionId].fields[currentFieldId].field}</ControlLabel>                                              
                            <FormControlFeedback />
                        </FormGroup> 

                     
                        <FormGroup controlId="answer">
                           <ControlLabel>Select Your Response </ControlLabel> 
                           <FormControl className="col-md-3" componentClass="select" value={proposal.sections[currentSectionId].fields[currentFieldId].answer}  onChange={this.props.parent.onAnswerChange} placeholder="Select Response">
                               {
                                this.props.parent.getPossibleAnswers(proposal.sections[currentSectionId].fields[currentFieldId].evaluationCriteria,proposal.sections[currentSectionId].fields[currentFieldId].possibleAnswers).map((ans,index)=>{
                                  return(<option  value={ans} key={index}>{ans}</option>)
                                })
                               }
                                                                
                            </FormControl>          
                            <FormControlFeedback />
                        </FormGroup> 
                        </Form>
                        
                        <div style={{paddingTop:"20px"}}>
                            <Button bsStyle='primary' onClick={this.props.parent.onSave}>Save</Button>{' '}
                            <Button bsStyle='danger' onClick={this.onSubmit}>Submit</Button>                        
                        </div>
                  <div  style={{paddingTop:"10px",paddingBottom:"10px"}}>
                      <div className="col-lg-10">
                        
                            <Button bsStyle='danger' className={leftVisibility} onClick={this.props.parent.getPrev}><span class="glyphicon glyphicon-arrow-left"></span></Button>
                           
                        
                        </div>
                        <div className="col-lg-2 clearfix pull-right">
                        <FormGroup controlId="formBasicText2">
                            <Button bsStyle='primary' className={rightVisibility} onClick={this.props.parent.getNext}><span class="glyphicon glyphicon-arrow-right"></span></Button>{' '}
                            <FormControlFeedback/>
                        </FormGroup>
                      </div>
                    </div>
                  
                    </div>
                    </div>
                )
            }
        }
     }
       
        
        return(
        <div style={{paddingLeft:'20px',paddingRight:'20px'}}>
            <div className="row">
              <div className="col-lg-12">
                <PageHeader>Tasks</PageHeader>
              </div>
            </div>
      
            <div className="row">
              <div className="col-lg-6">
                <Panel header={<span>View Proposal</span>} >
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
                            onClick={this.onTaskClicked}
                          >
                          Status
                          </th>
                          <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="dataTables-example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Browser: activate to sort column ascending"
                            style={{ width: 321 }}
                            onClick={this.onProposalClicked}
                          >
                          Proposal
                          </th>
                          <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="dataTables-example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Platform(s): activate to sort column ascending"
                            style={{ width: 299 }}
                            onClick={this.onEveluatorClicked}
                          >
                         Tasks
                          </th>
                          <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="dataTables-example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Engine version: activate to sort column ascending"
                            style={{ width: 231 }}
                            onClick={this.due_date}
                          >
                          Due Date
                          </th>                         
                        </tr>
                      </thead>
                      <tbody>
                      {
                        this.state.tasks.map( function(task,index) {
                          return(
                          <tr  key={index} className="gradeA odd" role="row">
                          <td className="sorting_1"><a id={task.templateId}  href="#">{task.status}</a></td>
                          <td>{task.proposal.name}</td>
                          <td>{task.evaluator.fname+" "+task.evaluator.lname}</td>
                          <td className="center">{task.due_date}</td>  
                          <td><Button onClick={()=>this.onTaskOpened(task.templateId,task._id)}>View</Button></td>
                        </tr>)
                        },this)}

                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div
                      className="dataTables_info"
                      id="dataTables-example_info"
                      role="status"
                      aria-live="polite"
                    >
                      Showing 1 to 10 of 57 entries
                    </div>
                  </div>
                
                
                </div>
              </div>
            </div>
         
          </div>

                </Panel>
              </div>
               
                   <EvaluationPanel parent={this}{...this.props}/>
              </div>
        </div>
             )
    }

}

export default EvaluatorPage;