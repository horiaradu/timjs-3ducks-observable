import * as React from 'react';
import { failWithDefaultHandler, failWithCustomHandler } from '../actions';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../reducers';

interface Props {
  failWithDefaultHandler: () => Promise<string>;
  failWithCustomHandler: () => Promise<string>;
}

interface OwnProps {}

class ErrorReceiver extends React.Component<Props, {}> {
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
const mapDispatchToProps = (dispatch: Dispatch<OwnProps>) =>
  bindActionCreators({ failWithDefaultHandler, failWithCustomHandler }, dispatch);

export default connect<{}, {}, {}>(mapStateToProps, mapDispatchToProps)(ErrorReceiver);
