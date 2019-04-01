import React, { Component } from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/_Aux/_Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
<<<<<<< HEAD:src/components/UI/Modal/Modal.js
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }
=======
  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  };
>>>>>>> 3bcd31987bf2b61258d99a81648644414a79f4b0:src/components/UI/Modal/Modal.jsx

  componentWillUpdate() {
    console.log('[Modal] WillUpdate');
  }

  render() {
    return (
      <Aux>
<<<<<<< HEAD:src/components/UI/Modal/Modal.js
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
=======
        <Backdrop clicked={this.props.modalClosed} show={this.props.show}/>
>>>>>>> 3bcd31987bf2b61258d99a81648644414a79f4b0:src/components/UI/Modal/Modal.jsx
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
