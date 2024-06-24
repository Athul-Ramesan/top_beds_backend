import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
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
        console.log("🚀 ~ BookingService ~ property:", property)

        const isAvailable = await this.checkAvailability(
            property,
            startDate,
            endDate
        )
        console.log("🚀 ~ BookingService ~ isAvailable:", isAvailable)

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

        console.log("🚀 ~ BookingService ~ booking:", booking)
        await this.updatePropertyAvailability(property, startDate, endDate, false)
        try {
            const response = await axios.patch('http://localhost:5000/property/update-property-availability', 
                {propertyId: property._id, availability: property.availability}, 
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                }
            );

            console.log("🚀 ~ BookingController ~ response:", response.data);
            return booking.save()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.response?.data || error.message);
            } else {
                console.error("Error updating property availability:", error);
            }
            throw new Error('Failed to update property availability');
        }
    }

    // async checkAvailability(property: Property, startDate: Date, endDate: Date): Promise<boolean> {
    //     const availability = property.availability;

    //     for (const range of availability) {
    //         if ((startDate >= range.startDate && startDate < range.endDate && range.available) || (
    //             endDate > range.startDate && endDate <= range.endDate && range.available
    //         )) {
    //             console.log('inside availability checking👉👉👉👉👉👉👉')
    //             return false
    //         }
    //     }
    //     return true
    // }
    async  checkAvailability(property: Property, startDate: Date, endDate: Date): Promise<boolean> {
        const availability = property.availability;
        for (const range of availability) {
          if (
            (startDate < range.endDate && endDate > range.startDate) && 
            !range.available
          ) {
            console.log('inside availability checking👉👉👉👉👉👉👉');
            return false; // Unavailable
          }
        }
        return true; // Available
      }

    async updatePropertyAvailability(
        property: PropertyDocument,
        startDate: Date,
        endDate: Date,
        available: boolean
    ): Promise<void> {
        const availability = property.availability
        console.log("🚀 ~ BookingService ~ availability:", availability)
        availability.push({
            startDate,
            endDate,
            available
            })
        console.log("🚀 ~ BookingService ~ availability: after pushing ", availability)
        await property.save()
    }
}
