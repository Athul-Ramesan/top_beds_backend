import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from 'src/schema/bookings.model';
import { Property, PropertyDocument } from 'src/schema/property.model';

@Injectable()
export class BookingService {
    constructor(
        @InjectModel(Booking.name) private BookingModel: Model<BookingDocument>,

        @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>
    ) { }

    // async getBooking(){
    //     const name = "hiii"
    //     return name
    // }

    async createBooking(
        userId: string,
        propertyId: string,
        startDate: Date,
        endDate: Date,
        guests: number,
        totalPrice: number
    ): Promise<BookingDocument> {
        const property = await this.propertyModel.findById(propertyId)

        const isAvailable = await this.checkAvailability(
            property,
            startDate,
            endDate
        )

        if (!isAvailable) {
            throw new Error('Property is not available for the selected dates')
        }
        const booking = new this.BookingModel({
            property: propertyId,
            user: userId,
            startDate,
            endDate,
            guests,
            totalPrice
        })
        await this.updatePropertyAvailability(property, startDate, endDate, false)
        return booking.save()
    }

    async checkAvailability(property: Property, startDate: Date, endDate: Date): Promise<boolean> {
        const availability = property.availability;

        for (const range of availability) {
            if ((startDate >= range.startDate && startDate < range.endDate && range.available) || (
                endDate > range.startDate && endDate <= range.endDate && range.available
            )) {
                return false
            }
        }
        return false
    }


    async updatePropertyAvailability(
        property: PropertyDocument,
        startDate: Date,
        endDate: Date,
        available: boolean
    ): Promise<void> {
        const availability = property.availability
        availability.push({
            startDate,
            endDate,
            available
        })
        await property.save()
    }
}
