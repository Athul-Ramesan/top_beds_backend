import { HttpService } from '@nestjs/axios';
import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model, Types } from 'mongoose';
import { catchError, firstValueFrom } from 'rxjs';
import { BookingException } from 'src/booking.exception';
import { Booking, BookingDocument } from 'src/schema/bookings.model';
import { Property, PropertyDocument } from 'src/schema/property.model';
import { SubscriptionUpdateException } from 'src/subscription/subscription.exception';
import Stripe from 'stripe';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private BookingModel: Model<BookingDocument>,

    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
    private httpService: HttpService
  ) { }


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
      throw new HttpException('Property is not available for the selected dates', HttpStatus.NOT_FOUND)
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
    return booking.save()

    // try {
    //     const response = await axios.patch('http://localhost:5000/property/update-property-availability', 
    //         {propertyId: property._id, availability: property.availability}, 
    //         {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             withCredentials: true,
    //         }
    //     );


    //     console.log("🚀 ~ BookingController ~ response:", response.data);
    // } catch (error) {
    //     if (axios.isAxiosError(error)) {
    //         console.error("Axios error:", error.response?.data || error.message);
    //     } else {
    //         console.error("Error updating property availability:", error);
    //     }
    //     throw new BadRequestException('Failed to update property availability');
    // }
  }
  async confirmBooking(confirmBookingData) {
    const { propertyId, startDate, endDate, bookingId, session_id } = confirmBookingData
    const stripeInstance = new Stripe(String(process.env.STRIPE_SECRET))
    console.log("🚀 ~ BookingService ~ confirmBooking ~ confirmBookingData:", confirmBookingData)
    const property = await this.propertyModel.findById(propertyId)
    console.log("🚀 ~ BookingService ~ confirmBooking ~ property:", property)
    const bookingDetailsForGetPrice = await this.BookingModel.findById(bookingId)
    const totalPrice = bookingDetailsForGetPrice.totalPrice
    const retrievePayment = await stripeInstance.checkout.sessions.retrieve(session_id)
    console.log("🚀 ~ BookingService ~ confirmBooking ~ retrievePayment:", retrievePayment)
    const paymentIntentId = retrievePayment.payment_intent
    console.log("🚀 ~ BookingService ~ confirmBooking ~ paymentIntentId:", paymentIntentId)
    const booking = await this.BookingModel.findByIdAndUpdate(bookingId,
      { bookingStatus: 'Accepted', paymentStatus: 'Paid', paymentIntentId }, { new: true }
    )
    console.log("🚀 ~ BookingService ~ confirmBooking ~ booking:", booking)

    await this.updatePropertyAvailability(property, startDate, endDate, false)



    // try {
    //         const response = await axios.patch('http://localhost:5000/property/update-property-availability', 
    //             {propertyId: property._id, availability: property.availability}, 
    //             {
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 },
    //                 withCredentials: true,
    //             }
    //         );


    //         console.log("🚀 ~ BookingController ~ response:", response.data);
    //     } catch (error) {
    //         if (axios.isAxiosError(error)) {
    //             console.error("Axios error:", error.response?.data || error.message);
    //         } else {
    //             console.error("Error updating property availability:", error);
    //         }
    //         throw new BadRequestException('Failed to update property availability');
    //     }




    try {
      const property = await this.propertyModel.findById(propertyId)
      const { data } = await firstValueFrom(
        this.httpService.patch('http://localhost:5000/property/update-property-availability', { propertyId: property._id, availability: property.availability }).pipe(
          catchError((error) => {
            throw new SubscriptionUpdateException(`Failed to update subscription: ${error.response?.data?.message || error.message}`);
          })
        )
      );

    } catch (error) {
      if (error instanceof SubscriptionUpdateException) {
        throw error;
      }
      return booking
    }
    return booking
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

  async checkAvailability(property: Property, startDate: Date, endDate: Date): Promise<boolean> {
    const availability = property.availability
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


  async createPaymentIntent(amount: number) {
    const stripeInstance = new Stripe(String(process.env.STRIPE_SECRET))
    return await stripeInstance.paymentIntents.create({
      amount,
      currency: 'inr',
      payment_method_types: ['card'],
    });
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
  async getSessionStatus(sessionId: string) {
    console.log("🚀 ~ SubscriptionService ~ getSessionStatus ~ sessionId:", sessionId)
    const stripeInstance = new Stripe(String(process.env.STRIPE_SECRET))

    const session = await stripeInstance.checkout.sessions.retrieve(sessionId);
    return session;
  }

  async getUserBookings(userId: string) {
    const currentDate = new Date();
    console.log("🚀 ~ BookingService ~ getUserBookings ~ currentDate:", currentDate)

    const upcomingBookings = await this.BookingModel.find({
      user: userId,
      startDate: { $gte: currentDate },
    })
    .sort({ createdAt: -1 })
    .populate('property').populate('user')
    console.log("🚀 ~ BookingService ~ getUserBookings ~ upcomingBookings:", upcomingBookings)
    const allBookings = await this.BookingModel.find()
    console.log("🚀 ~ BookingService ~ getUserBookings ~ allBookings:", allBookings)

    const completedBookings = await this.BookingModel.find({
      user: userId,
      endDate: { $lt: currentDate },
    })
    .sort({ createdAt: -1 })
    .populate('property').populate('user')
    console.log("🚀 ~ BookingService ~ getUserBookings ~ completedBookings:", completedBookings)

    return { upcomingBookings, completedBookings };
  }
  async getHostBookings(hostId: string) {
    const currentDate = new Date();

    // Find properties managed by the host
    const properties = await this.propertyModel.find({ hostId: hostId });
    const propertyIds = properties.map(property => property._id);


    const allBookings = await this.BookingModel.find({ property: { $in: propertyIds } })
      .sort({ createdAt: -1 })
      .populate('property', 'title')
      .exec();
    const upcomingBookings = await this.BookingModel.find({
      property: { $in: propertyIds },
      startDate: { $gte: currentDate },
    })
    .sort({ createdAt: -1 })
    .populate('property').populate('user')
    console.log("🚀 ~ BookingService ~ getHostBookings ~ upcomingBookings:", upcomingBookings)

    const completedBookings = await this.BookingModel.find({
      property: { $in: propertyIds },
      endDate: { $lt: currentDate },
    })
    .sort({ createdAt: -1 })
    .populate('property').populate('user')
   
    return { allBookings, upcomingBookings, completedBookings };
  }
  async getBookingById(bookingId: string): Promise<Booking> {
    const booking = await this.BookingModel.findById( new Types.ObjectId(bookingId)).populate('property').populate('user');
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  async cancelBooking(bookingId: string, refundPercentage: number) {
    try {
      const booking = await this.BookingModel.findById(bookingId).populate('property');
      if (!booking) {
        throw new NotFoundException('Booking not found');
      }
      const refundAmount = Math.round((booking.totalPrice * refundPercentage) / 100);
      console.log("Refund amount:", refundAmount);

      const stripeInstance = new Stripe(process.env.STRIPE_SECRET);

      let paymentIntent;
      try {
        paymentIntent = await stripeInstance.paymentIntents.retrieve('pi_3PWtBd05vcABQvkG11n1NWK0');
        console.log("Payment Intent retrieved:", paymentIntent);
      } catch (stripeError) {
        console.error("Error retrieving PaymentIntent:", stripeError);
        throw new BadRequestException('Invalid PaymentIntent ID');
      }

      let refund;
      try {
        refund = await stripeInstance.refunds.create({
          payment_intent: paymentIntent.id,
          amount: refundAmount,
        });
        console.log("Refund processed:", refund.id);
      } catch (refundError) {
        console.error("Error processing refund:", refundError);
        throw new BadRequestException('Failed to process refund');
      }

      booking.bookingStatus = 'Cancelled';
      await booking.save();

      const property = await this.propertyModel.findById(booking.property._id);
      if (property) {
        property.availability = property.availability.map((slot) => {
          if (slot.startDate <= booking.endDate && slot.endDate >= booking.startDate) {
            slot.available = true;
          }
          return slot;
        });
        await property.save();
      }

      try {
        const { data } = await firstValueFrom(
          this.httpService.patch('http://localhost:5000/property/update-property-availability',
            { propertyId: property._id, availability: property.availability }
          ).pipe(
            catchError((error) => {
              console.error("Error updating property availability:", error);
              throw new SubscriptionUpdateException(`Failed to update subscription: ${error.response?.data?.message || error.message}`);
            })

          )
        );
        console.log("Property availability updated");
      } catch (error) {
        if (error instanceof SubscriptionUpdateException) {
          throw error;
        }
        console.error("Error in HTTP request:", error);
      }

      return { message: 'Booking cancelled and partially refunded successfully', refundAmount };
    } catch (error) {
      console.error("Error in cancelBooking:", error);
      if (error instanceof NotFoundException || error instanceof BadRequestException || error instanceof SubscriptionUpdateException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred while processing the cancellation');
    }

  }
}
