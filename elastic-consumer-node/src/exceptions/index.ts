

class AMQPException extends Error {

    constructor(message : string) {
        super(message)
        this.name = 'AMQP Exception'
        this.message = message
        this.stack = this.stack
    }


    getErrorMessage () : string {
        return this.message
    }


    getErrorStack() : any {
        return this.stack
    }

}

export {
    AMQPException
}