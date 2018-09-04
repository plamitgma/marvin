import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getFlight } from 'actions/flight';
import { getUser } from '../actions/user';
import { fetchFork, fetchRace } from '../actions/effect';

class Flight extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    window.dispatch = dispatch;
    dispatch(getUser());
  }

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(getFlight());
  }
  handleFetchUser = () => {
    const { dispatch } = this.props;
    dispatch(getUser());
  }

  handleTestEffect = () => {
    const { dispatch } = this.props;
    dispatch(fetchRace());
    dispatch(fetchFork());
  }

  render() {
    const { user, flight3: flight} = this.props;
    // if (!user.email) {
    //   this.startDate = new Date().toString();
    // }
    // if (!this.endDate && flight.forecast && flight.forecast.forecast &&
    //   flight.flight && flight.flight.name) {
    //   this.endDate = new Date().toString();
    // }
    return (
      <div>
        <div>
          <button onClick={ this.handleFetchUser }>Fetch User</button>
        </div>
        <div>
          <button onClick={ this.handleClick }>Fetch Data</button>
        </div>
        <div>
          <button onClick={ this.handleTestEffect }>Fetch Effect</button>
        </div>
        {/*<h1>{this.startDate}</h1>*/}
        <h1>User: {user.email}</h1>
        <h1>Departure: {flight.departure ? flight.departure.date : ''}</h1>
        <h1>Flight: {flight.flight ? flight.flight.name : ''}</h1>
        <h1>Forecast: {flight.forecast ? flight.forecast.forecast : ''}</h1>
        {/*<h1>{this.endDate}</h1>*/}
      </div>
    );
  }
}

const mapStateToProps = (
  {
    user, flight, flight2, flight3,
  }) => {
  return {
    user,
    flight,
    flight2,
    flight3,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

Flight.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.shape({}),
  // flight: PropTypes.shape({}),
  // flight2: PropTypes.shape({}),
  flight3: PropTypes.shape({}),
};

export default connect(mapStateToProps, mapDispatchToProps)(Flight);
