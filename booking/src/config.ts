export default {
    kafka:{
        clientId: process.env.KAFKA_CLIENT_ID || "kafka-booking-client",
        broker: process.env.KAFKA_BROKER || "localhost:29092",
        groupId: process.env.KAFKA_GROUP_ID || "booking-kafka-group",
        topic: process.env.KAFKA_TOPIC || "to-booking-service"
    },
    urls:{
        clientURL: String(process.env.CLIENT_URL) || 'http://localhost:5173',
        mongoUrI: String(process.env.MONGO_CONNECTION) || "mongodb://127.0.0.1:27017/topbeds-booking-service"
    },
    Port:{
        booking: process.env.PORT || 3003
    },
    google:{
        password: process.env.GOOGLE_PASSWORD || "sobd zzhf wlgc jcaf"
    }
}