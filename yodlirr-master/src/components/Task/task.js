
import React, {  Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import Pagination from 'react-bootstrap/lib/Pagination';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Well from 'react-bootstrap/lib/Well';
import sData from '../common/staticData';
import postData from '../common/common';

const title = 'Tasks';

class Task extends Component {
  constructor(props, context){
    super(props, context);
   
    this.state={
      data:[],
      pagination:{}
    }

    this.onTaskClicked=function(){
      this.state.data.sort(function(d1,d2){
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
      this.setState({data:this.state.data });
    }.bind(this);
   
    
    this.onProposalClicked=function(){
      this.state.data.sort(function(d1,d2){
          if(d1.proposal<d2.proposal){
            return -1;
          }
          if(d1.proposal>d2.proposal){
            return 1;
          }
          if(d1.proposal==d2.proposal){
            return 0;
          }        
      });
      this.setState({data:this.state.data });
    }.bind(this);
   
    this.onEveluatorClicked=function(){
      this.state.data.sort(function(d1,d2){
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
      this.setState({data:this.state.data });
    }.bind(this);
   
    this.onDueDateClicked=function(){
      this.state.data.sort(function(d1,d2){
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
      this.setState({data:this.state.data });
    }.bind(this);
    
    this.onPublish=function(taskId){

      debugger;
      let body=JSON.stringify({taskId,status:sData.Task_Status.published}) 
      postData(sData.URL.task.publish_task,body)
      .then(res=>res.json()
      .then(res=>{
        debugger
        if(res.status=="200" && res.statusText=="OK"){
          alert("Task has been published")
          window.location.reload();
        }
      }))
      
      window.location.reload();
    }.bind(this)
   
  }
 
  componentDidMount(){
    debugger;
    fetch(sData.URL.task.all_task,{ credentials: 'include'})
    .then(response => response.json())
    .then(response => {   
      debugger;   
            
      this.setState({data:response })
    }).catch(err=>alert(err)); 
  }

  render(){

    const Publish=(props)=>{
        if(props.status==sData.Task_Status.unpublished){
          return (<Button bsStyle="success" onClick={()=>this.onPublish(props.taskId)} >Publish</Button>)
        }
        else{
          return <span>{props.status}</span>
        }
    }

  return (
    <div>
      <div className="col-lg-12">
        <PageHeader>TASKS</PageHeader>
      </div>

      <div className="col-lg-12">
        <Panel header={<span>Task</span>} >
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
                        {
                          [10,25,50,100].map(n=>{
                            return <option value={n}>{n}</option>
                          })
                        }
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
                         Evaluator
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
                        this.state.data.map(function (d,index) {
                          return(
                          <tr key={index} className="gradeA odd" role="row">
                          <td className="sorting_1" ><Publish taskId={d._id} status={d.status}/></td>
                          <td>{d.proposal.name}</td>
                          <td>{d.evaluator.fname +" " +d.evaluator.lname }</td>
                          <td className="center">{d.due_date}</td>  
                        </tr>)
                        })}

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
                  <div className="col-sm-6 pullRight " >
                    <Pagination
                      activePage={1}
                      items={6}
                      first
                      last
                      prev
                      next
                      onSelect={() => {
                        // function for Pagination
                      }}
                    />
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




export default Task;


