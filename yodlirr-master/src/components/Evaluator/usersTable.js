

import React, {  Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import Pagination from 'react-bootstrap/lib/Pagination';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Well from 'react-bootstrap/lib/Well';


class UsersTable extends Component {
  constructor(props, context){
    super(props, context);
   
   

    this.state={
      users:this.props.users
    }
    
    this.onProposalClicked=function(){
      this.state.vendors.sort(function(d1,d2){
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
      this.setState({vendors:this.state.vendors });
    }.bind(this);
   
    
    this.onNameClicked=function(){
     
      this.setState({vendors:this.state.vendors });
    }.bind(this);
   
    this.onDomainClicked=function(){
     
      this.setState({vendors:this.state.vendors });
    }.bind(this);
   
    this.onDeleteClicked=function(){
     
      this.setState({vendors:this.state.vendors });
    }.bind(this);
  }
 

  render(){

  return (
    <div className="row">      
       <div className="col-lg-12">
        <Panel header={<span>Users</span>} >
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
                            onClick={this.onProposalClicked}
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
                            onClick={this.onNameClicked}
                          >
                          Email
                          </th>
                          <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="dataTables-example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Platform(s): activate to sort column ascending"
                            style={{ width: 299 }}
                            onClick={this.onDomainClicked}
                          >
                         Phone No
                          </th>
                          <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="dataTables-example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Engine version: activate to sort column ascending"
                            style={{ width: 231 }}
                            onClick={this.onDeleteClicked}
                          >
                          Delete
                          </th>                         
                        </tr>
                      </thead>
                      <tbody>
                      {
                        this.state.users.map(function (user,index) {
                            return(
                                <tr key={index} className="gradeA odd" role="row">
                                <td className="sorting_1">{user.fname+"  "+user.lname}</td>
                                <td>{user.email}</td>
                                <td>{user.ph}</td>
                                <td className="center"><Button bsStyle="primary">Delete</Button></td>
                                </tr>)                        
                            })
                          
                          }

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




export default UsersTable;