import { Injectable, OnModuleInit } from '@nestjs/common';
import { Consumer, Kafka } from 'kafkajs';
import { ConfigService } from '@nestjs/config'
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/chat/schema/user.model';

@Injectable()
export class KafkaService implements OnModuleInit {
    private kafka: Kafka;
    private consumer: Consumer;

    constructor(private configService: ConfigService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {
        this.kafka = new Kafka({
            clientId: this.configService.get<string>('KAFKA_CLIENT_ID'),
            brokers: [
                this.configService.get<string>('KAFKA_BROKER')
            ]
        })
    }
    async onModuleInit() {
        this.consumer = this.kafka.consumer({
            groupId: this.configService.get<string>("KAFKA_GROUP_ID"),
        });

        await this.consumer.connect();
        await this.consumer.subscribe({
            topic: this.configService.get<string>("KAFKA_TOPIC"),
            fromBeginning: true
        })
        await this.consumer.run({
            eachMessage: async ({
                topic,
                partition,
                message
            }) => {
                if(message){
                const { key, value } = message
                const subscriberMethod = String(key)
                console.log(`Received message from key:${message.key} value:${message.value} on topic ${topic} partition ${partition}`)
                if (subscriberMethod === 'userCreated') {
                    const userData = JSON.parse(value.toString())
                    const newUser = new this.userModel(userData)
                    const savedUser = await newUser.save()
                    console.log("🚀 ~ KafkaService ~ onModuleInit ~ savedUser:", savedUser)
                }
                if (subscriberMethod === 'updateUserData') {
                    try {
                        const { _id, ...updatePayload } = JSON.parse(value.toString())
                        const resultUser = await this.userModel.findByIdAndUpdate(
                            _id,
                            { $set: updatePayload },
                            { new: true }
                        )

                        console.log("🚀 ~ KafkaService ~ onModuleInit ~ resultUser:", resultUser)
                    } catch (error: any) {
                        console.log("🚀 ~ KafkaService ~ onModuleInit ~ error:", error)

                    }
                }

                
                if (subscriberMethod === 'userStatusUpdate') {
                    try {
                        const { _id, isBlocked } = JSON.parse(value.toString())
                        console.log("🚀 ~ KafkaService ~ onModuleInit ~ isBlocked:", !isBlocked)
                        const user = await this.userModel.findById(_id)
                        console.log("🚀 ~ KafkaService ~ onModuleInit ~ user:", user)

                        const updatedUser = await this.userModel.findOneAndUpdate(
                            { _id: _id },
                            { $set: { isBlocked: !isBlocked } },
                            { new: true })

                        console.log("🚀 ~ KafkaService ~ onModuleInit ~ updatedUser:", updatedUser)
                    } catch (error: any) {
                        console.log("🚀 ~ KafkaService ~ onModuleInit ~ error:", error)
                    }
                }
                if (subscriberMethod === "profileImageUpdate") {
                    const { id, image } = JSON.parse(value.toString())
                    console.log("🚀 ~ KafkaService ~ onModuleInit ~ image:", image)
                    try {
                        const result = await this.userModel.findByIdAndUpdate(
                            id,
                            { profileImage: image }
                            , { new: true })
                        console.log("🚀 ~ KafkaService ~ onModuleInit ~ result:", result)

                    } catch (error: any) {
                        console.log("🚀 ~ KafkaService ~ onModuleInit ~ error:", error)
                    }
                }
                if (subscriberMethod === 'becomeHost') {
                    const { _id, address } = JSON.parse(value.toString())
                    try {
                        const result = await this.userModel.findByIdAndUpdate(
                            _id,
                            { $set: { address ,role:'host'}, },
                            { new: true }
                        )
                        console.log("🚀 ~ KafkaService ~ onModuleInit ~ result:", result)
                    } catch (error: any) {
                        console.log("🚀 ~ KafkaService ~ onModuleInit ~ error:", error)

                    }
                }
            }
            }
        })
    }


}
