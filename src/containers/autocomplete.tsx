import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import { ChangeEvent } from 'react';
import { search, Search } from '../actions/types';

interface StateProps {
  results: string[];
}
interface DispatchProps {
  search: (term: string) => Search;
}

type Props = DispatchProps & StateProps;

class Classic extends React.Component<Props, {}> {
  onInputChnage = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    this.props.search(term);
  };

  render() {
    return (
      <div>
        <h1>Autocomplete</h1>

        <input type="text" onChange={this.onInputChnage} />
        <p>Results: </p>
        <ul>{this.props.results.map(r => <li key={r}>{r}</li>)}</ul>
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
