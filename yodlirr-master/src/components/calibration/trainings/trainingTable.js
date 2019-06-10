

import React, {  Component } from 'react';
import { Link } from 'react-router-dom'
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
import Pagination from 'react-bootstrap/lib/Pagination';


import sData from '../../common/staticData';
import postData from '../../common/common';

Date.prototype.formatMMDDYYYY = function(){
  return (this.getMonth() + 1) + 
  "/" +  (this.getDate()) +
  "/" +  this.getFullYear();
}



const title = 'Table';

class TrainingTable extends Component {
  constructor(props, context){
    super(props, context);
   
    
   

    this.state={
      trainings:[]
    }

    this.componentDidMount=function(){
        fetch(sData.URL.training.get_table,{ credentials: 'include'})
        .then(response => response.json())
        .then(trainings => {
            debugger;
        this.setState({
            trainings
        })
        }).catch(err=>alert(err));
    };

  

   
   
   
  }
 

  render(){

  return (
    <div className="row">      
       <div className="col-lg-12">
        <Panel header={<span>{this.props.title}</span>} >
          <div>
            <div className="dataTable_wrapper">
              <div
                id="dataTables-example_wrapper"
                className="dataTables_wrapper form-inline dt-bootstrap no-footer"
              >
  
                <div className="row">
                  <div className="col-sm-12">
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
                            style={{ width: 265 }}
                            onClick={this.onNameClicked}
                          >
                          Name
                          </th>
                          <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="dataTables-example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Browser: activate to sort column ascending"
                            style={{ width: 321 }}
                            onClick={this.onEvaluatorClicked}
                          >
                          Modules
                          </th>
                          <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="dataTables-example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Platform(s): activate to sort column ascending"
                            style={{ width: 299 }}
                            onClick={this.onDateClicked}
                          >
                         Date
                          </th>                                                                       
                        </tr>
                      </thead>
                      <tbody>
                      {
                        this.state.trainings.map( (d,index)=> {
                          return(
                          <tr key={index} className="gradeA odd" role="row">
                          <td className="sorting_1">{d.name}</td>
                          <td>{d.totalModules}</td>
                          <td>{d.due_date}</td>                                          
                        </tr>)
                        })}

                      </tbody>
                    </table>
                  </div>
                </div>
               </div>
               </div>
               </div>
               </Panel>
               </div>
               </div>
            
              
  );
}
}




export default TrainingTable;