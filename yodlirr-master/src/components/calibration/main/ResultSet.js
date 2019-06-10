import React, {
    
    Component
} from 'react';
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
import Dialog from "../../common/dialog/dialog"
import FormControlFeedback from 'react-bootstrap/lib/FormControlFeedback';
import FormControlStatic from 'react-bootstrap/lib/FormControlStatic';
import ReactDOM from "react-dom"
import staticData from '../../common/staticData';
import postData from '../../common/common';

const warning="Result Should contain only characters"
const resultRx=new RegExp("^[A-Za-z ]{1,20}")
export default class ResultSet extends Component {
    constructor(props) {
        super(props)
 
        this.state = {          
            results:this.props.results.length>0?this.props.results:[""],
            totalResults:this.props.results.length>0?this.props.results.length:0
        }

       
    }

    componentDidMount(){
       
        for(var r in this.refs){
            debugger
            
                const node=ReactDOM.findDOMNode(this.refs[r])  
                node.classList.remove("has-error") 
                node.style.visibility="hidden" 
        }
        
    
        
    }

    onNewResult=()=>{
        let results=this.state.results
        results.push("")
        this.setState(results)
    }

    onResultChanged=function(e){
        debugger
        let result=e.target.value.trim()      
        let results=this.state.results
            results[e.target.id]=result
            this.setState({results})
    }.bind(this)


    onResultBlur=function(e){
        debugger
        let result=e.target.value.trim()      
        if(resultRx.test(result)){
            let results=this.state.results
            results[e.target.id]=result
            this.setState({results,
            totalResults:this.state.totalResults+1})   
            e.target.parentElement.classList.remove("has-error") 
            e.target.parentElement.nextElementSibling.style.visibility="hidden"        
        }
        else{
            e.target.parentElement.classList.add("has-error") 
            e.target.parentElement.nextElementSibling.style.visibility=""
        }      
    }.bind(this)

   
    

    render() {
        return (
            <FormGroup ControlId="field" >
                <ControlLabel>Result Set</ControlLabel>
                {
                    this.state.results.map((r,index) => {                        
                        return( 
                            <div>
                            <div key={r.id} className="input-group">
                        <span className="input-group-addon" id="basic-addon1">{index+1}</span>
                        <input id={index} type="text" value={this.state.results[index]} className="form-control" onChange={this.onResultChanged} placeholder="Result e.g. avarage,good" aria-describedby="basic-addon1" onBlur={this.onResultBlur}/>
                        <span className="input-group-addon" id="basic-addon1" onClick={this.onNewResult}>+</span>                                                                
                        </div>
                        <FormControlFeedback />
                        <HelpBlock ref={index} style={{color:"red",visibility:""}}>{warning}</HelpBlock>
                    </div>
                    )
                })
                }
                          

            </FormGroup>
        )
    }

}