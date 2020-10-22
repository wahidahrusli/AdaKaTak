import { StoresActions } from './store.actions';
import { StoresState } from './stores.state';

export const StoresReducer = (state: StoresState, action: StoresActions): StoresState => {
    switch (action.type) {
        case 'set-stores-loading': {
            return { ...state, loading: action.isLoading };
        }
        case 'set-stores-data': {
            return { ...state, ...action.data };
        }
        case 'add-favourite': {
            return { ...state, favourites: [...(state.favourites), action.storeId] };
        }
        case 'remove-favourite': {
            return { ...state, favourites: [...(state.favourites).filter(x => x !== action.storeId)] }
        }
    }
}