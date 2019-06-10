import React, {  Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import Pagination from 'react-bootstrap/lib/Pagination';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Well from 'react-bootstrap/lib/Well';
import TemplatePriview from './templatepreview';
import TopHeader from '../common/pageheader/topheader';
import Table from './TemplateTable';
import SvgIcon from 'react-icons-kit';
import { circleLeft } from 'react-icons-kit/icomoon/circleLeft';
import staticData from '../common/staticData';
const title = 'Templates';

class TemplateView extends Component {
  constructor(props, context){
    super(props, context);
   
    this.state={     
      isTable:true,
      template:{},
      templates:[],
    };
    this.onBackClicked=function(){
      this.setState({
          isTable:true
      })
    }.bind(this);
  }

  componentDidMount(){
    if(this.state.templates.length<=0){
      fetch(staticData.URL.templates.info,{ credentials: 'include'})
      .then(response => response.json())
      .then(response => {       
        this.setState({
          templates:response
        });
      }).catch(err=>alert(err));
      
    }
  
}

  render(){
    const TableAndView=(props)=>{
      if(props.isTable){
        return (<Table {...props} templates={this.state.templates}/>);
      }else{
        return(
        <div>
           <div style={{paddingBottom:"20px"}}>
            <Button onClick={this.onBackClicked} bsStyle="primary">
          
            <span>Back</span></Button>
           </div>
            <TemplatePriview {...props} parent={props.parent} template={this.state.template}/>
        </div>
        )
      }
      
    }
    
  return (
    <div>         
        <TopHeader title={title} />
        <TableAndView isTable={this.state.isTable} {...this.props} parent={this}/>
    </div>          
  );
}
}




export default TemplateView;