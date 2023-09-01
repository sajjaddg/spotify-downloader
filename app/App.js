import {StatusBar} from 'expo-status-bar';
import {PersistGate} from "redux-persist/integration/react";
import {Provider as StoreProvider} from "react-redux";
import {persistor, store} from "./redux/store";
import HomeScreen from "./featuers/home/HomeScreen";

export default function App() {
  return (
    <>
        <StoreProvider {...{store}}>
          <PersistGate loading={null} {...{persistor}}>
            <HomeScreen/>
            <StatusBar style="light"/>
          </PersistGate>
        </StoreProvider>
    </>
  );
}

