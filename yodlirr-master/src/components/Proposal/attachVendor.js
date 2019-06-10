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

import sData from "../common/staticData";
import postData from '../common/common';



  
export default class AttachVendors extends Component{

    constructor(props){
        super(props);

        this.state={
            selectedProposal:{},
            selectedVendorsToRemove:[],
            selectedVendorsToAdd:[],
            isSelected:[],
            name:"",
            selectedVendors:[],           
            proposals:[],
            remove:[],
            add:[],
            remove:[],
            proposalVendors:[],
            nonProposalVendors:[],
            allVendors:[]
        };

        this.intersection=function(arr1,arr2){
            let result=[]
            arr1.sort()
            arr2.sort()
            let iIndex=0;
            let oIndex=0;
            let len2=arr2.length-1
            let len1=arr1.length-1
            while(oIndex<= len2){
                if(iIndex<=len1 && arr1[iIndex]._id==arr2[oIndex]._id){
                    iIndex++;
                    oIndex++;
                }else {
                    result.push(arr2[oIndex])
                    oIndex++
                }
            }
            return result;
        }

        this.selectVendors=function(proposal){
           
            debugger;
            if(proposal.vendors!=undefined && proposal.vendors.length>0){
                let selectedVendors=this.state.allVendors.filter(v=>{
                   return !proposal.vendors.some(p=>p._id==v._id);
                });
                this.setState({
                    nonProposalVendors:selectedVendors,
                    proposalVendors:proposal.vendors,                    
                })
              
            }else{                
                this.setState({
                    nonProposalVendors:this.state.allVendors,    
                    proposalVendors:[]                
                });
            }
        }; 
        

        this.proposalChanged=function(e){      
            debugger;          
            this.setState({
                selectedProposal:e.target.value,
                selectedVendorsToRemove:[],
                selectedVendorsToAdd:[],
                selectedVendors:[]
            });

            debugger;
            let proposal=this.state.proposals.find(p=>p._id==e.target.value);
            this.selectVendors(proposal);           
        }.bind(this);
      
        this.onVendorSelectedToAdd=function(e){
            this.setState({
                selectedVendorsToAdd:[]
            })
            var options = e.target.options;
            var value = [];
            for (var i = 0, l = options.length; i < l; i++) {
              if (options[i].selected) {
                value.push(options[i].value);
              }
            }
            let  vArr=[]            
            value.forEach(id=>{
                let index=this.state.allVendors.findIndex(v=>{
                    return v._id==id
                })
                vArr.push(this.state.allVendors[index])
            })
            this.setState({
                selectedVendorsToAdd:vArr
            })
        }.bind(this);

        
        this.onVendorSelectedToRemove=function(e){
            this.setState({
                selectedVendorsToRemove:[]
            })
            var options = e.target.options;
            var value = [];
            for (var i = 0, l = options.length; i < l; i++) {
              if (options[i].selected) {
                value.push(options[i].value);
              }
            }
            let  vArr=[]            
            value.forEach(id=>{
                let index=this.state.allVendors.findIndex(v=>{
                    return v._id==id
                })
                vArr.push(this.state.allVendors[index])
            })
            this.setState({
                selectedVendorsToRemove:vArr
            })
        }.bind(this);

        
        this.onVendorRemoved=function(e){

            debugger;
            if(this.state.selectedVendorsToRemove.length>0 ){
                let allVendors=this.state.allVendors
                let  nonProposalVendors=this.state.nonProposalVendors
                nonProposalVendors=nonProposalVendors.concat(this.state.selectedVendorsToRemove)

                let proposalVendors=[];

                // this.state.selectedVendorsToRemove.forEach(v2=>{
                //     let index=allVendors.findIndex(v1=>{
                //         return !nonProposalVendors.includes(v1)
                //     })
                //     proposalVendors.push(allVendors[index])
                // })
                // let index=0;
                // proposalVendors=this.state.proposalVendors.filter(v=>{
                //         if(this.state.selectedVendorsToRemove.length-1>=index && v._id !==this.state.selectedVendorsToRemove[index]._id ){
                //             index++
                //             return true
                //         }
                //         else{
                //            return false
                //         }                   
                //     })
              
                // this.state.selectedVendorsToRemove.forEach(v=>{
                //     let index= this.state.proposalVendors.findIndex(e=>{
                //         return e._id==v._id
                //     })                    
                //     proposalVendors.push(this.state.allVendors[index])
                // })

                //proposalVendors=this.state.proposalVendors.intersection(this.state.selectedVendorsToRemove)
                
                proposalVendors=this.intersection(this.state.selectedVendorsToRemove,this.state.proposalVendors)


                this.setState({
                    nonProposalVendors:nonProposalVendors,
                    proposalVendors:proposalVendors,
                    selectedVendorsToRemove:[],
                    selectedVendorsToAdd:[]
                });                            
            }
        }.bind(this);

        this.onVendorAdded=function(e){
            debugger;           
            if(this.state.selectedVendorsToAdd.length>0){
                let allVendors=this.state.allVendors
                let  proposalVendors=this.state.proposalVendors
                proposalVendors=proposalVendors.concat(this.state.selectedVendorsToAdd)

                let np=[];

                // this.state.selectedVendorsToAdd.filter(v2=>{
                //     let index=allVendors.findIndex(v1=>{
                //         return !proposalVendors.includes(v1)
                //     })
                //     np.push(allVendors[index])
                // })

                // let index=0;
                // np=this.state.nonProposalVendors.filter(v=>{
                //         if(this.state.selectedVendorsToRemove.length-1>=index && v._id!==this.state.selectedVendorsToAdd[index]._id ){
                //             index++
                //             return true
                //         }
                //         else{
                //             return false
                //         }                   
                //     })
                
                // this.state.selectedVendorsToAdd.forEach(v=>{
                //     let index= this.state.nonProposalVendors.findIndex(e=>{
                //         return e._id !==v._id
                //     })                    
                //     np.push(this.state.allVendors[index])
                // })

                np=this.intersection(this.state.selectedVendorsToAdd,this.state.nonProposalVendors)

                this.setState({
                    nonProposalVendors:np,
                    proposalVendors:proposalVendors,
                    selectedVendorsToRemove:[],
                    selectedVendorsToAdd:[]
                });                               
            }            
        }.bind(this);

        this.onAttachVendor=function(){
            debugger;
            let project={};
            project._id=this.state.selectedProposal;
            project.vendors=this.state.proposalVendors;

            
              let body=JSON.stringify({project})
                     
            postData(sData.URL.vendors.attach_vendors,body)
            .then(res=>res.json()).then(res => {
                alert("vendor attach successfully")
                window.location.reload();})
            .catch(err =>{
              console.log(err)
              alert("vendor attach successfully")
              window.location.reload();
            });
            window.location.reload();
        }.bind(this);

        this.componentDidMount=function(){
           this.getVendors();
           this.getProposals();   
        };

        this.getVendors=function(){
            fetch(sData.URL.vendors.vendors_name,{ credentials: 'include'})
            .then(response => response.json())
            .then(response => {
                debugger;
                this.state.allVendors=response;                          
            }).catch(err=>alert(err));
        }


        this.getProposals=function(){
            fetch(sData.URL.vendors.proposal_vendor,{ credentials: 'include'})
            .then(response => response.json())
            .then(proposals => {
                proposals.unshift({_id:"",name:"Select"});
               this.setState({proposals:proposals});
            }).catch(err=>alert(err));
        }      
}

    render(){
        return (
            <div>
            <div className="row">
              <div className="col-lg-12">
                <PageHeader>Attach {this.props.keywords.vendors}</PageHeader>
              </div>
            </div>
      
            <div className="row">
              <div className="col-lg-12">
                <Panel header={<span>Attach {this.props.keywords.vendors}</span>} >
                  <div className="row">
                    <div className="col-lg-6">
                      <Form>                     
                        <FormGroup controlId="proposalSelection">
                          <ControlLabel>Proposal</ControlLabel>
                          <FormControl componentClass="select" onChange={this.proposalChanged} placeholder="Select">
                          {
                             this.state.proposals.map((proposal,index)=>{
                              return(<option  value={proposal._id} key={index}>{proposal.name}</option>)
                             })
                          }                           
                          </FormControl>                   
                          <FormControlFeedback />
                        </FormGroup>                                                        
                      
                        <FormGroup controlId="formBasicText2">
                            <ControlLabel>{this.props.keywords.vendors}</ControlLabel>                   
                            <FormControl componentClass="select" onChange={this.onVendorSelectedToRemove} multiple placeholder="Select Vendor" style={{height:"200px"}}>
                                 {                                   
                                     this.state.proposalVendors
                                     .map(v=>{
                                      return(<option value={v._id} vendor={v} key={v._id}>{v.name}{","}{v.domain}</option>)
                                     })
                                  }                           
                            </FormControl>                                    
                        </FormGroup>
                        <FormGroup controlId="formBasicText2">
                            <Button bsStyle="primary" onClick={this.onAttachVendor}> Attach {this.props.keywords.vendors}</Button>
                            <Button onClick={this.onVendorRemoved} style={{float:"right"}} >Remove {this.props.keywords.vendors}</Button> 
                            
                        </FormGroup>
                        
                      </Form>
                    </div>
                    <div className="col-lg-6">
                    <Form>
                    <FormGroup controlId="Vendors Selection">
                                  <ControlLabel>Add {this.props.keywords.vendors}</ControlLabel>
                                  <FormControl componentClass="select" onChange={this.onVendorSelectedToAdd} multiple placeholder="Select" style={{height:"400px"}}>
                                 {                                   
                                     this.state.nonProposalVendors
                                     .map((vendor,index)=>{
                                      return(<option value={vendor._id} key={index}>{vendor.name}{","}{vendor.domain}</option>)
                                     })
                                  }                                                           
                                  </FormControl>                   
                        <FormControlFeedback />
                      </FormGroup>  
        
                      
                      <Button onClick={this.onVendorAdded}>Add {this.props.keywords.vendors}</Button> 
                    </Form>
                    </div>
                  </div>
                </Panel>
              </div>
             
            </div> 
          </div>
        );
      }
    

}