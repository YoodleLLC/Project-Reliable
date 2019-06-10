

import React, {  Component } from 'react';
import {PageHeader} from 'react-bootstrap';




class TopHeader extends Component {
  constructor(props){
    super(props);
  }
  
  render(){
  return (
    <div >
        <div className="col-lg-12">
          <PageHeader>{this.props.title}</PageHeader>
        </div>
    </div>)

}
}
export default TopHeader;