import React, {  Component } from 'react';
import {
    Button
} from 'react-bootstrap';
import Fields from "./fields"

const Summary=(props)=>{

    const {fields}=this.props

    return(
        <div style={{ marginTop: "25px" }}>
        {
            fields.map((f, index) => {
                return (
                    <div style={{ marginBottom: "10px", marginTop: "10px" }} key={index}>
                        <div className="row">
                            <div style={{ marginBottom: "5px" }} className="col-lg-6 col-lg-push-3">{f.field}</div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-lg-push-3">
                                <Fields ref={"field"+f.id} id={f.id} possibleAns={f.possibleAns} />
                            </div>
                        </div>
                    </div>
                )

            })
        }
        <Retake/>
    </div>

    )
}

const Retake=()=>{

    return(<div >
                <Button style={{marginLeft:"50%"}} onClick={this.onSave} bsStyle="primary">Retake</Button>{" "}        
            </div>)
}

export default Summary 