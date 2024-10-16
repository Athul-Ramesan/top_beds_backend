import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'kafka-auth-client',
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
//     clientId: 'kafka-auth-client',
//     brokers: ["54.205.185.57:29092"]
//   })

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "auth-kafka-group" });