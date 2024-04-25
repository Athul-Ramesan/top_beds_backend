import { Kafka } from "kafkajs";

export const kafka =  new Kafka({
    brokers: ["localhost:29092"],
    clientId:"kafka-auth-client",
    
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "auth-kafka-group" });