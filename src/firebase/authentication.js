import * as firebase from 'firebase'
import { isNil } from 'lodash'

import store from '@/store'

firebase.auth().onAuthStateChanged(firebaseUser => {
  const actionToDispatch = isNil(firebaseUser) ? 'logout' : 'login';
  store.dispatch(`authentication/${actionToDispatch}`, firebaseUser)
});
