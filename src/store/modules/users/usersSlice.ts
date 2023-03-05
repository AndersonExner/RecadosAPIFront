import { createSlice, createEntityAdapter, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "../..";
import { apiDelete, apiGet, apiPost } from "../../../serviceAPI/serviceAPI";
import {newUserRequest, ResponseAPI, User} from '../typeStore';


const usersAdapter = createEntityAdapter<User>({
  selectId: (state) => state.id,
});

export const {selectAll: buscarUsuarios, selectById: buscarUsuarioID} = usersAdapter.getSelectors<RootState>((state) => state.users);

//buscar usuarios
export const getUsers = createAsyncThunk<ResponseAPI>('users/getUsers', async () => {
  const resp = await apiGet('/users')

  return resp
});

export const saveNewUser = createAsyncThunk<ResponseAPI, newUserRequest>('users/saveNewUser', async (newUserData: newUserRequest) => {
  const resp = await apiPost('/user', newUserData)

  return resp
})

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string) => {
  const resp = await apiDelete(`/user/${id}`)

  return resp
})

export const getUserInfo = createAsyncThunk('users/getUserInfo', async (id:string) => {
  const resp = await apiGet(`/user/${id}`)

  return resp
});

export const usersSlice = createSlice({
  name:'users',
  initialState: usersAdapter.getInitialState({
    success: false,
    message: '',
    loading: false,
  }),
  reducers:{},

  //get
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<ResponseAPI>) => {
      if (action.payload.success) {
        usersAdapter.addMany(state, action.payload.data);
      }

      state.loading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
    })

    //post
    builder.addCase(saveNewUser.fulfilled, (state, action: PayloadAction<ResponseAPI>) => {
      if (action.payload.success) {
          usersAdapter.addOne(state, action.payload.data);
      }
      state.loading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
  })

  // delete
  builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
  })
  builder.addCase(deleteUser.fulfilled, (state, action: PayloadAction<ResponseAPI>) => {
      if (action.payload.success) {
          usersAdapter.removeOne(state, action.payload.data);
      }
      state.loading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
  })

},
})

export const usersReducer = usersSlice.reducer;