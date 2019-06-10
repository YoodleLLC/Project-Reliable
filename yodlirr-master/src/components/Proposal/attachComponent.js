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

import AutoCompleteBox from '../common/autocomplete/autocomplete';
import sData from "../common/staticData";
import postData from '../common/common';
import vendor from '../Vendor/vendor';

var descriptionWarning="Description does not contains special charecter"
var fileWarning="Supported file formats are docx, pdf, txt"
var myValidators={
    isValidFile:false,
    isValidDescription:false,
}
export default class AttachDocument extends Component{

    constructor(props){
        super(props)

            this.state={               
                description:"",
                vendorId:"",
                isValidDescription:true,
                isValidFile:true,
                files:[]
            }

        this.onAttachDocumentsClicked=function(){
            if (this.props.vendorId=="") 
            {
                alert("Select Vendor")
                return
            }
            this.props.onAttachDocumentsClicked(false);
        }.bind(this)

        this.onCancleClicked=()=>{
            this.props.onAttachDocumentsClicked(true);
        }

        this.onFileChange=function(e){
            debugger
            let isValidFile=true
            let len=e.target.files.length
            let fileExt=""
            for (var i = 0; i < len; i++) {
               fileExt= e.target.files[i].name.substr(e.target.files[i].name.lastIndexOf(".")+1)
                if(new RegExp("^(docx|pdf|txt)$").test(fileExt)){
                    isValidFile=true;
                    this.setState({
                        isValidFile
                       })
               }
               else{            
                   isValidFile=false;
                   this.setState({
                       isValidFile
                   })
               }
            }

            if(isValidFile){
               this.setState({
                   files:e.target.files
               })
            }
        }.bind(this)

        this.onDiscriptionBlured=function(e){
          
               if(new RegExp("^[A-z ]*$").test(e.target.value)){
               
                    this.setState({
                        description:e.target.value,
                        isValidDescription:true
                    })
               }else{
                   this.setState({
                        isValidDescription:false
                   })
               }         
            
            
            }.bind(this)
    
            this.onAttachClicked=function(){

                debugger;
                let isValidate=false;

                if (this.props.vendorId=="") 
                {
                    alert("Select Vendor")
                    return
                }
                  
             
                for(var k in myValidators){
                    if(myValidators[k]){
                        isValidate= false
                        return isValidate
                    }
                    else isValidate =true
                }

                if(isValidate){
                    let len=this.state.files.length                
                    for (var i = 0; i < len; i++) {

                        let RFP={}
                        RFP.description=this.state.description
                        RFP.fName=this.state.files[i].name
                        RFP.vendorId=this.props.vendorId

                        let body=JSON.stringify({RFP})
                        debugger;
                        try{
                            postData(sData.URL.RFPs.attach,body)
                        }catch(e){
                            alert(e)
                        }
                        
                        
                       
                    }

                    window.location.reload();
                    }
            }.bind(this)

    }

    render(){
        if(this.props.isButton){
            return( 
                <FormGroup>
                    <Button bsStyle="primary" onClick={this.onAttachDocumentsClicked}>Attach Documents</Button>{' '}
                </FormGroup>     
                )
        }else{
            return(
               <div>
                    <FormGroup controlId="formBasicText"
                    className={this.state.isValidFile?"":"has-error"}
                    >
                        <ControlLabel>Files </ControlLabel>
                        <input type="file"  onChange={this.onFileChange} multiple />
                        <FormControlFeedback />
                        <HelpBlock style={{display:this.state.isValidDescription?"none":"block"}}>{fileWarning}</HelpBlock>
                   </FormGroup>  
                   <FormGroup controlId="formBasicText"
                    className={this.state.isValidDescription?"":"has-error"}
                    >
                        <ControlLabel>Description </ControlLabel>                            
                            <textarea className="form-control" onBlur={this.onDiscriptionBlured} placeholder="Enter description"/>
                        <FormControlFeedback />
                        <HelpBlock style={{display:this.state.isValidDescription?"none":"block"}}>{descriptionWarning}</HelpBlock>
                   </FormGroup> 
                   <FormGroup>
                        <Button bsStyle="primary" onClick={this.onAttachClicked}>Attach</Button>{' '}
                        <Button bsStyle="danger" type="reset" onClick={this.onCancleClicked}>Cancle</Button>{' '}
                   </FormGroup> 
               </div>
            )
        }
    }
   
   
}