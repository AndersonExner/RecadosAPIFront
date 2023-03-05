import { combineReducers } from 'redux';
import { usersReducer } from './users/usersSlice';
import { userLoggedReducer } from './userLogged/userLoggedSlice';
import { recadosReducer } from './recados/recadosSlice';



const rootReducer = combineReducers({
  users: usersReducer,
  userLogged: userLoggedReducer,
  recados: recadosReducer
});

export { rootReducer };