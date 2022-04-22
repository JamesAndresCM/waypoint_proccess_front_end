import { Socket, Channel } from 'phoenix';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

export class PhoenixChannel {

  private channel: Channel;
  constructor(socket: Socket, topic: string, params = {}) {
    this.channel = socket.channel(topic, params);
  }

  join() {
    return new Observable((observer) => {
      this.channel.join()
        .receive('ok', (resp) => {
          observer.next(resp);
        })
        .receive('error', (resp) => {
          observer.error(resp);
        });
    });
  }

  push(message: string, payload: any, timeout?: number) {
    this.channel.push(message, payload, timeout);
  }

  leave(timeout?: number) {
    this.channel.leave(timeout);
  }

  messages(message: any) {
    return new Observable((observer) => {
      this.channel.on(message, (resp) => {
        observer.next(resp);
      });
    }).pipe(
      share(),
    );
  }
}
