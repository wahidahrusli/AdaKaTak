import { getPlacesData } from '../dataApi'
import { ActionType } from '../../util/types';
import { StoresState } from './stores.state';

export const loadPlacesData = () => async (dispatch: React.Dispatch<any>) => {
    dispatch(setLoading(true));
    const data = await getPlacesData();
    dispatch(setData(data));
    dispatch(setLoading(false));
    console.log(data)
}

export const setLoading = (isLoading: boolean) => ({
    type: 'set-stores-loading',
    isLoading
} as const);

export const setData = (data: Partial<StoresState>) => ({
    type: 'set-stores-data',
    data
} as const);

export const addFavourite = (storeId: number) => ({
    type: 'add-favourite',
    storeId
} as const);

export const removeFavourite = (storeId: number) => ({
    type: 'remove-favourite',
    storeId
} as const);

export type StoresActions =
 | ActionType<typeof setLoading>
 | ActionType<typeof setData>
 | ActionType<typeof addFavourite>
 | ActionType<typeof removeFavourite>