import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from 'src/schema/bookings.model';
import { Property } from 'src/schema/property.model';
import { User } from 'src/schema/user.model';

@Injectable()
export class DashboardService {
    constructor(
        @InjectModel(Booking.name) private bookingModel: Model<Booking>,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Property.name) private propertyModel: Model<Property>,
      ) {}
    
      async getKeyMetrics() {
        const activeBookings = await this.bookingModel.countDocuments({ bookingStatus: 'Accepted' });
        const totalRevenue = await this.bookingModel.aggregate([
          { $match: { bookingStatus: 'Accepted', paymentStatus: 'Paid' } },
          { $group: { _id: null, total: { $sum: '$totalPrice' } } },
        ]);
        const totalUsers = await this.userModel.countDocuments();
        const propertiesListed = await this.propertyModel.countDocuments();
    
        return {
          activeBookings,
          totalRevenue: totalRevenue[0]?.total || 0,
          totalUsers,
          propertiesListed,
        };
      }
    
      async getGraphsData() {
        const bookingsOverTime = await this.bookingModel.aggregate([
          { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
          { $sort: { '_id': 1 } },
        ]);
        console.log("🚀 ~ DashboardService ~ getGraphsData ~ bookingsOverTime:", bookingsOverTime)
    
        const revenueTrends = await this.bookingModel.aggregate([
          { $match: { bookingStatus: 'Accepted', paymentStatus: 'Paid' } },
          { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, total: { $sum: '$totalPrice' } } },
          { $sort: { '_id': 1 } },
        ]);
        console.log("🚀 ~ DashboardService ~ getGraphsData ~ revenueTrends:", revenueTrends)
    
        const userGrowth = await this.userModel.aggregate([
          { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
          { $sort: { '_id': 1 } },
        ]);
        console.log("🚀 ~ DashboardService ~ getGraphsData ~ userGrowth:", userGrowth)
    
        
    
        return {
          bookingsOverTime,
          revenueTrends,
          userGrowth,
        //   occupancyRates,
        };
      }
    
      async getRecentActivities() {
        const latestBookings = await this.bookingModel.find()
          .sort({ createdAt: -1 })
          .limit(5)
          .populate('user property');
        
        const latestCancellations = await this.bookingModel.find({ bookingStatus: 'Cancelled' })
          .sort({ updatedAt: -1 })
          .limit(5)
          .populate('user property');
        
        const newUserRegistrations = await this.userModel.find()
          .sort({ createdAt: -1 })
          .limit(5);
        
        const newPropertyListings = await this.propertyModel.find()
          .sort({ createdAt: -1 })
          .limit(5)
          .populate('hostId');
    
        return {
          latestBookings,
          latestCancellations,
          newUserRegistrations,
          newPropertyListings,
        };
      }

      async getAllHostsReservationsAndEarnings() {
        const hostsData = await this.userModel.aggregate([
          {
            $match: { role: 'host' }
          },
          {
            $lookup: {
              from: 'properties',
              localField: '_id',
              foreignField: 'hostId',
              as: 'properties'
            }
          },
          { $unwind: { path: '$properties', preserveNullAndEmptyArrays: true } },
          {
            $lookup: {
              from: 'bookings',
              localField: 'properties._id',
              foreignField: 'property',
              as: 'bookings'
            }
          },
          {
            $group: {
              _id: '$_id',
              firstName: { $first: '$firstName' },
              lastName: { $first: '$lastName' },
              email: { $first: '$email' },
              totalProperties: { $sum: 1 },
              totalReservations: { $sum: { $size: '$bookings' } },
              totalEarnings: { $sum: { $sum: '$bookings.totalPrice' } }
            }
          },
          { $sort: { totalReservations: -1 } }
        ]);
    
        return hostsData;
      }
}