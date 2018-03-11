import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import {
  failWithDefaultHandler,
  FailWithDefaultHandler,
  failWithCustomHandler,
  FailWithCustomHandler,
} from '../actions/types';

interface DispatchProps {
  failWithDefaultHandler: () => FailWithDefaultHandler;
  failWithCustomHandler: () => FailWithCustomHandler;
}

class ErrorReceiver extends React.Component<DispatchProps, {}> {
  render() {
    return (
      <div>
        <h1>Error handler</h1>
        <button onClick={this.props.failWithDefaultHandler}>Default Error handler</button>
        <button onClick={this.props.failWithCustomHandler}>Custom Error handler</button>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
  failWithDefaultHandler: () => dispatch(failWithDefaultHandler()),
  failWithCustomHandler: () => dispatch(failWithCustomHandler()),
});

export default connect<{}, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(ErrorReceiver);
