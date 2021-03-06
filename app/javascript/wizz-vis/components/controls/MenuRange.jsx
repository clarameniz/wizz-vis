/* jshint esversion: 6 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import Time from './../../utils/time';
import FixedRange from './FixedRange';
import RelativeRange from './RelativeRange';
import startCase from 'lodash/startCase';
import FloatMenu from './../FloatMenu';

class MenuRange extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error: null,
      menuOpen: false,
      menuType: 'relative',
      menuRange: this.props.range,
      startTime: this.props.startTime || '',
      endTime: this.props.endTime || ''
    };

    this.setMenu = this.setMenu.bind(this);
    this.updateDashboard = this.updateDashboard.bind(this);
  }

  closeMenu = () => {
    this.setState( {menuOpen: false} );
  }

  openMenu = () => {
    this.setState({ menuOpen: true });
  }

  setMenu(value) {
    this.setState({ menuType: value });
  }

  updateDashboard(params) {
    fetch(
      '/dashboards/' + this.props.id + '.json',
      { method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': ReactOnRails.authenticityToken()
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          dashboard: {
            range: params.range,
            start_time: params.startTime,
            end_time: params.endTime
          }
        })
      }
    ).catch(error => this.setState({ error: error }));

    this.closeMenu();
  }

  render() {
    return(
      <div className='menu-range'>
        <div className='ellipsis' href='#' onClick={ this.openMenu }>
          { startCase(this.props.range) || Time.formatTimeRange(this.props.startTime, this.props.endTime) }
        </div>
        <FloatMenu
          onClose={this.closeMenu}
          open={this.state.menuOpen}>
          <div className="col s12 cont">
            <div className="button-group">
              <ul className="group-container">
                <li className={"group-member " + (this.state.menuType == 'relative' ? 'primary-color' : '')}
                  onClick={ () => this.setMenu('relative') }>Relative</li>
                <li className={"group-member " + (this.state.menuType == 'fixed' ? 'primary-color' : '')}
                  onClick={ () => this.setMenu('fixed') }>Fixed</li>
              </ul>
            </div>

            { this.state.menuType == 'relative' ?
              <RelativeRange updateDashboard={ this.updateDashboard } />
              :
              <FixedRange updateDashboard={ this.updateDashboard } />
            }
          </div>
        </FloatMenu>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    range: state.setRanges.range,
    startTime: state.setRanges.startTime,
    endTime: state.setRanges.endTime
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuRange);
