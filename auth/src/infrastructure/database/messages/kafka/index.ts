import { Kafka } from "kafkajs";

// const kafka = new Kafka({
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
    clientId: 'kafka-auth-client',
    brokers: ["54.205.185.57:29092"]
  })

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "auth-kafka-group" });