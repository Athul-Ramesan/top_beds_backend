import { Injectable, OnModuleInit } from '@nestjs/common';
import { Consumer, Kafka } from 'kafkajs';
import { ConfigService } from '@nestjs/config'
import { User, UserDocument } from 'src/schema/user.model';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Property, PropertyDocument } from 'src/schema/property.model';

@Injectable()
export class KafkaService implements OnModuleInit {
    private kafka: Kafka;
    private consumer: Consumer;

    constructor(private configService: ConfigService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>
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
                if (subscriberMethod === 'propertyCreated') {
                    const property = JSON.parse(value.toString())
                    console.log("🚀 ~ KafkaService ~ onModuleInit ~ property:", property)

                    const newProperty = new this.propertyModel(property)
                    const savedProperty = await newProperty.save()
                    console.log("🚀 ~ KafkaService ~ onModuleInit ~ savedProperty:", savedProperty)
                }
                if (subscriberMethod === 'propertyUpdated') {
                    const { _id, ...data } = JSON.parse(value.toString())
                    try {
                        console.log("🚀 ~ KafkaService ~ onModuleInit ~ data:", data)

                        const result = await this.propertyModel.findByIdAndUpdate(
                            _id,
                            { $set: data },
                            { new: true }
                        )

                    } catch (error: any) {
                        console.log("🚀 ~ KafkaService ~ onModuleInit ~ error:", error)

                    }
                }
                if (subscriberMethod === 'propertyImageAdded') {
                    const { id, images } = JSON.parse(value.toString())
                    console.log("🚀 ~ KafkaService ~ onModuleInit ~ images property imagess:", images)

                    const result = await this.propertyModel.findByIdAndUpdate(
                        id,
                        {
                            $push: {
                                images: {
                                    $each: images
                                }
                            }
                        },
                        { new: true }
                    )
                    console.log("🚀 ~ KafkaService ~ onModuleInit ~ result:", result)
                }
                if (subscriberMethod === 'propertyImageDeleted') {
                    const { id, image } = JSON.parse(value.toString())
                    const updatedProperty = await this.propertyModel.findByIdAndUpdate(
                        id,
                        {
                            $pull: {
                                images: image
                            }
                        },
                        { new: true }
                    )
                    console.log("🚀 ~ KafkaService ~ onModuleInit ~ updatedProperty:", updatedProperty)
                }
            }
        })
    }


}
