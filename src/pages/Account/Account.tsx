import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonList, IonItem, IonAlert, IonIcon, IonButton } from '@ionic/react';
import { logOut } from 'ionicons/icons'
import './Account.scss';

/** Data */
import { setUsername } from '../../data/user.data/user.action'
import { connect } from '../../data/connect'

interface OwnProps extends RouteComponentProps {  }

interface StateProps {
    username?: string;
}

interface DispatchProps {
    setUsername: typeof setUsername
}

interface AccountProps extends OwnProps, StateProps, DispatchProps {  }

const AccountPage: React.FC<AccountProps> = ({ setUsername, username }) => {

    const [showAlert, setShowAlert] = useState(false);

    const clicked = (text: string) => {
        console.log(`Clicked ${text}`)
    }

    return (
        <IonPage id="account-page">

            {/** Header */}
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Account</IonTitle>                
                    <IonButtons slot="end">
                        <IonButton routerLink="/logout" routerDirection="none">
                            <IonIcon icon={logOut}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            {/** Content */}
            <IonContent>
                <IonTitle>Account detail go here</IonTitle>
                {username &&
                    <h2>{ username }</h2>
                }
            </IonContent>

            {/** Alert */}
            <IonAlert
                isOpen={showAlert}
                header="Change Username"
                buttons={[
                    'Cancel',
                    {
                        text: 'OK',
                        handler: (data) => {
                            setUsername(data.username)
                        }
                    }
                ]}
                inputs={[
                    {
                        type: 'text',
                        name: 'username',
                        value: username,
                        placeholder: 'username'
                    }
                ]}
                onDidDismiss={() => setShowAlert(false)}
            />
        </IonPage>

    )
}

export default connect<OwnProps, StateProps, DispatchProps>({
    mapStateToProps: (state) => ({
        username: state.user.username
    }),
    mapDispatchToProps: {
        setUsername,
    },
    component: AccountPage
})