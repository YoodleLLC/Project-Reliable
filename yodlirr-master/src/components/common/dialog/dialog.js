import React, {
    
    Component
  } from 'react';
  import {
   Modal,
   Button
  } from 'react-bootstrap';

export default class MyDialog extends Component {
    constructor() {
        super();
        this.state = {
            isShowingModal: false
        }

        this.openDialog=()=>this.setState({isShowingModal:true})
        this.closeDialog=()=>this.setState({isShowingModal:false})
        this.OKClicked=()=>{
            this.setState({isShowingModal:false})
            this.props.onOKClicked()
        }
    }
    render() {
        return (
            <Modal
            show={this.state.isShowingModal}
            onHide={()=>this.setState({isShowingModal:false})}
            container={this}
            aria-labelledby="contained-modal-title"
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">
                    {this.props.title}
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {this.props.body}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.OKClicked}>OK</Button>
                    <Button onClick={this.closeDialog}>Cancle</Button>
                </Modal.Footer>
          </Modal>
        );
    }
}