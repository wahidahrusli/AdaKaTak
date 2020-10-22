import React, { useState, useRef } from 'react';
import { IonModal, IonButton, IonContent,
         IonPage, IonHeader, IonTitle,
         IonToolbar, IonIcon, IonButtons,
         IonSearchbar,
         IonRefresher,
         IonRefresherContent,
         IonToast
} from '@ionic/react';
import { search } from 'ionicons/icons'

/** SASS */
import './store.search.scss';

/** Models */
import { Store } from '../../../models/Store'

/** Components */
import StoreList from '../../../components/StoreList'
import { connect } from '../../../data/connect'
import * as selectors from '../../../data/selector'



interface OwnProps {  }

interface StateProps {
    store: Store[];
}

interface DispatchProps {}

type StoreSearchProps = OwnProps & StateProps & DispatchProps;


/**
interface StoreProps {
    store: Store[]
}
*/

const StoreSearch: React.FC<StoreSearchProps> = ({ store }) => {
  const [showModal, setShowModal] = useState(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const pageRef = useRef<HTMLElement>(null);
  
  const doRefresh = () => {
      setTimeout(() => {
        ionRefresherRef.current!.complete();
        setShowCompleteToast(true)
      }, 2500)
  }

  return (
    <IonPage ref={pageRef}>
        {/** Header */}
        <IonHeader>
            <IonToolbar>
                <IonTitle>Find Store</IonTitle>
            </IonToolbar>
            
            <IonToolbar>               
                <IonButtons slot="primary">
                    <IonButton onClick={() => {}}>
                        <IonIcon slot="icon-only" icon={search} />
                    </IonButton>
                </IonButtons>
                <IonSearchbar placeholder="Search" />
            </IonToolbar>
        </IonHeader>
        
        {/** Content */}
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
                store={store}
                listType='all'
            />
        </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
    mapStateToProps: (state) => ({
        store: state.data.store
    }),
    component: StoreSearch
})