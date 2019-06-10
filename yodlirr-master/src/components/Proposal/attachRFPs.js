import React, {  Component, isValidElement } from 'react';
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
import AttachDocument from './attachComponent'


export default class AttachRFPs extends Component{

    constructor(props){
        super(props);

        this.state={
            vendors:[
            ],
            RFPs:[],
            isAttachButton:true,
            vendorId:""
        }

     

        this.vendorChanged=function(e){            
            if(e.target.value!=""){
                let vendorId=e.target.value
                let body=JSON.stringify({vendorId})
                debugger;
                postData(sData.URL.RFPs.get_by_vendorId,body).then(res=>
                res.json()
                .then(res=>{
                    debugger;
                    this.setState({
                        RFPs:res
                    })
                })).catch(err=>alert(err))
                this.setState({
                    vendorId
                })
            }
            
            
        }.bind(this)


        this.onAttachDocumentsClicked=(isAttachButton)=>{
            this.setState({isAttachButton});
        }
       
        this.onDeleteClicked=function(e){
            debugger
            let id=e.target.id;
            let body=JSON.stringify({id})
            postData(sData.URL.RFPs.delete,body).then(res=>{
                if(res.status=="200" && res.statusText=="OK"){
                    let RFPs=this.state.RFPs;
                    let index=RFPs.findIndex(r=>{
                        return r._id==id
                    })
                    RFPs.splice(index,1)
                    this.setState({
                        RFPs
                    })
                }
            })
            .catch(err=>alert(err))
            
        }.bind(this)

        this.fetchVendors=function(){
            fetch(sData.URL.vendors.all,{ credentials: 'include'})
            .then(response => response.json())
            .then(response => {
                debugger
               response[0].vendors
               .unshift({
                    _id:"",
                    name:"Select",
                    domain:""
                })               
            this.setState({                
                vendors:response
            })
      }).catch(err=>alert(err));
        }
    }


    componentDidMount(){
        this.fetchVendors()
    }

   

    render(){

      
        return(
         <div>
            <div className="row">
              <div className="col-lg-12">
                <PageHeader>Attach {this.props.keywords.RFPs}</PageHeader>
              </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                <Panel header={<span>{this.props.keywords.vendors}</span>} >
                    <div className="row">
                        <div className="col-lg-6">
                        <Form>                     
                            <FormGroup controlId="UserSelection">                      
                            <FormControl componentClass="select" onChange={this.vendorChanged} placeholder="Select User">
                            {
                                this.state.vendors.map( (v,index)=> {                            
                                    return( v.vendors.map(vendor=>{
                                        return(
                                        <option value={vendor._id} key={index}>{vendor.name + " "+vendor.domain}</option>)
                                        })
                                    )
                                })                          
                            }                         
                            </FormControl>                   
                            <FormControlFeedback />
                            </FormGroup>                                                                                

                            <AttachDocument onAttachDocumentsClicked={this.onAttachDocumentsClicked} vendorId={this.state.vendorId} isButton={this.state.isAttachButton}/>
                                             
                        </Form>
                        </div>
                    </div>
                </Panel>
                </div>          
                <div className="col-lg-6">                 
                    <table style={{
                        tableLayout:"fixed",                    
                        width: "100% !important"
                        }}
                        className="table table-striped table-bordered table-hover dataTable no-footer"
                        id="dataTables-example"
                        role="grid"
                        aria-describedby="dataTables-example_info"
                        >
                        <thead>
                            <tr role="row">
                            <th
                                className="sorting_asc"
                                tabIndex="0"
                                aria-controls="dataTables-example"
                                rowSpan="1"
                                colSpan="1"
                                aria-label="Rendering engine: activate to sort column descending"
                                aria-sort="ascending"
                                className="col-lg-2"
                                onClick={this.onIndexClicked}
                            >
                            Index
                            </th>
                            <th
                                className="sorting"
                                tabIndex="0"
                                aria-controls="dataTables-example"
                                rowSpan="1"
                                colSpan="1"
                                aria-label="Browser: activate to sort column ascending"
                                className="col-lg-4"
                                onClick={this.onDocumentNameClicked}
                            >
                            Document Name
                            </th>
                            <th
                                className="sorting"
                                tabIndex="0"
                                aria-controls="dataTables-example"
                                rowSpan="1"
                                colSpan="1"
                                aria-label="Platform(s): activate to sort column ascending"
                                className="col-lg-4"
                                onClick={this.onDescriptionClicked}
                            >
                            Description
                            </th>
                            <th
                                className="sorting"
                                tabIndex="0"
                                aria-controls="dataTables-example"
                                rowSpan="1"
                                colSpan="1"
                                aria-label="Engine version: activate to sort column ascending"
                                className="col-lg-2"
                            >
                            Delete
                            </th>                         
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.RFPs.map( (r,index)=> {                                
                            return(
                                <tr  key={index} className="gradeA odd" role="row">
                                <td >{index+1}</td>
                                <td style={{wordWrap:"break-word"}}>{r.fName}</td>
                                <td style={{wordWrap:"break-word"}}>{r.description}</td>
                                <td ><Button bsStyle="primary" id={r._id} onClick={this.onDeleteClicked}>Delete</Button></td>
                                </tr>)
                            })
                        }
                        </tbody>
                    </table>                                         
                </div>                      
            </div>
          </div>);
    }
}
