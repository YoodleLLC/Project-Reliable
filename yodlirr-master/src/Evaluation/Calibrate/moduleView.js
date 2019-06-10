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
import RView from "./review";



class ModuleView extends Component {

    constructor(props) {
        super(props)
            
        this.onBackBtnClicked = function () {
            this.props.setDashBoardChild(sData.trainings.isTraining)
        }.bind(this)

    }
   
    onSubmit=(fields)=>this.props.onSubmit(fields)
    onSave=(fields)=>this.props.onSave(fields)

    render() {
        const ReTake=()=>{
            if(this.state.passed){
                return(<Button onClick={this.onRetake}>Retake</Button>)
            }else{
                null
            }            
        }
        const PageView = (props)=> {
            debugger
            console.log(this.props)
            if (this.props.view==sData.views.ReviewView) {
                
                const _module = this.props._module
                const result=_module.result               
              
                _module.fields=_module.fields.map((f,i)=>{  

                    f.expectedAns=result[f.expectedAns-1]
                    f.ans=result[f.ans-1]
                    f.field=_module.fields[i].field                    
                    f.description= _module.fields[i].description
                    f.explaintion= "Sample explaintaion",
                    f.correct=f.expectedAns==f.ans?true:false

                    return f
                })            
                return(<div>
                    <RView onRetake={this.props.onRetake} review={_module} />                  
                    </div>) 
                


            } else {
                if(this.props._module!==undefined){
                    const _module = this.props._module                    
                    _module.description == undefined ? "" : _module.description                       
                    debugger               
                    return (
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-6 "><h3>{_module.description}</h3></div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 ">
                                    <VideoPlayer src={_module.video} />
                                </div>
            
                            </div>
                            <QA  onSave={this.onSave} onSubmit={this.onSubmit} fields={_module.fields} result={_module.result}/>
                            {/* <div className="row" style={{ marginBottom: "10px" }}>
                                <Previous isVisible={this.state.previousVisibility} previousModuleClicked={this.previousModuleClicked} />
                                <Next isVisible={this.state.nextVisibility} nextModuleClicked={this.nextModuleClicked} />
                            </div> */}
                        </div>
                    )
                }
               else return null
            }
        }       
        return <PageView />
    }
}




// const Next = (props) => {
//     if (props.isVisible) {
//         return <div className="col-lg-push-7 col-lg-1" style={{ marginTop: "20px" }}><Button onClick={props.nextModuleClicked} bsStyle="primary">Next Module</Button></div>
//     } else {
//         return <div className="col-lg-push-7 col-lg-1" style={{ marginTop: "20px" }}></div>
//     }
// }
export default ModuleView



