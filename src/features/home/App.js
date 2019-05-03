import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Recommand from './Recommand';
import Footer from './Footer';
/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/


export class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    const { registerUser } = this.props.actions;
    try {
      const user = JSON.parse(
        document.querySelector('#root') &&
          document.querySelector('#root').getAttribute('data-django'),
      );
      console.log('user', user);
      {/*registerUser(user);*/}
    } catch (err) {
      console.error('Failed to parse data', err);
    }
  }


  render() {
 
    return (
      <div className="container-fluid test">

        

      
        <div className="row justify-content-md-center">

          <div className="scroll col-2 col-md-2" />
          <div className="centre col-8 col-md-8 col-centered">
            <Recommand />
          </div>
          <div className="scroll col-2 col-md-2" />
        </div>
        <Footer />
      </div>
    );
  }
}
/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
