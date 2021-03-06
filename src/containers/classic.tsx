import * as React from 'react';
import { fetchSomeData } from '../actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../reducers';

interface StateProps {
  data: string | null;
  loading: boolean;
}
interface DispatchProps {
  fetchSomeData: () => Promise<string | null>;
}

type Props = DispatchProps & StateProps;

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
const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
  fetchSomeData: () => dispatch(fetchSomeData()),
});

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Classic);
