

import React, {  Component } from 'react';
import { Link } from 'react-router-dom'
import {
    Panel   ,
    Button
} from 'react-bootstrap';



class ModuleTable extends Component {
    constructor(props) {
        super(props);


        this.componentDidMount = function () {
            
        };
    }


    onDeleteClicked=(moduleId)=>{
        debugger
        this.props.onCurrentModuleDeleted(moduleId)
    }

    render() {

        return (
            <div className="row">
                <div className="col-lg-6">
                    <Panel header={<span>{this.props.title}</span>} >
                        <div>
                            <div className="dataTable_wrapper">
                                <div
                                    id="dataTables-example_wrapper"
                                    className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                                >

                                    <div className="row">
                                        <div className="col-sm-6">
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
                                                            Weightage
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
                                                            Fields
                                                        </th>                                                     
                                                        <th
                                                            className="sorting"
                                                            tabIndex="0"
                                                            aria-controls="dataTables-example"
                                                            rowSpan="1"
                                                            colSpan="1"
                                                            aria-label="Platform(s): activate to sort column ascending"
                                                            style={{ width: 299 }}                                                           
                                                        >
                                                            Delete
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.props.modulesInfo.map((m, index) => {
                                                            debugger;
                                                            console.dir(m)
                                                            return (
                                                                <tr key={index} className="gradeA odd" role="row">
                                                                    <td className="sorting_1">{m.name}</td>
                                                                    <td>{m.weightage}</td>
                                                                    <td>{m.number_fields}</td>                                                                
                                                                    <td><Button bsStyle="danger"  onClick={()=>this.onDeleteClicked(m.id)}>Delete</Button></td>
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
export default ModuleTable;