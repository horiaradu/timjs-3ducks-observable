import * as React from 'react';
import { fetchSomeData } from '../actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../reducers';

interface DispatchProps {
  fetchSomeData: () => Promise<string | null>;
}

interface State {
  data: string | null;
}

class UseSetState extends React.Component<DispatchProps, State> {
  state = {
    data: null,
  };

  componentDidMount() {
    this.props.fetchSomeData().then(data => {
      this.setState({ data });
    });
  }

  render() {
    return (
      <div>
        <h1>Using setState</h1>
        {this.state.data}
      </div>
    );
  }
}

// bindActionCreators is not typed :(
const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
  fetchSomeData: () => dispatch(fetchSomeData()),
});

export default connect<{}, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(UseSetState);
