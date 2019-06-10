// http://recharts.org/#/en-US/examples/DashedLineChart

import React, {
    
    Component
  } from 'react';
import { AreaChart, Area,BarChart, Bar,LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import sData from "../common/staticData"
import postData from "../common/common"


export default class 
Reports extends Component{
    constructor(props){
        super(props);

        debugger;
        this.state={
            height:500,
            width:700,
            vendors:[],
            ppa:[],
            fleissKappa:[],
            kripsAlph:[],
            totalPoints:[]
        }
    

    this.calculateFinalReport=function(fleissKappa,ppa,kripsAlph){
        let proposalId=this.props.match.params.proposalId;
        fetch(sData.URL.evauation.get_responses_proposalID+proposalId,{ credentials: 'include'})
        .then(d=>d.json())
        .then(res=>{
            var totalPoints=[]
                    res.vendors.forEach(v=>{   
                        debugger                       
                    let sum=0  
                    let name=v.vendor.name                  
                    v.response.forEach(resp=>{
                        resp.fields.forEach(f=>{
                        sum=sum+parseInt(f.score)
                         })
                    })
                    totalPoints.push({name,sum})                    
                    })

                    debugger
                var finalReport= fleissKappa.sort((a,b)=>{
                    if(a.uv<b.uv){
                        return 1
                    }else
                    return -1
                })        
                
                debugger
                let vendors= finalReport.map(f=>{
                   let vendor={}
                   vendor.name=f.name
                   vendor.fleissKappa=f.uv
                   vendor.kAlpha=kripsAlph[kripsAlph.findIndex(k=>{
                         return k.name==f.name
                    })].uv
                    vendor.ppa= ppa[ppa.findIndex(p=>{
                       return p.name==f.name
                   })].uv
                   vendor.totalPoint= totalPoints[totalPoints.findIndex(t=>{
                    return t.name==f.name
                })].sum
                    return vendor
                })

            this.setState({
                fleissKappa:fleissKappa,
                ppa:ppa,
                kripsAlph:kripsAlph,
                totalPoints,
                vendors:vendors
            })
        }).catch(e=>alert(e))
      }

    }
    componentDidMount() {
        debugger;
        let proposalId=this.props.match.params.proposalId;
         
        let body=JSON.stringify({proposalId:proposalId})

        

        postData(sData.URL.projects.calculate,body).
        then(d=>d.json()
        .then(d=>{
            let fleissKappa=[]
            let ppa=[]
            let kripsAlph=[]
            d.forEach(res => {
                res=JSON.parse(res)              
                let v={name: res.vendor.name, uv: parseFloat(((res.fleissKappa)*100).toFixed(2)), pv: 0}
                fleissKappa.push(v)              
            });
            d.forEach(res => {
                res=JSON.parse(res)              
                let v={name: res.vendor.name, uv: parseFloat(((res.ppa)*100).toFixed(2)), pv: 0}
                ppa.push(v)              
            });
            d.forEach(res => {
                res=JSON.parse(res)              
                let v={name: res.vendor.name, uv: parseFloat(((res.kripsAlph)*100).toFixed(2)), pv: 0}
                kripsAlph.push(v)              
            });
            this.calculateFinalReport(fleissKappa,ppa,kripsAlph)
        })
        .catch(e=>alert(e)))
        .catch(e=>alert(e))
        const width = document.getElementById('container').clientWidth/2;
        this.setState({ width });
      }

     

    render(){

        return(
            <div>
                <div >
                    <div style={{textAlign:"center",paddingTop:"30px",fontSize: "x-large"}}>
                        <span>Inter Evaluator Scoring Report</span>
                    </div>
                    <div style={{paddingTop:"20px"}} className="dataTable_wrapper">
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
                            Rank
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
                            Name
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
                            Total Score
                            </th>
                            <th
                                className="sorting"
                                tabIndex="0"
                                aria-controls="dataTables-example"
                                rowSpan="1"
                                colSpan="1"
                                aria-label="Engine version: activate to sort column ascending"
                                style={{ width: 231 }}
                                onClick={this.onStatusClicked}
                            >
                            Pairwise Agreement
                            </th>   
                            <th
                                className="sorting"
                                tabIndex="0"
                                aria-controls="dataTables-example"
                                rowSpan="1"
                                colSpan="1"
                                aria-label="Engine version: activate to sort column ascending"
                                style={{ width: 231 }}
                                onClick={this.onStatusClicked}
                            >
                            F Kappa
                            </th>     
                            <th
                                className="sorting"
                                tabIndex="0"
                                aria-controls="dataTables-example"
                                rowSpan="1"
                                colSpan="1"
                                aria-label="Engine version: activate to sort column ascending"
                                style={{ width: 231 }}
                                onClick={this.onStatusClicked}
                            >
                            K Alpha
                            </th>                      
                            </tr>
                        </thead>
                        <tbody>
                        {
                            
                    
                            this.state.vendors.map((v,index)=> {
                                debugger;
                                    return(
                                        <tr key={index} className="gradeA odd" role="row">
                                            <td className="sorting_1">{index+1}</td>
                                            <td>{v.name}</td>
                                            <td className="center">{v.totalPoint}</td>
                                            <td>{v.ppa} </td>
                                            <td>{v.fleissKappa}</td>
                                            <td>{v.kAlpha} </td>
                                        </tr>)
                                
                                })
                            } 
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
                <div id="container" class="row">
                    <div class="col-lg-6">
                        <LineChart width={this.state.width} height={this.state.height} data={this.state.fleissKappa}
                                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Tooltip/>
                                    <Legend />                                
                                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                        <div style={{textAlign: "center"}}>
                            <lable style={{fontSize: "large",color: "darkmagenta"}}>Fleiss Kappa</lable>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <AreaChart width={this.state.width} height={this.state.height} data={this.state.ppa}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Area type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
                        </AreaChart>
                    
                    </div>
                    <div style={{textAlign: "center"}}>
                        <lable style={{fontSize: "large",color: "darkmagenta"}}>Pairwise Percentage Agreement</lable>
                    </div>
                </div>
                <div id="container" class="row">
                    <div class="col-lg-6">           
                        <BarChart width={this.state.width} height={this.state.height} data={this.state.kripsAlph}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend />                       
                            <Bar dataKey="uv" fill="#82ca9d" />
                        </BarChart>
                        <div style={{textAlign: "center"}}>
                        <lable style={{fontSize: "large",color: "darkmagenta"}}>K Alpha</lable>
                    </div>
                    </div>
                </div>
                <div class="col-lg-6">
                
                </div>         
            </div>
         </div>   
        )
    }
}
