import React, {  Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import Pagination from 'react-bootstrap/lib/Pagination';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Well from 'react-bootstrap/lib/Well';
import TopHeader from '../common/pageheader/topheader';
import Table from './vendorTable';
import SvgIcon from 'react-icons-kit';
import { circleLeft } from 'react-icons-kit/icomoon/circleLeft';
import sData from '../common/staticData';
const title = 'Vendors';

class Vendor extends Component {
  constructor(props, context){
    super(props, context);
   
    this.state={     
      isTable:true,
      vendor:{},
      vendors:[],
    };
    this.onBackClicked=function(){
      this.setState({
          isTable:true
      })
    }.bind(this);
  }

  componentDidMount=function(){    
      fetch(sData.URL.vendors.all,{ credentials: 'include'})
      .then(response => response.json())
      .then(response => {
      this.setState({
        vendors:response
      })
      }).catch(err=>alert(err));
  };

  render(){
    const TableAndView=(props)=>{
      if(props.isTable){
        return (<Table {...props} vendors={this.state.vendors}/>);
      }else{
        return(
        <div>
           <div style={{paddingBottom:"20px"}}>
            <Button onClick={this.onBackClicked} bsStyle="primary">
          
            <span>Back</span></Button>
           </div>
            {/* <TemplatePriview {...props} parent={props.parent} template={this.state.template}/> */}
        </div>
        )
      }
      
    }
    
  return (
    <div>         
        <TopHeader title={this.props.keywords.vendors} />
        <TableAndView  isTable={this.state.isTable} {...this.props} parent={this}/>
    </div>          
  );
}
}




export default Vendor;