import { IProperty } from "@/domain/entities/propertyEntity";
import mongoose, { Schema, model } from "mongoose";


const PropertySchema: Schema = new Schema(
    {
      title: { type: String },
      description: { type: String },
      location:{
        type:String
      },
      hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' // Referring to the User model
      },
      reviews:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref:"Review"
        }
      ],
      
      active : {
        type: Boolean,
        default: false
      },
      address:{
        type:String
      },
      amenities: { type: [String],},
      houseRules: { type: [String],  },
      price: { type: Number, },
      images: { type: [String], },
      bedrooms: { type: Number},
      bathrooms: { type: Number },
      maxGuests: { type: Number },
      host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      category:{
        type:String,
        enum:['House','Resort','Cabin','Apartment']
      },
      availability:{
        startDate: { type: Date },
        endDate: { type: Date},
        available: { type: Boolean},
      }
    },
    
    { timestamps: true }
  );

  export const Property = model<IProperty>('property',PropertySchema)