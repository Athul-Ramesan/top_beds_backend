import { Kafka, Producer, Consumer } from "kafkajs";

export const kafka = new Kafka({
    brokers: [String(process.env.KAFKA_BROKER)],
    clientId: "kafka-user-client",
});

export const producer: Producer = kafka.producer();
export const consumer: Consumer = kafka.consumer({
    groupId: "user-service-group",
});