import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Reel {
    id: bigint;
    title: string;
    description: string;
    videoUrl: string;
}
export interface MenuItem {
    name: string;
    description: string;
    price: bigint;
}
export type Time = bigint;
export interface Restaurant {
    id: bigint;
    menu: Array<MenuItem>;
    name: string;
    description: string;
    address: string;
}
export interface backendInterface {
    createBooking(restaurantId: bigint, customerName: string, dateTime: Time, partySize: bigint): Promise<bigint>;
    getAllReels(): Promise<Array<Reel>>;
    getAllRestaurants(): Promise<Array<Restaurant>>;
    getRestaurantDetails(id: bigint): Promise<Restaurant | null>;
    initializeData(): Promise<void>;
}
