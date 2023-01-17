import { databus, IResourceOpsCollect } from '@apitable/core';
import { ClientDataLoader } from './client.data.loader';

export interface IDataStorageProvider {
  /**
   * @desc The method that applies command to generate an op, which is passed in as a callback function when the CommandManager is initialized.
   * This method is responsible for only two things.
   * 1. Apply the op generated by command to the local.
   * 2. Send op to intermediate layer via socket.
   * @param resourceOpsCollects
   */
  operationExecuted(resourceOpsCollects: IResourceOpsCollect[]): void;
}

export class ClientDataStorageProvider extends ClientDataLoader implements databus.IDataStorageProvider {
  private readonly operationExecuted: (resourceOpsCollects: IResourceOpsCollect[]) => void;

  constructor(options: IDataStorageProvider) {
    super();
    this.operationExecuted = options.operationExecuted;
  }

  saveOps(ops: IResourceOpsCollect[]): Promise<any> | any {
    this.operationExecuted(ops);
  }
}
