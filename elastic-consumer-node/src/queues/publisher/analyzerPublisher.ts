import { Channel } from "amqplib";
import { elasticLogger } from "../../libs/common.logger";
import { analyzerConfig } from "../../config/reviewerConfig";
import { IQueueConfig } from "../types";

export const publishToAnalyzer = async (channel: Channel, data: any): Promise<boolean> => {
    const { queueName, exchange, routingKey }: IQueueConfig = analyzerConfig;

    try {
       
        await channel.assertExchange(exchange, "direct", { durable: true });

        await channel.assertQueue(queueName, { durable: true });
        await channel.bindQueue(queueName, exchange, routingKey);


        await channel.prefetch(1);


        const content = Buffer.from(JSON.stringify(data));


        const isPublished = channel.publish(exchange, routingKey, content, { persistent: true });

        if (isPublished) {
            elasticLogger.info(`Message sent successfully to queue: ${queueName}`);
        } else {
            elasticLogger.warn(`Message could not be published to queue: ${queueName}`);
        }

        return isPublished;
    } catch (err: any) {
        elasticLogger.error(`Error publishing to analyzer queue: ${err.message}`);
        return false;
    }
};
