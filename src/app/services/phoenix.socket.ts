import {Socket} from 'phoenix';
import {PhoenixChannel} from './phoenix.channel';

export class PhoenixSocket {
  private readonly socket: Socket;

  constructor(socketUrl: any) {
    this.socket = new Socket(socketUrl);
    this.socket.connect();
  }

  channel(topic: any, params = {}): PhoenixChannel {
    return new PhoenixChannel(this.socket, topic, params);
  }
}
