import React, { Component } from 'react';
import dashboard from '../Dashboard/dashboard';
import Proposal from '../Proposal/proposal';
import Evaluator from '../Evaluator/evaluator';
import Task from '../Task/task';
import Settings from '../Settings/settings';
import Vendor from '../Vendor/vendor';
import {Switch, Route} from 'react-router-dom';

class Main extends Component {
 constructor(props){
     super(props)
 }

  render() {
    return (
        <Switch>
            <Route exact path={'/'+this.props.path} component={this.props.path}/>
            <Route exact path='/proposal' component={Proposal}/>
            <Route exact path='/evaluator' component={Evaluator}/>
            <Route exact path='/settings' component={Settings}/>
            <Route exact path='/vendor' component={Vendor}/>
            <Route exact path='/task' component={Task}/>
        </Switch>
    );
  }
}

export default Main;
