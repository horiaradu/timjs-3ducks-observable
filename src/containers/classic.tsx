import * as React from 'react';
import { fetchSomeData } from '../actions';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../reducers';

interface Props {
  fetchSomeData: () => Promise<string>;
  data: string;
  loading: boolean;
}

interface OwnProps {}

class Classic extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.fetchSomeData();
  }

  render() {
    return (
      <div>
        <h1>Classic approach</h1>
        {this.props.loading ? 'loading...' : this.props.data}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  data: state.main.data,
  loading: state.main.loading,
});
const mapDispatchToProps = (dispatch: Dispatch<OwnProps>) => bindActionCreators({ fetchSomeData }, dispatch);

export default connect<{}, {}, {}>(mapStateToProps, mapDispatchToProps)(Classic);
