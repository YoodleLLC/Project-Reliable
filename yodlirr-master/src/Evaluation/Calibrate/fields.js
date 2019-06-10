import React, {  Component } from 'react';
import {
    Button,   
    ButtonToolbar, ToggleButton,
    ToggleButtonGroup
} from 'react-bootstrap';
import ReactDOM from 'react-dom'

export default class Fields extends Component{
    constructor(props) {
        super(props)
        this.field=this.props.prevAns
        
    }
    
    updateColor = (e) => {        
        let grpBtn = e.target.parentElement
        let childerCount = grpBtn.childElementCount
        for (let i = 0; i < childerCount; i++) {
            grpBtn.children[i].style.backgroundColor = ""
            grpBtn.children[i].style.color = ""
        }
        e.target.style.backgroundColor = "#445111"
        e.target.style.color = "white"

       this.field=Object.assign({},{ id: this.props.id, evalAns: parseInt(e.target.value) })         
    }

    componentDidMount(){        
        let node=ReactDOM.findDOMNode(this.refs.ans)
        let labels=node.getElementsByTagName('label')  
        if(this.props.prevAns!=undefined)    {
            debugger
            labels[this.props.prevAns-1].style.backgroundColor= "#445111"
            labels[this.props.prevAns-1].style.color= "white"            
        }  
       

    }

    render() {
        return (<ButtonToolbar>
            <ToggleButtonGroup ref="ans" type="radio" name="options" >
                {
                    this.props.result.map((pa, index) => {
                        return (<ToggleButton onClick={this.updateColor} key={index} value={index + 1}>{pa}</ToggleButton>                        
                        )
                    })
                }
            </ToggleButtonGroup>
        </ButtonToolbar>)
    }

}