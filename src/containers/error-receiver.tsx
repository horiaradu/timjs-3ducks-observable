import * as React from 'react';
import { failWithDefaultHandler, failWithCustomHandler } from '../actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../reducers';

interface DispatchProps {
  failWithDefaultHandler: () => Promise<string | null>;
  failWithCustomHandler: () => Promise<void>;
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
