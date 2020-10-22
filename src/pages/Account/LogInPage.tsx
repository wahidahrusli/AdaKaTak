import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import './LoginPage.scss';

/** Data */
import { setIsLoggedIn, setUsername } from '../../data/user.data/user.action';
import { connect } from '../../data/connect'

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
    setIsLoggedIn: typeof setIsLoggedIn;
    setUsername: typeof setUsername;
}

interface LoginProps extends OwnProps, DispatchProps {}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn, history, setUsername: setUsernameAction }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
        if(!username) { setUsernameError(true) }
        if(!password) { setPasswordError(true) }

        if(username && password) {
            await setIsLoggedIn(true);
            await setUsernameAction(username);
            history.push('/tab1');
        }
    }

    return (
        <IonPage id="login-page">
            {/** Header */}
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>

            {/** Content */}
            <IonContent>
                <div className='login-logo'>
                    <img src="assets/icon/logo-adakatak.png" alt="AdaKaTak Logo" />
                </div>

                <form noValidate onSubmit={login}>
                    <IonList>

                        {/** Username */}
                        <IonItem>
                            <IonLabel position="stacked" color="primary">Username</IonLabel>
                            <IonInput 
                                name="username" type="text" value={username} 
                                spellCheck={false} autoCapitalize="off" 
                                onIonChange={e => setUsername(e.detail.value!)} required >
                            </IonInput>
                        </IonItem>

                        {
                            formSubmitted && usernameError && <IonText color="danger">
                                <p className="ion-padding-start">
                                    Username is required
                                </p>
                            </IonText>
                        }

                        {/** Password */}
                        <IonItem> 
                            <IonLabel position="stacked" color="primary">Password</IonLabel>
                            <IonInput name="password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}>
                            </IonInput>
                        </IonItem>

                        {
                             formSubmitted && passwordError && <IonText color="danger">
                                 <p className="ion-padding-start">
                                     Password is required
                                 </p>
                             </IonText>
                        }

                    </IonList>


                    <IonRow>
                        <IonCol>
                            <IonButton type="submit" expand="block">Login</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton routerLink="/signup" color="light" expand="block">Signup</IonButton>
                        </IonCol>
                    </IonRow>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default connect<OwnProps, {}, DispatchProps>({
    mapDispatchToProps: {
        setIsLoggedIn,
        setUsername
    },
    component: Login
})