import { Kafka } from "kafkajs";

export const kafka =  new Kafka({
    brokers: [String(process.env.KAFKA_BROKER)],
    clientId:"kafka-auth-client",
    
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "auth-kafka-group" });