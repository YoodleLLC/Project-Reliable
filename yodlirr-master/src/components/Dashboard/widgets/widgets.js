import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { ic_shopping_cart } from 'react-icons-kit/md/ic_shopping_cart';
import SvgIcon from 'react-icons-kit';
import AppData from '../../common/staticData';
class StatWidget extends Component{ // eslint-disable-line
  
  constructor(props){
      super(props);

      const {widgets_footer}=AppData;

      this.onClickHandler=function(){
        switch(this.props.footerText){
          case AppData.widgets_footer.active_proposals:this.props.proposal.onActiveProposalClicked();
          break;
          case widgets_footer.proposal_past_due:this.props.proposal.onProposalPastDueClicked();
          break;
          case widgets_footer.activity_in_past_month:this.props.proposal.onActivityinPastMonthClicked();
          break;
          case widgets_footer.proposal_due_today:this.props.proposal.onProposalsDueTodayClicked();
          break;
          default:this.props.proposal.onActiveProposalClicked();
          break;
        }
        
        
        
        
      }.bind(this);
  }

  render() {
    return (
      <Panel
        className="stat"
        className={this.props.style}
        onClick={this.onClickHandler}
        header={<div className="row">
          <div className="col-xs-3">
             <SvgIcon size={50} icon={ic_shopping_cart}/>
          </div>
          <div className="col-xs-9 text-right">
            <div className="huge">
              {
                this.props.count
              }
            </div>
            <div>
              {
                this.props.headerText
              }
            </div>
          </div>
        </div>}

        footer={
          <div
            to={
              this.props.linkTo // eslint-disable-line
            }          
          >
            <span className="pull-left">
              {
                this.props.footerText
              }
            </span>
            <span className="pull-right"><i className="fa fa-arrow-circle-right" /></span>
            <div className="clearfix" />
          </div>}
      />

    );
  }
}

export default StatWidget;
