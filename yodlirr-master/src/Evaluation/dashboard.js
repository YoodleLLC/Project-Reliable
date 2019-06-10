
import React, {  Component } from 'react';
import {
  Panel,
  Button, 
  PageHeader,
  } from 'react-bootstrap';
import sData from '../components/common/staticData';
import postData from '../components/common/common';
import Calibrate from "./Calibrate/calibrate";
import EvaluationPanel from './evaluationPanel';
import EvaluatorTable from './EvaluatorPage';
import Training from './Training';

export default class EvaluatorPage extends Component{

    constructor(props){
        super(props);
        this.state={       
            isTable:true,  
            taskId:"", 
            taskStatus:"",   
            templateID:"",         
            proposalId:"",
            dashBoardChild:sData.trainings.isTraining,
            trainingId:"",
            tasks:null
        };
        
        this.onTaskOpened=function(proposalId,templateID,taskId,taskStatus,vendor){           
            this.setState({
                templateID,
                taskId,
                taskStatus,
                vendor:vendor,
                proposalId,
                isTable:false,                                
            })
        }.bind(this)

        this.onBackedClicked=function(){
            this.setState({
                isTable:true
            })
        }.bind(this)

        this.setDashBoardChild=function(dashBoardChild,id){
            this.setState({
                dashBoardChild,
                trainingId:id
            })
        }.bind(this)
        
    }

    onBackBtnClicked=function(){
        this.setState({
            dashBoardChild:sData.trainings.isTable
        })       
    }.bind(this)

    componentDidMount=function(){
        fetch(sData.URL.training.get_tasks_user,{credentials:"include"}).then(d=>
            d.json()
        ).then(tasks=>{                                               
            let counter=tasks.length              
            tasks.forEach(t=>{
                if(t.perComplete!==100){                                                        
                    this.setState({
                        dashBoardChild:sData.trainings.isTraining, 
                        tasks                       
                    })                      
                   counter ++
                }
            })            
            if(counter==tasks.length){
                this.setState({
                    dashBoardChild:sData.trainings.isTask, 
                    tasks:null             
                })  
            }                               
        }) 
    }

    render(){
        const TablePanel=()=>{
            if(this.state.isTable===true){
                return ( <EvaluatorTable onTaskOpened={this.onTaskOpened}/>)
            }else{
                return(<EvaluationPanel vendor={this.state.vendor} proposalId={this.state.proposalId} templateID={this.state.templateID} onBackedClicked={this.onBackedClicked} taskId={this.state.taskId} taskStatus={this.state.taskStatus}/>)
            }
        }   
        
        const DashBoardChild=(props)=>{
            if(this.state.dashBoardChild===sData.trainings.isTask){
                return ( <TablePanel {...props}/> )
            }
            else if(this.state.dashBoardChild===sData.trainings.isCalibration){
                return ( 
                    <div>
                        <Button style={{marginTop:"20px",marginLeft:"20px"}} onClick={this.onBackBtnClicked} bsStyle="primary">Back To Trainings</Button>
                        <Calibrate trainingId={this.state.trainingId} setDashBoardChild={this.setDashBoardChild} {...props}/>
                    </div>
                )
           }
            else{
                return (<Training tasks={this.state.tasks} setDashBoardChild={this.setDashBoardChild} {...props}/>)
            }                        
        }
        return(
            <div>
                <DashBoardChild {...this.props}/>
            </div>
        );
    }
}

