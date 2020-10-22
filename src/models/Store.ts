import { Item } from './Item'

export interface Store {
    placeId: number;
    name: string;
    address: string;
    item?: Item[];
}



