import React, { Component } from 'react';
import SvgIcon from 'react-icons-kit';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ModuleView from './moduleView';
import sData from "../../components/common/staticData"
import postData from "../../components/common/common"


class sideBarMenu extends Component {


    constructor(props) {
        super(props)
        this.state = {

            view: sData.views.QAView,
            training: { modules: [], },
            selectedModule: 0,
            _module: undefined,
            _modules: []
        }


    }

    onRetake = function (view) {
        this.setState({
            view
        })
    }.bind(this)

    onSubmit = function (fields) {
        debugger;

        let _module = this.state._module
        let avgResult = 100 / _module.fields.length
        let score = 0
        let minScore = _module.minScore

        _module.fields=_module.fields.map((f, i) => {
            f.ans = fields[i].evalAns == undefined ? fields[i] : fields[i].evalAns
            return f
        })

        if (_module.fields.length == Object.keys(fields).length) {
          
            _module.fields.forEach((f, i) => {
                if (parseInt(f.expectedAns) == fields[i].evalAns || parseInt(f.expectedAns) == fields[i]) {
                    score = avgResult + score
                }
            })
        }
        _module.score = score
        if (Math.round(score) >= minScore) {


            let body = { _module }
            body.trainingId = this.props.trainingId
            body.weightage = _module.weightage
            body = JSON.stringify(body)
            postData(sData.URL.training.submit_response, body)
        }
        this.setState({
            view: sData.views.ReviewView,
            _module,
        })
    }.bind(this)

    onSave = function (fields) {

        debugger;
        let body = { _module: {} }
        body.trainingId = this.props.trainingId
        let tempFields = []
        let tempModule = this.state._module

        tempModule.id = tempModule.id

        tempModule.fields = tempModule.fields.map((f, i) => {
            f.ans = fields[i].evalAns == undefined ? fields[i] : fields[i].evalAns
            return f
        })
        body._module.id = tempModule.id
        body._module.fields = tempModule.fields
        body = JSON.stringify(body)
        postData(sData.URL.training.save_response, body)
            .then(d => d.json())
            .then(d => {
                alert("Data Saved sucessfully")
            })
            .catch(err => {
                alert(err)
            })
    }.bind(this)

    selectedModuleChanged = (e) => {
        debugger
        let selectedModule = e.target.id
        console.dir(this.props)
        let trainingId = this.props.trainingId

        fetch(sData.URL.training.get_selected_module + trainingId + "/" + selectedModule, { credentials: 'include' })
            .then(response => response.json())
            .then(data => {

                fetch(sData.URL.training.get_module + trainingId + "/" + selectedModule, { credentials: 'include' })
                    .then(response => response.json())
                    .then(saved_module => {
                        debugger;



                        if (saved_module.length != 0) {
                            // let review={}
                            // review.fields=_module.module.fields
                            // review.score=_module.score      

                            let _module = data.modules[0]
                            _module.score =saved_module.module.score

                            //  _module.fields=_module.fields.map((f,i)=>{
                            //      console.log( tempModule.fields[i].field)
                            //      f.field= tempModule.fields[i].field                
                            //      f.description=tempModule.fields[i].description  

                            //      return f
                            //  })
                            //  delete _module.module
                            _module.fields = _module.fields.map((f, i) => {
                                debugger;
                                f.ans = saved_module.module.fields[i].ans
                                return f
                            })

                            if (_module.minScore <= _module.score) {
                                this.setState({
                                    view: sData.views.ReviewView,
                                    _module: _module,
                                    selectedModule
                                })
                            } else {
                                this.setState({
                                    view: sData.views.QAView,
                                    _module,
                                    selectedModule
                                })
                            }

                        }
                        else {
                            let _module = data.modules[0]
                            this.setState({
                                view: sData.views.QAView,
                                _module,
                                selectedModule
                            })
                        }
                    })




            })

    }




    componentDidMount() {

        let modules = []

        fetch(sData.URL.training.get_module_name + this.props.trainingId, { credentials: "include" }).
            then(d => d.json()).
            then(res => {
                let _modules = res.modules
                debugger
                this.setState({ _modules })
            })


    }

    render() {


        const _modules = Object.create(this.state._modules)
        return (
            <Router>
                <div id="sideBar">
                    <div className="col-lg-3" style={{ backgroundColor: "#003f56", color: "white", height: "800px" }}>
                        <ul>
                            {
                                _modules.map((m, index) => {
                                    return <li style={{ listStyleType: "none", wordWrap: "break-word", fontSize: "16px" }}><Link onClick={this.selectedModuleChanged} id={m.id.toString()} to={m.id.toString()}>{m.name}</Link></li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-lg-9" >
                        {
                            _modules.map((m, index) => {
                                return <Route key={index} path={"/" + m.id.toString()} render={(props) => { return <ModuleView {...props} selectedModule={m.id} view={this.state.view} onRetake={this.onRetake} _module={this.state._module} onSubmit={this.onSubmit} onSave={this.onSave} selectedModuleChanged={this.selectedModuleChanged} /> }} />
                            })
                        }
                    </div>
                </div>
            </Router>
        );
    }

}
export default sideBarMenu