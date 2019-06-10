
import React, {  Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import Pagination from 'react-bootstrap/lib/Pagination';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Well from 'react-bootstrap/lib/Well';

const Evaluators=[{
	name: "shalin patel",
	email: "shalinpatel51@yoodle.com",
	department: "Info",
	access: "Evaluator"
},{
	name: "Denial oskvig",
	email: "dob@yoodle.com",
	department: "Power and light",
	access: "Evaluator"
},{
	name: "Raj An",
	email: "ra@yoodle.com",
	department: "Marketing",
	access: "Evaluator"
},{
	name: "Arun",
  email: "ra@yoodle.com",
	department: "Marketing",
	access: "Purching office"
},{
	name: "User",
	email: "ra@yoodle.com",
	department: "Purchasing",
	access: "Purching office"
}];

const title = 'Vendor';

class Evaluator extends Component {
  constructor(props){
    super(props);
   
    this.state={
      data:[]
    }

    this.onNameClicked=function(){
      Evaluators.sort(function(d1,d2){
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
      this.setState({data:Evaluators });
    }.bind(this);
   
    
    this.onEmailClicked=function(){
      Evaluators.sort(function(d1,d2){
          if(d1.email<d2.email){
            return -1;
          }
          if(d1.email>d2.email){
            return 1;
          }
          if(d1.email==d2.email){
            return 0;
          }        
      });
      this.setState({data:Evaluators });
    }.bind(this);
   
    this.onDepartmentClicked=function(){
      Evaluators.sort(function(d1,d2){
          if(d1.department<d2.department){
            return -1;
          }
          if(d1.department>d2.department){
            return 1;
          }
          if(d1.department==d2.department){
            return 0;
          }        
      });
      this.setState({data:Evaluators });
    }.bind(this);
   
    this.onAccessClicked=function(){
      Evaluators.sort(function(d1,d2){
          if(d1.access<d2.access){
            return -1;
          }
          if(d1.access>d2.access){
            return 1;
          }
          if(d1.access==d2.access){
            return 0;
          }        
      });
      this.setState({data:Evaluators });
    }.bind(this);
   
  }
 

  render(){

  return (
    <div>
      <div className="col-lg-12">
        <PageHeader>EVALUATORS</PageHeader>
      </div>

      <div className="col-lg-12">
        <Panel header={<span>Evaluators</span>} >
          <div>
            <div className="dataTable_wrapper">
              <div
                id="dataTables-example_wrapper"
                className="dataTables_wrapper form-inline dt-bootstrap no-footer"
              >

                <div className="row">
                  <div className="col-sm-9">
                    <div className="dataTables_length" id="dataTables-example_length">
                      <label htmlFor={'show'}> Show
                        <select
                          name="dataTables-example_length"
                          aria-controls="dataTables-example"
                          className="form-control input-sm"
                          id="show" onChange={(e)=>alert(e.target.value)}
                        >
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                        </select>
                        entries
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div id="dataTables-example_filter" className="dataTables_filter">
                      <label htmlFor={'search'}>Search:
                        <input
                          type="search"
                          className="form-control input-sm"
                          placeholder=""
                          aria-controls="dataTables-example"
                          id="search"
                        />
                      </label>
                    </div>
                  </div>
                </div>

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
                            onClick={this.onEmailClicked}
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
                            onClick={this.onDepartmentClicked}
                          >
                         Department
                          </th>
                          <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="dataTables-example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Engine version: activate to sort column ascending"
                            style={{ width: 231 }}
                            onClick={this.onAccessClicked}
                          >
                          Access
                          </th>                         
                        </tr>
                      </thead>
                      <tbody>
                      {
                        this.state.data.map(function (d,index) {
                          return(
                          <tr key={index} className="gradeA odd" role="row">
                          <td className="sorting_1">{d.name}</td>
                          <td>{d.email}</td>
                          <td>{d.department}</td>
                          <td className="center">{d.access}</td>
                        </tr>)
                        })}

                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div
                      className="dataTables_info"
                      id="dataTables-example_info"
                      role="status"
                      aria-live="polite"
                    >
                      Showing 1 to 10 of 57 entries
                    </div>
                  </div>
                  <div className="col-sm-6 pullRight " >
                    <Pagination
                      activePage={1}
                      items={6}
                      first
                      last
                      prev
                      next
                      onSelect={() => {
                        // function for Pagination
                      }}
                    />
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





export default Evaluator;
