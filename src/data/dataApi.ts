import { Plugins } from '@capacitor/core';

/** Models */
import { Store } from '../models/Store';
import { Item } from '../models/Item';

const { Storage } = Plugins;


/** Store */
const placesUrl = '/assets/dummyData/Places.json';
export const getPlacesData = async () => {
    const response = await Promise.all([
        fetch(placesUrl)
        
    ]);
    
    const store = await response[0].json() as Store[];
    
    const data = {
        store
    }
    
    return data;
}


/** User */
const HAS_LOGGED_IN = 'hasLoggedIn';
const USERNAME = 'username';

export const getUserData = async () => {
    const response = await Promise.all([
        Storage.get({ key: HAS_LOGGED_IN }),
        Storage.get({ key: USERNAME })
    ]);
    const isLoggedin = await response[0].value === 'true';
    const username = await response[1].value || undefined;
    const data = {
        isLoggedin,
        username
    }
    return data;
}

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
    await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
}

export const setUsernameData = async (username?: string) => {
    if (!username) {
        await Storage.remove({ key: USERNAME });
    } else {
        await Storage.set({ key: USERNAME, value: username })
    }
}


/** Item */
const itemUrl = '/assets/dummyData/Items.json';