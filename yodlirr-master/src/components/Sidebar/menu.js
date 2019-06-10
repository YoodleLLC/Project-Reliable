import React, { Component } from 'react';
import styles from './sideBarMenu.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MySvg from "./mySvg"


export default class Menu extends Component{

    constructor(props){
        super(props)
        this.state={
            openClose:'+',
            open:true
        }

        if(this.props.subMenu.length>0){
            this.setState({
                openClose:""
            })
        }

        this.open=function(e){
            debugger
         
            if(this.refs.slider !=undefined){
                this.refs.slider.classList.toggle('closed')
                if(this.state.open){
                    this.setState({
                        openClose:'-',
                        open:false
                    })
                }else{
                this.setState({
                    openClose:'+',
                    open:true
                })
            }          
           }           
    }.bind(this)

   
    
    }

        componentDidMount(){
            if(this.props.subMenu != undefined && this.props.subMenu.length>0){
                const {svg,subMenu} =this.props
            }else{
                const {svg}=this.props
                const subMenu=[]
                this.setState({
                    openClose:""
                })
        }
    }

    render(){                
        const {svg,subMenu} =this.props
        return(
             
        <div  style={{color:"white",listStyleType:"none",padding:"10px"}}>
            <div onClick={this.open}>
                <MySvg title={svg.title} type={svg.type}/>
                <span className="pull-right" style={{fontSize:"25px"}} >{this.state.openClose}</span>
            </div>           
                <ul ref="slider"  className="slider closed" style={{color:"white",listStyleType:"none"}}>
                    {
                        subMenu.map((s,index)=>{                           
                            return (<li key={index}><Link style={{color: "aliceblue",fontSize:"16px", fontFamily:"verdana"}} to={s.to} >{s.name}</Link></li>)                        
                        })                                           
                    }                 
                </ul>
        </div>
    )}
}
