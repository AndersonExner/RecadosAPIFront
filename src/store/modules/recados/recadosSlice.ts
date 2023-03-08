import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { apiDelete, apiGet, apiPost, apiPut } from '../../../serviceAPI/serviceAPI';
import { ArquivadosData, KeyData, Recado, RecadoData, ResponseAPI } from '../typeStore';

const adapter = createEntityAdapter<Recado>({
  selectId: (item) => item.id,
});

export const { selectAll: buscarRecados, selectById: buscarRecadosId } = adapter.getSelectors(
  (state: RootState) => state.recados
);

export const getRecadosUser = createAsyncThunk('/recados', async (id:string) => {
  const resp = await apiGet(`/user/${id}/recados`)
  console.log('buscando recados user');
  
  
  return resp
})

export const getRecadosUserbyKey = createAsyncThunk<ResponseAPI, KeyData>('/buscaporchave', async (params: KeyData) => {
  const resp = await apiGet(`/user/${params.idUser}/buscaporchave/${params.key}`)
  console.log('buscando recados user por key');

  return resp
})

export const getRecadosArquivados = createAsyncThunk('/arquivados', async (id:string) => {
  const resp = await apiGet(`/user/${id}/arquivados`)
  console.log('buscando recados user arquivados');

  return resp
})

export const newRecado = createAsyncThunk<ResponseAPI, RecadoData>('/newRecado', async ( params: RecadoData) => {

  const resp = await apiPost(`/user/${params.idUser}/novorecado`, params)
  
  return resp
})

export const deleteRecado = createAsyncThunk<ResponseAPI, RecadoData>('/deleteRecado', async ( params: RecadoData) => {

  const resp = await apiDelete(`/user/${params.idUser}/${params.idRecado}`)
  
  return resp
})

export const updateRecado = createAsyncThunk<ResponseAPI, RecadoData>('/updateRecado', async ( params: RecadoData) => {

  const resp = await apiPut(`/user/${params.idUser}/${params.idRecado}`, params)
  
  return resp
})

const recadosSlice = createSlice({
  name:'recados',
  initialState: adapter.getInitialState({
    success: false,
    message: '',
    loading:false
  }),
  reducers: {
    atualizarState: adapter.updateOne
  },

  //get recados
  extraReducers: (builder) => {
    builder.addCase(getRecadosUser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getRecadosUser.fulfilled, (state, action: PayloadAction<ResponseAPI>) => {
      if (action.payload.success){
        adapter.removeAll(state)
        adapter.addMany(state, action.payload.data)
      }

      state.loading = false;
      state.success = action.payload.success
      state.message = action.payload.message
    })
    //busca por palavra chave
    builder.addCase(getRecadosUserbyKey.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getRecadosUserbyKey.fulfilled, (state, action: PayloadAction<ResponseAPI>) => {
      if (action.payload.success){
        adapter.addMany(state, action.payload.data)
      }

      state.loading = false;
      state.success = action.payload.success
      state.message = action.payload.message
    })

    //busca recados arquivados
    builder.addCase(getRecadosArquivados.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getRecadosArquivados.fulfilled, (state, action: PayloadAction<ResponseAPI>) => {
      if (action.payload.success){
        adapter.removeAll(state)
        adapter.addMany(state, action.payload.data)
      }

      state.loading = false;
      state.success = action.payload.success
      state.message = action.payload.message
    })


  //post recados 
  builder.addCase(newRecado.pending, (state) => {
    state.loading = true
  })
  builder.addCase(newRecado.fulfilled, (state, action: PayloadAction<ResponseAPI>) => {
    if (action.payload.success) {
        adapter.addOne(state, action.payload.data);
    }
    state.loading = false;
    state.success = action.payload.success;
    state.message = action.payload.message;
  })

  //delete recado
  builder.addCase(deleteRecado.pending, (state) => {
    state.loading = true
  })
  builder.addCase(deleteRecado.fulfilled, (state, action: PayloadAction<ResponseAPI>) => {
    if (action.payload.success) {
        adapter.removeOne(state, action.payload.data);
    }
    state.loading = false;
    state.success = action.payload.success;
    state.message = action.payload.message;
  })

  //update
  builder.addCase(updateRecado.pending, (state) => {
    state.loading = true
  })
  builder.addCase(updateRecado.fulfilled, (state, action:PayloadAction <ResponseAPI>) => {
    if (action.payload.success){
      adapter.updateOne(state, action.payload.data)
    }
    state.loading = false;
    state.success = action.payload.success;
    state.message = action.payload.message;
  })
  },
});

export const { atualizarState } = recadosSlice.actions

export const recadosReducer = recadosSlice.reducer;
