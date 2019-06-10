

import React, {  Component } from 'react';
import { Link } from 'react-router-dom'
import {
    Panel
} from 'react-bootstrap';



class Table extends Component {
    constructor(props) {
        super(props);



    }
    render() {
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
                                            {
                                                this.props.tHeaders.map((header, i) => {
                                                    return (<th key={i}
                                                        className="sorting_asc"
                                                        tabIndex="0"
                                                        aria-controls="dataTables-example"
                                                        rowSpan="1"
                                                        colSpan="1"                                                      
                                                        style={{ width: 265 }}
                                                        onClick={this.onNameClicked}
                                                    >
                                                        {header}
                                                    </th>)
                                                })
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.rows.map((row, index) => {
                                                return (
                                                    <tr key={index} className="gradeA odd" role="row">
                                                        {
                                                            row.data.map(data=>{
                                                                return(<td>{data}</td>)
                                                            })
                                                        }
                                                        
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
    }
}