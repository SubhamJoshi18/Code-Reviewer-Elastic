import { Connection ,Channel } from 'amqplib'
import { createConnection } from './createConnection'
import { ConnectionConfig as conConfig } from '../config/queueConfig'
import { initQueueConsumer } from './initQueueConsumer'
import { createChannel } from './createGenericChannel'
import { getArgvCommand } from '../utils/getArgv'
class MainQueueConsumer {
    public connection: Connection | any;
    public channel: Channel | any;

    private constructor(connection: Connection) {
        this.connection = connection;
    }

    static async create(): Promise<MainQueueConsumer> {
        const connection = await createConnection(conConfig);
        const instance = new MainQueueConsumer(connection);
        await instance.init();
        return instance;
    }

    private async checkConnectionAlive(): Promise<boolean> {
        return this.connection ? true : false;
    }

    private async init() {
        const isConnectionAlive = await this.checkConnectionAlive();
        if (isConnectionAlive) {
            this.channel = await createChannel(this.connection);
            await initQueueConsumer(this.channel, getArgvCommand());
        }
    }
}

export default MainQueueConsumer