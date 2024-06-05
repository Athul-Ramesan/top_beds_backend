export interface FilterOptions {
    category?: string;
    location?: string;
    guestCount?: string;
    priceRange?: string;
}

export interface PropertyQueryParams {
    page?: string;
    limit?: string;
    search?: string;
    sort?:string
    filterOptions?: FilterOptions;
}