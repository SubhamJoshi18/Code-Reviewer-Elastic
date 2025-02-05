import { Connection ,Channel } from 'amqplib'
import { createConnection } from './createConnection'
import { ConnectionConfig as conConfig } from '../config/queueConfig'
import { createChannel } from './createGenericChannel'


class MainQueueConsumer {

    public connection : Connection | any
    public channel : Channel | any

    constructor() {
        this.connection = createConnection(conConfig)
        this.channel = createChannel(this.connection)
    }


    checkConnectionAlive = async (): Promise<boolean> => {
        return this.connection && this.connection.connection.stream.readable && this.connection.connection.stream.writable;
    };
}



export default MainQueueConsumer