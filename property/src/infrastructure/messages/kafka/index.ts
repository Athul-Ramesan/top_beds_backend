import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    brokers:[String(process.env.KAFKA_BROKER)],
    clientId: "kafka-property-client"
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({
    groupId: "kafka-property-group"
})