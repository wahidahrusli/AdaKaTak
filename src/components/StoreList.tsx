import { IonItemDivider, IonItemGroup, IonLabel, IonList, IonListHeader, IonAlert, AlertButton } from '@ionic/react';
import React, { useState, useCallback } from 'react';

/** Modals */
import { Store } from '../models/Store';

/** Component */
import StoreListItem from './StoreListItem';
import { connect } from '../data/connect';
import { addFavourite, removeFavourite } from '../data/store.data/store.actions';


interface OwnProps {
    store: Store[];
    listType: 'all' | 'favourites';
}

interface StateProps {
    favouriteStores: number[];
}

interface DispatchProps {
    addFavourite: typeof addFavourite;
    removeFavourite: typeof removeFavourite;
}

interface StoreListProps extends OwnProps, StateProps, DispatchProps { };

const StoreList: React.FC<StoreListProps> = ({ addFavourite, removeFavourite, favouriteStores, store, listType }) => {

    const [showAlert, setShowAlert] = useState(false);
    const [alertHeader, setAlertHeader] = useState('');
    const [alertButtons, setAlertButtons] = useState<(AlertButton | string)[]>([]);

    const handleAlert = (header: string, buttons: AlertButton[]) => {
        setAlertHeader(header)
        setAlertButtons(buttons)
        setShowAlert(true)
    }

    const handleShowAlert = useCallback((header: string, buttons: AlertButton[]) => {
        setAlertHeader(header);
        setAlertButtons(buttons);
        setShowAlert(true);
    }, []);

    console.log(store)
    console.log(showAlert)
    /**
    if (store.length === 0) {
        <IonList>
            <IonListHeader>
                No Stores Found
            </IonListHeader>
        </IonList>
    }
    */

    return(
        <>
            <IonList >
                {
                    store.map((place: Store, index: number) => (
                        <StoreListItem
                            onShowAlert={handleShowAlert}
                            isFavourite={favouriteStores.indexOf(place.placeId) > -1}
                            onAddFavourite={addFavourite}
                            onRemoveFavourite={removeFavourite}
                            store={place}
                            listType={listType}
                            key={`store-${index}`}
                        />
                    ))
                }
            </IonList>

            <IonAlert
                isOpen={showAlert}
                header={alertHeader}
                buttons={alertButtons}
                onDidDismiss={() => setShowAlert(false)}
            ></IonAlert>
        </>
    )
}

export default connect<OwnProps, StateProps, DispatchProps>({
    mapStateToProps: (state) => ({
        favouriteStores: state.data.favourites
    }),
    mapDispatchToProps: ({
        addFavourite,
        removeFavourite
    }),
    component: StoreList
})