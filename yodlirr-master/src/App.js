import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/index';
import Main from './components/Main/Main';
import EvaluatorDashBoard from '../src/Evaluation/dashboard';
import SideBarMenu from './components/Sidebar/sidebar';
import Login from './components/Login/login';
import postData from './components/common/common';
import sData from './components/common/staticData';
import { BrowserRouter as Router,withRouter, Route, Link } from "react-router-dom";

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isAuth: null
    }
   
   

   
  }

componentWillMount(){
    this.isInSession()
  }

  isInSession=()=>{
    this.setState({
      isAuth: true
    })
    // postData(sData.URL.users.authenticate, {})
    // .then((resp) => {
    //   if (resp.status === 200 & resp.statusText === "OK") {
    //     this.setState({
    //       isAuth: true
    //     })
    //   }     
    // })
    // .catch(err => alert(err))
  }
 


  onLogin = (isAuth) => {

    if (isAuth) {
      this.setState({
        isAuth: true
      })
    } else {
      this.setState({
        isAuth: false
      })
    }
  }

 
  render() {
    const MainApp = () => {
      if(this.state.isAuth){
        return (<div>
          <Header />
          <div>
            <EvaluatorDashBoard/>
            {/* <Sidebar/>  */}
            <SideBarMenu /> 
          </div>
        </div>)
      }else if(false){
         return <Login onLogin={this.onLogin} />
      }else{
        return null
      }
    }

    return (
     <MainApp/>
    );
  }
}

export default App;
