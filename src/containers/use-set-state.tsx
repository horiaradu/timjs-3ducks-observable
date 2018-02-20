import * as React from 'react';
import { fetchSomeData } from '../actions';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

interface Props {
  fetchSomeData: () => Promise<string>;
}

interface State {
  data: string | null;
}

interface OwnProps {}

class UseSetState extends React.Component<Props, State> {
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
const mapDispatchToProps = (dispatch: Dispatch<OwnProps>) => bindActionCreators({ fetchSomeData }, dispatch);

export default connect<{}, {}, {}>(mapStateToProps, mapDispatchToProps)(UseSetState);
