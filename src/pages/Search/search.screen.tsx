import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle,
         IonToolbar, IonSegment, IonSegmentButton,
         IonLabel, IonIcon, IonButton, IonGrid, IonModal
} from '@ionic/react';
import { search, star } from 'ionicons/icons';

const Styles = {
    button: {
        display: 'flex',
    }
}

export const SegmentExamples: React.FC = () => {


  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>AdaKaTak</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid className="ion-align-items-center">
            <IonButton  
                routerLink='./tab1/storesearch'
                shape="round"
                style={Styles.button}
            >
                <IonIcon icon={search} />
                Find Stores
            </IonButton>

        </IonGrid>

      </IonContent>


    </IonPage>
  );
};
