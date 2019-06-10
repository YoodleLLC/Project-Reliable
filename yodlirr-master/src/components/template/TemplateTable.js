import React, {  Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import Pagination from 'react-bootstrap/lib/Pagination';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Well from 'react-bootstrap/lib/Well';
import TemplatePriview from './templatepreview';
import TopHeader from '../common/pageheader/topheader';import staticData from '../common/staticData';
3




const title = 'Templates';

class TemplateTable extends Component {
  constructor(props, context){
    super(props, context);
   
    this.state={
      data:[],
      templates:this.props.templates,
      template:{},
      isTable:true,
    }

    this.onNameClicked=function(){
        this.state.templates.sort(function(d1,d2){
          if(d1.name<d2.name){
            return -1;
          }
          if(d1.name>d2.name){
            return 1;
          }
          if(d1.name==d2.name){
            return 0;
          }        
      });
        let temp=this.state.templates;
      this.setState({templates:temp });
    }.bind(this);
  

    this.onPreviewClicked=function(e){      
      debugger;      
        fetch(staticData.URL.templates.get_template+e.target.id,{ credentials: 'include'}).
        then(response=>response.json()).
        then(response=>{
          
          this.props.parent.setState({
            isTable:false,
            template:response[0]
        })
      }).catch(err=>alert(err));
        
    }.bind(this);

    this.onDateClicked=function(){
        this.state.templates.sort(function(d1,d2){
          if(d1.date<d2.date){
            return -1;
          }
          if(d1.date>d2.date){
            return 1;
          }
          if(d1.date==d2.date){                                 
            return 0;
          }        
      });
      let temp=this.state.templates;
      this.setState({templates:temp });
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
  return (
          
        <div >
                 <table
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
                            
                            onClick={this.onNameClicked}
                          >
                          Name
                          </th>                                                
                          <th
                            className="sorting_asc"
                            tabIndex="0"
                            aria-controls="dataTables-example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Rendering engine: activate to sort column descending"
                            aria-sort="ascending"
                           
                            onClick={this.onNameClicked}
                          >
                          Date
                          </th>                                                 
                          <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="dataTables-example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Engine version: activate to sort column ascending"                                
                            onClick={this.onStatusClicked}
                          >
                          Preview
                          </th>                         
                        </tr>
                      </thead>
                      <tbody>
                      {
                        this.state.templates.map((d,index)=> {
                          return(
                          <tr key={index} className="gradeA odd" role="row">
                          <td className="sorting_1">{d.name}</td>
                          <td className="sorting_1">{d.date}</td>
                          <td><Button bsStyle="primary" id={d._id}  onClick={this.onPreviewClicked}>preview </Button></td>
                          </tr>)
                        })}

                      </tbody>
                    </table>
               </div>
       
  );
}
}




export default TemplateTable;