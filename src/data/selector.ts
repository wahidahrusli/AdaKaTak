import { createSelector } from 'reselect';
import { Store } from '../models/Store';
import { AppState } from './state'

export const getStore = (state: AppState) => state.data.store
export const getFavouriteIds = (state: AppState) => state.data.favourites

export const getFavouriteStore = createSelector(
    getStore, getFavouriteIds,
    (store, favouriteIds) => {
        const favouriteStore = store.filter(s => favouriteIds.indexOf(s.placeId) > -1)
        return favouriteStore;
    }
)

const getIdParam = (_state: AppState, props: any) => {
    return props.match.params['id']
}

export const getSelectedStore = createSelector(
    getStore, getIdParam,
    (store, id) => {
        const selectedStore = store.find(s => s.placeId === id)
        return selectedStore
    }
)