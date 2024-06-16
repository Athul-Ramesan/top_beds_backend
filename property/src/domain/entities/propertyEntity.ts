import { ObjectId } from "mongoose";

export interface IProperty{
        title: string;
        description: string;
        hostId:ObjectId
        location?: {
          address: string;
          city: string;
          state: string;
          country: string;
          coordinates: { lat: number; lng: number };
        };
        amenities: string[];
        houseRules: string[];
        price: number;
        images: string[];
        bedrooms: number;
        bathrooms: number;
        maxGuests: number;
        host: string;
        category: string;
        createdAt: Date;
        updatedAt: Date;
        
      }