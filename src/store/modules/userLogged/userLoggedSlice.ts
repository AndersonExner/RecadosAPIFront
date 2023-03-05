import {createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiGet } from '../../../serviceAPI/serviceAPI';
import { ResponseAPI } from '../typeStore';

const initialState = {
  loading: false,
  success: false,
  message: '',
  data: null
}

export const getUserById = createAsyncThunk<ResponseAPI, string>(
  'users/getUserById',
  async(id: string) => {
    const resp = await apiGet(`user/${id}`)

    return resp
  }
)

const userLoggedSlice = createSlice({
  name: 'userLogged',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserById.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getUserById.fulfilled, (state, action: PayloadAction<ResponseAPI>) => {
      state.loading = false
      state.success = action.payload.success
      state.message = action.payload.message
      state.data = action.payload.data
    })
  }
});

export const userLoggedReducer = userLoggedSlice.reducer;
