import React, {  Component } from 'react';
import {
    Button,   
    ButtonToolbar, ToggleButton,
    ToggleButtonGroup
} from 'react-bootstrap';
import Fields from "./fields"

export default class QA extends Component {
    constructor(props) {
        super(props)

            this.onSubmit = this.onSubmit.bind(this)
            this.fields={}
    }


    onSubmit = function () {
        debugger
        let fields=[]    
        for(var f in this.refs){
            fields.push(this.refs[f].field)
        }        
        this.field=Object.assign({},fields)     
        this.props.onSubmit(this.field) 
        
    }.bind(this)
    
    onSave = function(){
        debugger
        let fields=[]    
        for(var f in this.refs){
            fields.push(this.refs[f].field)
        }        
        this.field=Object.assign({},fields)     
        this.props.onSave(this.field) 
    }.bind(this)       
    render() {
        debugger
        const  fields  = this.props.fields
        return (
            <div style={{ marginTop: "25px" }}>
                {
                    fields.map((f, index) => {
                        return (
                            <div style={{ marginBottom: "10px", marginTop: "10px" }} key={index}>
                                <div className="row">
                                    <div style={{ marginBottom: "5px" }} className="col-lg-9 ">{f.field}</div>
                                </div>
                                <div className="row">
                                    <div style={{ marginBottom: "5px" }} className="col-lg-9 ">{f.description}</div>
                                </div>
                                <div className="row">
                                    
                                        <Fields ref={"field"+index} id={index} prevAns={this.props.fields[index].ans} result={this.props.result}/>                                    
                                </div>
                            </div>
                        )

                    })
                }
                <div >
                    <Button style={{marginLeft:"5%"}} onClick={this.onSave} bsStyle="primary">Save</Button>{" "}
                    <Button  onClick={this.onSubmit} bsStyle="primary">Submit</Button>
                </div>
            </div>
        )
    }
}


