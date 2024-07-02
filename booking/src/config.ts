export default {
    kafka:{
        clientId: process.env.KAFKA_CLIENT_ID || "kafka-booking-client",
        broker: process.env.KAFKA_BROKER || "localhost:29092",
        groupId: process.env.KAFKA_GROUP_ID || "booking-kafka-group",
        topic: process.env.KAFKA_TOPIC || "to-booking-service"
    },
    urls:{
        clientURL: process.env.CLIENT_URL || 'http://localhost:5173'
    }
}