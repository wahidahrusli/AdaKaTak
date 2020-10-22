import React, { useRef } from 'react';
import { IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, AlertButton } from '@ionic/react';
import { Store } from '../models/Store';

interface StoreListItemProps {
    store: Store;
    listType: "all" | "favourites";
    onAddFavourite: (id: number) => void;
    onRemoveFavourite: (id: number) => void;
    onShowAlert: (header: string, buttons: AlertButton[]) => void;
    isFavourite: boolean;
}

const StoreListItem: React.FC<StoreListItemProps> = ({ isFavourite, onAddFavourite, onRemoveFavourite, onShowAlert, store, listType }) => {

    const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null)

    const dismissAlert = () => {
        ionItemSlidingRef.current && ionItemSlidingRef.current.close();
    }

    const RemoveFavouriteStore = () => {
        onAddFavourite(store.placeId);
        onShowAlert('Favourite already added', [
            {
                text: 'Cancel',
                handler: dismissAlert
            },
            {
                text: 'Remove',
                handler: () => {
                    onRemoveFavourite(store.placeId);
                    dismissAlert();
                }
            }
        ])
    }

    const addFavouriteStore = () => {
        if (isFavourite) {
            RemoveFavouriteStore();
        } else {
            onAddFavourite(store.placeId);
            onShowAlert('Favourite Added', [
                {
                    text: 'OK',
                    handler: dismissAlert
                }
            ])
        }
    }

    return (
        <IonItemSliding ref={ionItemSlidingRef}>
            <IonItem routerLink={`/tab1/storesearch/${store.placeId}`}>
                <IonLabel>
                    <h3>{store.name}</h3>
                    <p>{store.address}</p>
                </IonLabel>
            </IonItem>
            
            <IonItemOptions>
                {listType ==="favourites" ? 
                    <IonItemOption color="danger" onClick={() => RemoveFavouriteStore()}>
                        Remove
                    </IonItemOption>
                    :
                    <IonItemOption color="success" onClick={addFavouriteStore}>
                        Favourite
                    </IonItemOption>
                }
            </IonItemOptions>
        </IonItemSliding>
    )
}

export default React.memo(StoreListItem);