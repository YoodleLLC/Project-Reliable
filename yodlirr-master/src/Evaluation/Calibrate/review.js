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
import sData from '../../components/common/staticData';
import postData from "../../components/common/common";
import VideoPlayer from './video';
import QA from './QA'
import "./style.css"

var messages = {}
messages.passed = "Congrats!!! You Passed the module test"
messages.failed = "Better luck next time!! You didn't clear module test this time"

export default class Review extends Component {

    constructor(props) {
        super(props)

        this.state = {
       
        }
        this.onBackBtnClicked = function () {
            this.props.setDashBoardChild(sData.trainings.isTraining)
        }.bind(this)
    }
    onRetake = ()=>this.props.onRetake(sData.views.QAView)
    componentDidMount = function () {
    }

    render() {
        debugger
        const {name,minScore,score,fields} =this.props.review
        return (
            <div className="container-fluid">
                <div className="row">
                    <h3>{name}</h3>
                </div>
                <div className="row">
                    <div className="col-lg-push-3 col-lg-6 "><h3>{minScore<=score?messages.passed:messages.failed}</h3></div>
                </div>
                <div className="row">
                    <div className="col-lg-push-1 col-lg-4 ">
                        Required Score: {minScore+"%"}
                    </div>
                    <div className="col-lg-push-3 col-lg-4 ">
                        Achieved Score: {score+"%"}
                    </div>
                </div>
                {
                    fields.map(f => {
                        return (
                            <div className="container-fluid review"  >
                                <div >
                                   Question: {f.field}                                  
                                </div>
                                <div >
                                   {f.description}
                                </div>
                                <div >
                                    <div className="col-lg-2">Expected Answer:</div>
                                    <div className="col-lg-2">{f.expectedAns}</div>
                                    <div className="col-lg-2">Your Answer:</div>
                                    <div className="col-lg-2">{f.ans}</div>
                                    <div >{f.correct?"Corret":"Wrong"}</div>
                                </div>
                                <div >
                                    {f.explaintion}
                                </div>
                            </div>
                        )
                    })
                }               
            </div>
        )
    }
}



