import React from 'react'
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonText, IonToolbar } from '@ionic/react'
import { RouteComponentProps, withRouter } from 'react-router'
import './store.detail.scss'

import { heart, heartOutline } from 'ionicons/icons'

/** data */
import { connect } from '../../../data/connect'
import * as selectors from '../../../data/selector'
import { addFavourite, removeFavourite } from '../../../data/store.data/store.actions'

/** models */
import { Store } from '../../../models/Store'

interface OwnProps extends RouteComponentProps {}

interface StateProps {
    store?: Store;
    favouriteStore: number[];
}

interface DispatchProps {
    addFavourite: typeof addFavourite;
    removeFavourite: typeof removeFavourite;
}

type StoreDetailProps = OwnProps & StateProps & DispatchProps;

const StoreDetail: React.FC<StoreDetailProps> = ({ store, favouriteStore, addFavourite, removeFavourite }) => {
    
    console.log(store)

    if(!store) {
        return <div>Store not found</div>
    }

    const isFavourite = favouriteStore.indexOf(store.placeId) > -1;

    const toggleFavourite = () => {
        isFavourite ? removeFavourite(store.placeId) : addFavourite(store.placeId);
    }

    const itemClicked = (text: string) => {
        console.log(`Clicked ${text}`)
    }

    return (
        <IonPage id="store-detail-page">
            {/** Header */}
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/storesearch" ></IonBackButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton onClick={() => toggleFavourite()}>
                            { isFavourite 
                                ?
                                <IonIcon slot="icon-only" icon={heart}></IonIcon>
                                :
                                <IonIcon slot="icon-only" icon={heartOutline}></IonIcon>
                            }
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
                <IonToolbar>
                    <div className="ion-padding">
                        <h1>{store.name}</h1>
                        <p>{store.address}</p>
                        <IonText color="medium">

                        </IonText>
                    </div>
                </IonToolbar>
            </IonHeader>

            {/** Content */}
            <IonContent>
                
            </IonContent>
        </IonPage>
    )
}

export default connect<OwnProps, StateProps, DispatchProps>({
    mapStateToProps: (state, OwnProps) => ({
        store: selectors.getSelectedStore(state, OwnProps),
        favouriteStore: state.data.favourites
    }),
    mapDispatchToProps: {
        addFavourite,
        removeFavourite
    },
    component: withRouter(StoreDetail)
})