export interface GeoapifyModel {
    type: string;
    features: [{
        type: string;
        properties: {
            country: string;
            country_code: string;
            region: string;
            state: string;
            city: string;
            postcode: string;
            lon: number;
            lat: number;
            population: number;
            result_type: string;
            formatted: string;
            address_line1: string;
            address_line2: string;
            category: string;
        }
        geometry: {
            type: string;
            coordinates: {
                0: number;
                1: number;
            }
        }
    }]
}