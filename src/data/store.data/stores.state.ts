import { Store } from '../../models/Store';

export interface StoresState {
    store: Store[];
    favourites: number[];
    loading?: boolean;
}