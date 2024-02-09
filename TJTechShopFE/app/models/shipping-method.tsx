export interface ShippingMethodModel {
    shipping_id?: number;
    name: string;
    rate: number;
    early_arrival: number;
    late_arrival: number;
}