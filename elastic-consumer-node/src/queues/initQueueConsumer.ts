import {Channel} from 'amqplib'
import { REVIEWER_CONSUMER } from '../constants/queueConstant'
import { reviewerConsumer } from './consumer/reviewerConsumer'


const initQueueConsumer = async (channel : Channel,serviceType:string) => {

    switch(serviceType){
        case REVIEWER_CONSUMER : {
            await reviewerConsumer(channel)
        }
    }
}





export {
    initQueueConsumer
}