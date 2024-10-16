import { Kafka, Producer, Consumer } from "kafkajs";

// export const kafka = new Kafka({
//     brokers: [String(process.env.KAFKA_BROKER)],
//     clientId: "kafka-user-client",
// });
const kafka = new Kafka({
    clientId: 'kafka-user-client',
    brokers: ['pkc-4j8dq.southeastasia.azure.confluent.cloud:9092'],
    ssl: true,
    sasl: {
      mechanism: 'plain',
      username: 'IGI4TMEEZDD5XDZG',
      password:'KYygx3UkksOGC9+Iur1t5EPU3MlyQfY2qBgJ1zHfxW3leYtYefDoikTYcR8EjsPk',
    },
    connectionTimeout: 30000, 
      authenticationTimeout: 30000, 
  
  });

// export const kafka = new Kafka({
//   clientId: 'kafka-user-client',
//   brokers: ["54.205.185.57:29092"]
// })

export const producer: Producer = kafka.producer();
export const consumer: Consumer = kafka.consumer({
    groupId: "user-service-group",
});