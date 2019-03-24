import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
      state = {
        error: null
      };

      componentWillMount() {
        console.log('[withErrorHandler] componentWillMount');
        axios.interceptors.request.use(req => {
          this.setState({ error: null });
          return req;
        });
        axios.interceptors.response.use(res => {
          return res;
        }, error => {
          this.setState({ error: error });
        });
      }

      componentDidMount() {
        console.log('[withErrorHandler] componentDidMount');
      }

      errorConfirmedHandler = () => {
        this.setState({ error: null });
      };

      render() {
        return (
          <Aux>
            <Modal show={this.state.error}
                   modalClosed={this.errorConfirmedHandler}>
              {this.state.error ? this.state.error.message : null}
            </Modal>
            <WrappedComponent {...this.props}/>
          </Aux>
        );
      }
    };
  }
;

export default withErrorHandler;