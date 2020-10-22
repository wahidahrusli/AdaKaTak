import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, heart, person, star } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/** Pages */
import StoreSearch from './pages/Search/store.search/store.search'
import FavouritePage from './pages/Favourite/favourite.screen'
import { SegmentExamples } from './pages/Search/search.screen'
import StoreDetail from './pages/Search/store.search/store.detail'
import AccountPage from './pages/Account/Account'
import LoginPage from './pages/Account/LogInPage'

/** Components */
import { Store } from '../src/models/Store'
import { loadPlacesData } from '../src/data/store.data/store.actions'
import { AppContextProvider } from './data/AppContext';
import { connect } from './data/connect'
import Red from './components/RedirectToLogin'
import RedirectToLogin from './components/RedirectToLogin';
import { loadUserData, setIsLoggedIn, setUsername } from './data/user.data/user.action';

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  )
}

interface StateProps {
  store: Store[];
  isAuthenticated: boolean
}

interface DispatchProps {
  loadPlacesData: typeof loadPlacesData;
  loadUserData: typeof loadUserData;
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface AppProps extends StateProps, DispatchProps {}

const IonicApp: React.FC<AppProps> = ({ store, isAuthenticated, loadPlacesData, loadUserData, setIsLoggedIn, setUsername }) => {
  
  useEffect(() => {
    loadPlacesData();
    loadUserData()
    // eslint-disable-next-line
  }, []);
  
  return (
    store.length === 0 ? (
      <div></div>
    ) : (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/tab1" component={SegmentExamples} exact={true} />
          <Route path="/tab2" component={FavouritePage} exact={true} />
          { isAuthenticated ?
            <Route path="/account" component={LoginPage} /> :
            <Route path="/account" component={AccountPage} /> }
          <Route path="/tab1/storesearch" component={StoreSearch} />
          <Route path="/tab1/storesearch/:id" component={StoreDetail} exact={true} />
          <Route path="/logout" render={() => {
            return <RedirectToLogin
              setIsLoggedIn={setIsLoggedIn}
              setUsername={setUsername}
            />
          }} />
          <Route path="/" render={() => <Redirect to="/tab1" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={heart} />
            <IonLabel>Favourite</IonLabel>
          </IonTabButton>
          <IonTabButton tab="account" href="/account">
            <IonIcon icon={person} />
            <IonLabel>Account</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
  )
)};

export default App;

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    store: state.data.store,
    isAuthenticated: state.user.isLoggedin
  }),
  mapDispatchToProps: { 
    loadPlacesData,
    loadUserData,
    setIsLoggedIn,
    setUsername
  },
  component: IonicApp
})