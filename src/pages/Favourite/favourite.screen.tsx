import React, { useRef, useState } from 'react'
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToast, IonToolbar } from '@ionic/react'

import { Store } from '../../models/Store'
import { connect } from '../../data/connect'
import { addFavourite, removeFavourite } from '../../data/store.data/store.actions'
import { search } from 'ionicons/icons'
import StoreList from '../../components/StoreList'
import * as selectors from '../../data/selector'


interface OwnProps { }

interface StateProps {
    favouriteStore: Store[];
};

interface DispatchProps { }

type FavouritePageProps = OwnProps & StateProps & DispatchProps;

const FavouritePage: React.FC<FavouritePageProps> = ({ favouriteStore }) => {
    const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
    const [showCompleteToast, setShowCompleteToast] = useState(false);
  
    const pageRef = useRef<HTMLElement>(null);
    
    const doRefresh = () => {
        setTimeout(() => {
          ionRefresherRef.current!.complete();
          setShowCompleteToast(true);
        }, 2500)
      };

    return (
        <IonPage ref={pageRef}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Favourite Stores</IonTitle>
                </IonToolbar>

                <IonButtons slot="primary">
                    <IonButton>
                        <IonIcon slot="icon-only" icon={search} />
                    </IonButton>
                </IonButtons>
            </IonHeader>

            <IonContent fullscreen={true}>
                <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
                    <IonRefresherContent />
                </IonRefresher>

                <IonToast
                    isOpen={showCompleteToast}
                    message="Refresh complete"
                    duration={2000}
                    onDidDismiss={() => setShowCompleteToast(false)}
                />

                <StoreList
                    store={favouriteStore}
                    listType='favourites'
                />
            </IonContent>
        </IonPage>
    )
}

export default connect<OwnProps, StateProps, DispatchProps>({
    mapStateToProps: (state) => ({
        favouriteStore: selectors.getFavouriteStore(state)
    }),
    component: React.memo(FavouritePage)
})