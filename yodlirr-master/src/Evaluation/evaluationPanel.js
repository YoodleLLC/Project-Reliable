
import React, {  Component } from 'react';
import {
    Panel,
  Button,
  PageHeader,
 } from 'react-bootstrap';
import FormControlFeedback from 'react-bootstrap/lib/FormControlFeedback';
import FormControlStatic from 'react-bootstrap/lib/FormControlStatic';

import EvaluationPanel from './childComponents/evaluationPanel';
import SubmittedPanel from './childComponents/submittedPanel';
import sData from '../components/common/staticData';
import postData from '../components/common/common';

class EvaluatorPanel extends Component{

    constructor(props){
        super(props);
        this.state={
            
        };

        this.onBackClicked=function(){
            this.props.onBackedClicked();
        }.bind(this)
    }


    
    render(){
        const ViewPanel=(props)=>{
          if(props.taskStatus!=sData.Task_Status.submitted){
            return (<EvaluationPanel  {...props}/>)
          }else{
            return <SubmittedPanel {...props}/>
          }
        }
        return(
                <div style={{paddingLeft: '20px',paddingRight: '20px'}}>
                    <div className="row">
                        <div className="col-lg-12">
                            <PageHeader>Evaluator</PageHeader>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div classname="row" style={{paddingBottom:"20px"}}>
                                <Button onClick={this.onBackClicked}  bsStyle="primary">Back</Button>
                            </div>
                            <div>
                                <Panel header={<span>Evaluate</span>} >
                                    <ViewPanel {...this.props}/>
                                </Panel>
                            </div>
                        </div>
                    </div>
                </div>
             )
    }

}

export default EvaluatorPanel;