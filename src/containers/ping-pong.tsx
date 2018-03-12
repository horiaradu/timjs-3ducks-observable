import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import {
  connectToSocket,
  ConnectToSocket,
  sendMessage,
  SendMessage,
  DisconnectFromSocket,
  disconnectFromSocket,
} from '../actions/types';

interface StateProps {
  messages: string[];
}
interface DispatchProps {
  connect: () => ConnectToSocket;
  disconnect: () => DisconnectFromSocket;
  sendMessage: (msg: string) => SendMessage;
}

type Props = DispatchProps & StateProps;

class PingPong extends React.Component<Props, {}> {
  sendMessage = () => {
    const word = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
      .map(x => ('z'.charCodeAt(0) - 'A'.charCodeAt(0)) * x + 'A'.charCodeAt(0))
      .map(x => String.fromCharCode(x))
      .join('');
    this.props.sendMessage(word);
  };

  componentDidMount() {
    this.props.connect();
  }

  render() {
    return (
      <div>
        <h1>Sockets</h1>

        <button onClick={this.sendMessage}>Send</button>
        <button onClick={this.props.disconnect}>Disconnect</button>

        <ul>{this.props.messages.map(r => <li key={r}>{r}</li>)}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  messages: state.main.messages,
});
const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
  connect: () => dispatch(connectToSocket()),
  disconnect: () => dispatch(disconnectFromSocket()),
  sendMessage: (term: string) => dispatch(sendMessage(term)),
});

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(PingPong);
