import { Kafka, Producer, Consumer } from "kafkajs";

// export const kafka = new Kafka({
//     brokers: [String(process.env.KAFKA_BROKER)],
//     clientId: "kafka-user-client",
// });
// export const kafka = new Kafka({
//     clientId: 'kafka-auth-client',
//     brokers: ['pkc-56d1g.eastus.azure.confluent.cloud:9092'],
//     ssl: true,
//     sasl: {
//         mechanism: 'plain',
//         username: 'FDL6FCZJATD3XFEP',
//         password: 'grWiWkJR3eGs5MF3khkpLY2joYN1ESjFdJ9SVUpyOqgYVbI0yUK+Vx2r1GPdjekv',
//     },
//     // logLevel: logLevel.DEBUG, // Enable debug level logging
//     connectionTimeout: 30000,
//     authenticationTimeout: 30000,
// });

export const kafka = new Kafka({
  clientId: 'kafka-user-client',
  brokers: ["54.205.185.57"]
})

export const producer: Producer = kafka.producer();
export const consumer: Consumer = kafka.consumer({
    groupId: "user-service-group",
});