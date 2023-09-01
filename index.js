import {registerRootComponent} from 'expo';
import App from "./app/App";

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    return null
  }

  return <App/>
}


registerRootComponent(HeadlessCheck);