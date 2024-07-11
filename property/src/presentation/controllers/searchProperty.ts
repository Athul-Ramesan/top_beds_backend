import { Property } from "@/infrastructure/database/Models/property";
import { NextFunction, Request, Response } from "express";

interface SearchQuery {
    location?: string;
    startDate?: string;
    endDate?: string;
    guests?: string;
    minPrice?: string;
    maxPrice?: string;
    category?: string;
    bedrooms?: string;
    bathrooms?: string;
}

export const searchPropertyController = async (
    req: Request<{}, {}, {}, SearchQuery>,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            location,
            startDate,
            endDate,
            guests,
            minPrice,
            maxPrice,
            category
        } = req.query;
        console.log(req.query, 'req query:🥴🥴🥴🥴🥴🥴🥴🥴')
        let query: any = {};
        console.log('after query')
        if (location) query['location'] = { $regex: location, $options: 'i' };
        console.log('after location')
        if (guests) query.maxGuests = { $gte: parseInt(guests) };
        console.log('after guest')
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseInt(minPrice);
            if (maxPrice) query.price.$lte = parseInt(maxPrice);
        }
        console.log('after max min price')
        

        
        if (category) query.category = category;
        console.log('after category')

        // if (startDate && endDate) {
        //     query['availability.startDate'] = { $lte: new Date(endDate) };
        //     query['availability.endDate'] = { $gte: new Date(startDate) };
        //     query['availability.available'] = true;
        // }

        console.log(query,'queryyyyyyyyyyyy')
        const properties = await Property.find(query);
        console.log("🚀 ~ properties:", properties)
        res.json(properties);
    } catch (error) {
        console.error('Error searching properties:', error);
        res.status(500).json({ message: 'Server error' });
    }
};