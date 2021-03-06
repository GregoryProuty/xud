import Logger from './Logger';
import { EventEmitter } from 'events';

enum ClientStatus {
  Disabled,
  Disconnected,
  ConnectionVerified,
}

/**
 * A base class to represent a client for an external service such as LND or Raiden.
 */
abstract class BaseClient extends EventEmitter {
  protected status: ClientStatus = ClientStatus.Disabled;

  constructor(protected logger: Logger) {
    super();
  }

  protected setStatus(val: ClientStatus): void {
    this.logger.info(`${this.constructor.name} status: ${ClientStatus[val]}`);
    this.status = val;
  }
  public isConnected(): boolean {
    return this.status === ClientStatus.ConnectionVerified;
  }
  public isDisabled(): boolean {
    return this.status === ClientStatus.Disabled;
  }
  public isDisconnected(): boolean {
    return this.status === ClientStatus.Disconnected;
  }
}

export default BaseClient;
export { ClientStatus };
