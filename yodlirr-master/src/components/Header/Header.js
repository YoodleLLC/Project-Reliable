

import React, {  Component } from 'react';

import {
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,   
  Image
} from 'react-bootstrap';
import Navbar, {Brand} from 'react-bootstrap/lib/Navbar';

import $ from "jquery";


export default class Header extends Component{

  constructor(props){
      super(props)

      function toggleMenu(){
        if($(".navbar-collapse").hasClass('collapse')){
          $(".navbar-collapse").removeClass('collapse');
        }
        else{
          $(".navbar-collapse").addClass('collapse');
        }
      }
   
      this.onPassChange=function(){

        
      }.bind(this)
      
  }
    componentDidMount(){     

    }

    render(){
      return (
        <Navbar collapseOnSelect style={{marginBottom: 0}}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#"><img src={require("./yoodlellc-small.png")}/></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight >
          <NavItem ><div> <Image style={{maxHeight:"35px",maxWidth:"35px"}} src="https://www.atomix.com.au/media/2015/06/atomix_user31.png" responsive circle  /></div></NavItem>
            <NavDropdown eventKey={3} title="My Account" id="basic-nav-dropdown">      
              <MenuItem eventKey={3.1}>View Profile</MenuItem>
              <MenuItem eventKey={3.2}>Edit Profile</MenuItem>
              <MenuItem eventKey={3.2} href="/updatePass">Change Password</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={3} title="Theme" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Separated link</MenuItem>
          </NavDropdown>        
            <NavItem ref='navItemRef' eventKey={2} href="#">Support</NavItem>
            <NavItem eventKey={1} href="#">Logout</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>)
    }

}
