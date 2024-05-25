import { Kafka, Producer, Consumer } from "kafkajs";

export const kafka = new Kafka({
    brokers: ["localhost:29092"],
    clientId: "kafka-user-client",
});

export const producer: Producer = kafka.producer();
export const consumer: Consumer = kafka.consumer({
    groupId: "user-service-group",
});