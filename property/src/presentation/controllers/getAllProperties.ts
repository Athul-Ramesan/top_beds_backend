import { IDependencies } from "@/application/interfaces/IDependencies";
import { PropertyQueryParams } from "@/domain/entities/IFilterOption";
import { getTotalPage } from "@/lib/getTotalPage";
import { NextFunction, Request, Response } from "express";

export const getAllProperties = (dependencies: IDependencies) => {

    const { useCases: { getAllPropertyUseCase } } = dependencies

    return async (req
        : Request<{}, {}, {}, PropertyQueryParams>, res: Response, next: NextFunction) => {


        try {
            console.log("🚀😶‍🌫️😶‍🌫️😶‍🌫️😶‍🌫️😶‍🌫️ ~ getAllProperties ~ page:", req.query)

            const page = Number(req.query?.page)
            const limit = Number(req.query?.limit)
            const { filterOptions } = req.query
            const search = String(req.query?.search)
            const sort = String(req.query.sort)
            console.log("🚀 ~ getAllProperties ~ filterOptions:", filterOptions)

            const category = filterOptions?.category;
            const location = filterOptions?.location;
            const guestCount = filterOptions?.guestCount;
            const priceRange = filterOptions?.priceRange;

            const properties = await getAllPropertyUseCase(dependencies).execute(
                {
                    page,
                    limit,
                    category,
                    location,
                    guestCount,
                    priceRange,
                    search,
                    sort
                }
            )
            const totalItems = await getTotalPage()

            res.status(201).json({
                status: "success",
                data: properties,
                totalItems: totalItems
            })

        } catch (error: any) {
            console.log("🚀 ~ return ~ error:", error)
            res.status(400).json(error.message)
        }
    }
}