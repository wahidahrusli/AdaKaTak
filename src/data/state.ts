import { combineReducers } from './combineReducers';
import { StoresReducer } from './store.data/store.reducer'
import { userReducer } from './user.data/user.reducer'

export const initialState: AppState = {
  data: {
    store: [],
    favourites: [],
    loading: false
  },
  user: {
    isLoggedin: false,
    loading: false
  }
};

export const reducers = combineReducers({
  data: StoresReducer,
  user: userReducer
});

export type AppState = ReturnType<typeof reducers>;