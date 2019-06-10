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
import sData from "../../common/staticData";
import postData from '../../common/common';


export default class AttachEvaluator extends Component{

    constructor(props){
        super(props);

        this.state={
            selectedtraining:{},
            selectedEvaluatorsToRemove:[],
            selectedEvaluatorsToAdd:[],
            isSelected:[],
            name:"",
            selectedEvaluators:[],           
            trainings:[],
            remove:[],
            add:[],
            remove:[],
            trainingEvaluators:[],
            nontrainingEvaluators:[],
            allEvaluators:[]
        };

        this.intersection=function(arr1,arr2){
            let result=[]
            arr1.sort()
            arr2.sort()
            let iIndex=0;
            let oIndex=0;
            let len2=arr2.length-1
            let len1=arr1.length-1
            while(oIndex<= len2){
                if(iIndex<=len1 && arr1[iIndex]._id==arr2[oIndex]._id){
                    iIndex++;
                    oIndex++;
                }else {
                    result.push(arr2[oIndex])
                    oIndex++
                }
            }
            return result;
        }

        this.selectEvaluators=function(training){
           
            debugger;
            if(training.evaluators!=undefined && training.evaluators.length>0){
                let selectedEvaluators=this.state.allEvaluators.filter(v=>{
                   return !training.evaluators.some(p=>p._id==v._id);
                });
                this.setState({
                    nontrainingEvaluators:selectedEvaluators,
                    trainingEvaluators:training.evaluators,                    
                })
              
            }else{                
                this.setState({
                    nontrainingEvaluators:this.state.allEvaluators,    
                    trainingEvaluators:[]                
                });
            }
        }.bind(this); 
        

        this.trainingChanged=function(e){      
            debugger;          
            this.setState({
                selectedtraining:e.target.value,
                selectedEvaluatorsToRemove:[],
                selectedEvaluatorsToAdd:[],
                selectedEvaluators:[]
            });

            debugger;
            let training=this.state.trainings.find(p=>p._id==e.target.value);
            this.selectEvaluators(training);           
        }.bind(this);
      
        this.onEvaluatorselectedToAdd=function(e){
            this.setState({
                selectedEvaluatorsToAdd:[]
            })
            var options = e.target.options;
            var value = [];
            for (var i = 0, l = options.length; i < l; i++) {
              if (options[i].selected) {
                value.push(options[i].value);
              }
            }
            let  vArr=[]            
            value.forEach(id=>{
                let index=this.state.allEvaluators.findIndex(v=>{
                    return v._id==id
                })
                vArr.push(this.state.allEvaluators[index])
            })
            this.setState({
                selectedEvaluatorsToAdd:vArr
            })
        }.bind(this);

        
        this.onEvaluatorselectedToRemove=function(e){
            this.setState({
                selectedEvaluatorsToRemove:[]
            })
            var options = e.target.options;
            var value = [];
            for (var i = 0, l = options.length; i < l; i++) {
              if (options[i].selected) {
                value.push(options[i].value);
              }
            }
            let  vArr=[]            
            value.forEach(id=>{
                let index=this.state.allEvaluators.findIndex(v=>{
                    return v._id==id
                })
                vArr.push(this.state.allEvaluators[index])
            })
            this.setState({
                selectedEvaluatorsToRemove:vArr
            })
        }.bind(this);

        
        this.onEvaluatorsRemoved=function(e){

            debugger;
            if(this.state.selectedEvaluatorsToRemove.length>0 ){
                let allEvaluators=this.state.allEvaluators
                let  nontrainingEvaluators=this.state.nontrainingEvaluators
                nontrainingEvaluators=nontrainingEvaluators.concat(this.state.selectedEvaluatorsToRemove)

                let trainingEvaluators=[];
                
                trainingEvaluators=this.intersection(this.state.selectedEvaluatorsToRemove,this.state.trainingEvaluators)


                this.setState({
                    nontrainingEvaluators:nontrainingEvaluators,
                    trainingEvaluators:trainingEvaluators,
                    selectedEvaluatorsToRemove:[],
                    selectedEvaluatorsToAdd:[]
                });                            
            }
        }.bind(this);

        this.onEvaluatorsAdded=function(e){
            debugger;           
            if(this.state.selectedEvaluatorsToAdd.length>0){
                let allEvaluators=this.state.allEvaluators
                let  trainingEvaluators=this.state.trainingEvaluators
                trainingEvaluators=trainingEvaluators.concat(this.state.selectedEvaluatorsToAdd)

                let np=[];

                

                np=this.intersection(this.state.selectedEvaluatorsToAdd,this.state.nontrainingEvaluators)

                this.setState({
                    nontrainingEvaluators:np,
                    trainingEvaluators:trainingEvaluators,
                    selectedEvaluatorsToRemove:[],
                    selectedEvaluatorsToAdd:[]
                });                               
            }            
        }.bind(this);

        this.onAttachEvaluators=function(){
            debugger;        
            let index=this.state.trainings.findIndex(t=>{
                return t._id==this.state.selectedtraining
            })           
            let tempTraining=this.state.trainings[index]              
            let training={}
            training._id=tempTraining._id
            training.name=tempTraining.name
            training.due_date=tempTraining.due_date
            training.evaluators=this.state.trainingEvaluators;
            
            let body=JSON.stringify({training})
                     
            postData(sData.URL.training.attach_Evaluators,body)
            .then(res=>res.json()).then(res => {
                alert("evaluators attach successfully")
                window.location.reload();})
            .catch(err =>{
              console.log(err)
              alert("evaluators attach successfully")
              window.location.reload();
            });
            window.location.reload();
        }.bind(this);

        this.componentDidMount=function(){
           this.getEvaluators();
           this.gettrainings();   
        };

        this.getEvaluators=function(){
            fetch(sData.URL.users.getevaluators,{ credentials: 'include'})
            .then(response => response.json())
            .then(allEvaluators => {            
                debugger;
                this.setState({
                    allEvaluators
                })                                       
            }).catch(err=>alert(err));
        }
        


        this.gettrainings=function(){
            fetch(sData.URL.training.get,{ credentials: 'include'})
            .then(response => response.json())
            .then(trainings => {
                trainings.unshift({_id:"",name:"Select"});
               this.setState({trainings:trainings});
            }).catch(err=>alert(err));
        }      
}
    render(){
        return (
            <div>
            <div className="row">
              <div className="col-lg-12">
                <PageHeader>Attach evaluators</PageHeader>
              </div>
            </div>
      
            <div className="row">
              <div className="col-lg-12">
                <Panel header={<span>Attach evaluators</span>} >
                  <div className="row">
                    <div className="col-lg-6">
                      <Form>                     
                        <FormGroup controlId="trainingSelection">
                          <ControlLabel>trainings</ControlLabel>
                          <FormControl componentClass="select" onChange={this.trainingChanged} placeholder="Select">
                          {
                             this.state.trainings.map((training,index)=>{
                              return(<option  value={training._id} key={index}>{training.name}</option>)
                             })
                          }                           
                          </FormControl>                   
                          <FormControlFeedback />
                        </FormGroup>                                                                              
                        <FormGroup controlId="formBasicText2">
                            <ControlLabel>evaluators</ControlLabel>                   
                            <FormControl componentClass="select" onChange={this.onEvaluatorselectedToRemove} multiple placeholder="Select evaluators" style={{height:"200px"}}>
                                 {                                   
                                     this.state.trainingEvaluators
                                     .map((evaluators,index)=>{
                                        debugger
                                     return(<option value={evaluators._id} key={index}>{evaluators.lname}{","}{evaluators.fname}</option>)
                                    })
                                  }                           
                            </FormControl>                                    
                        </FormGroup>
                        <FormGroup controlId="formBasicText2">
                            <Button bsStyle="primary" onClick={this.onAttachEvaluators}> Attach {this.props.keywords.evaluators}</Button>
                            <Button onClick={this.onEvaluatorsRemoved} style={{float:"right"}} >Remove {this.props.keywords.evaluators}</Button> 
                            
                        </FormGroup>                        
                      </Form>
                    </div>
                    <div className="col-lg-6">
                    <Form>
                    <FormGroup controlId="evaluators Selection">
                                  <ControlLabel>Add evaluators</ControlLabel>
                                  <FormControl componentClass="select" onChange={this.onEvaluatorselectedToAdd} multiple placeholder="Select" style={{height:"400px"}}>
                                 {                                   
                                     this.state.nontrainingEvaluators
                                     .map((evaluators,index)=>{
                                         debugger
                                      return(<option value={evaluators._id} key={index}>{evaluators.lname}{","}{evaluators.fname}</option>)
                                     })
                                  }                                                           
                                  </FormControl>                   
                        <FormControlFeedback />
                      </FormGroup>          
                      <Button onClick={this.onEvaluatorsAdded}>Add evaluators</Button> 
                    </Form>
                    </div>
                  </div>
                </Panel>
              </div>             
            </div> 
          </div>
        );
      }
}