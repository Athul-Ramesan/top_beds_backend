import { IsDate, IsNumber, IsObject, IsOptional, IsString, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class CoordinatesDto {
    @IsNumber()
    lat: number;

    @IsNumber()
    lng: number;
}

export class LocationDto {
    @IsString()
    address: string;

    @IsString()
    city: string;

    @IsString()
    state: string;

    @IsString()
    country: string;

    @ValidateNested()
    @Type(() => CoordinatesDto)
    coordinates: CoordinatesDto;
}

export class PropertyDto {

    @IsString()
    _id: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString() // or another appropriate decorator for ObjectId if needed
    hostId: string

    @IsOptional()
    @ValidateNested()
    @Type(() => LocationDto)
    location?: LocationDto;

    @IsArray()
    @IsString({ each: true })
    amenities: string[];

    @IsArray()
    @IsString({ each: true })
    houseRules: string[];

    @IsNumber()
    price: number;

    @IsArray()
    @IsString({ each: true })
    images: string[];

    @IsNumber()
    bedrooms: number;

    @IsNumber()
    bathrooms: number;

    @IsNumber()
    maxGuests: number;

    @IsString()
    host: string;

    @IsString()
    @IsEnum(['House', 'Resort', 'Cabin', 'Apartment'])
    category: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}