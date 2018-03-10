import * as React from 'react';
import { search } from '../actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../reducers';

interface StateProps {
  results: string[] | null;
}
interface DispatchProps {
  search: (term: string) => Promise<void>;
}

type Props = DispatchProps & StateProps;

class Classic extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.search('foobar');
  }

  render() {
    return (
      <div>
        <h1>Classic approach</h1>
        {this.props.results}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  results: state.main.results,
});
const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
  search: (term: string) => dispatch(search(term)),
});

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Classic);
