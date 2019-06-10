
import React, {  Component } from 'react';
import {
  Panel,
  PageHeader} from 'react-bootstrap';
import FormControlFeedback from 'react-bootstrap/lib/FormControlFeedback';
import FormControlStatic from 'react-bootstrap/lib/FormControlStatic';

import sData from '../components/common/staticData';
import postData from '../components/common/common';
import EvaluationPanel from './evaluationPanel';


class TrainingTable extends Component{

    constructor(props){
        
        super(props);
        this.state={       
            isTable:true,
            tasks:[],
            taskId:{},            
            taskStatus:"",  
            trainings:[]         
        };


        this.onTrainingClicked=function(e){
            this.props.setDashBoardChild(sData.trainings.isCalibration,e.target.id)
        }.bind(this)
      
          this.componentDidMount=function(){            
                                         
          }
    }


    
    render(){  
        if(this.props.tasks!=null){
            return(
                <div style={{paddingLeft: '20px',paddingRight: '20px'}}>
                    <div className="row">
                        <div className="col-lg-12">
                            <PageHeader>Trainings</PageHeader>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <Panel header={<span>Training Table</span>} >
                                <div>
                                    <div className="dataTable_wrapper">
                                        <div id="dataTables-example_wrapper" className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                          
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <table className="table table-striped table-bordered table-hover dataTable no-footer"  >
                                                        <thead>
                                                            <tr role="row">
                                                                <th className="sorting_asc" tabIndex="0" aria-controls="dataTables-example" rowSpan="1" colSpan="1" aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" style={{ width: 265 }} onClick={this.onTaskClicked}>
                                                                    Training Name
                                                                </th>                                                         
                                                                <th   onClick={this.onEveluatorClicked}>
                                                                    Assigner
                                                                </th>
                                                                <th  style={{ width: 231 }} onClick={this.due_date}>
                                                                    Due Date
                                                                </th>
                                                                <th  style={{ width: 231 }} onClick={this.due_date}>
                                                                    Status
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>                                                      
                                                            { this.props.tasks.map( function(task,index) { return(
                                                            <tr key={index} className="gradeA odd" role="row">
                                                                <td className="sorting_1"><a id={task.training._id} onClick={this.onTrainingClicked} href="#">{task.training.name}</a></td>                                                          
                                                                <td>{task.assigner}</td>
                                                                <td >{task.due_date}</td>
                                                                <td>
                                                                <div className="progress">
                                                                      <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40"
                                                                      aria-valuemin="0" aria-valuemax="100" style={{width:`${task.perComplete}%`}}>
                                                                          {task.perComplete}% Complete (success)
                                                                      </div>
                                                               </div>
                                                                </td>
                                                            </tr>) },this)}
      
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
                </div>)
          }
          else return null
        }  
        
       
  }  

export default TrainingTable;