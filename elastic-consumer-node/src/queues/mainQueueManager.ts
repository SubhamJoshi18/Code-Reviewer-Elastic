import amqplib, { Connection } from 'amqplib'
import { Channel } from 'diagnostics_channel'


class MainQueueConsumer {

    public connection : Connection
    public channel : Channel

    constructor() {
        this.channel
    }

}



export default MainQueueConsumer