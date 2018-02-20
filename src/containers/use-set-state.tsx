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
      console.log(data);
    });
  }

  render() {
    return <div>{this.state.data}</div>;
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: Dispatch<OwnProps>) => bindActionCreators({ fetchSomeData }, dispatch);

export default connect<{}, {}, {}>(mapStateToProps, mapDispatchToProps)(UseSetState);
