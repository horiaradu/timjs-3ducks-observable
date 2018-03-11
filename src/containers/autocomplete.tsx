import * as React from 'react';
import { search } from '../actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import { ChangeEvent } from 'react';
import { debounce } from 'underscore';

interface StateProps {
  results: string[];
}
interface DispatchProps {
  search: (term: string) => Promise<void>;
}

type Props = DispatchProps & StateProps;

class Classic extends React.Component<Props, {}> {
  performSearch = debounce((term: string) => this.props.search(term), 300);

  onInputChnage = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    this.performSearch(term);
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
