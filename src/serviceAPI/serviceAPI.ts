import axios, {AxiosResponse} from "axios"
import { ResponseAPI } from "../store/modules/typeStore"

axios.defaults.baseURL = 'https://recadosapi.onrender.com'

export const apiGet = async (rota: string): Promise<ResponseAPI> => {
  try{
    const resp: AxiosResponse = await axios.get(rota);

    const respostaAPI : ResponseAPI = {
      success: resp.data.success,
      message: resp.data.message,
      data: resp.data.data
    }

    return respostaAPI;
  }catch (error: any){
    const respostaAPIErro: ResponseAPI = {
      success: error.response.data.success,
      message: error.response.data.message,
      data: error.data.data
    }

    return respostaAPIErro
  }
}

export const apiPost = async (rota: string, dados: any): Promise<ResponseAPI> => {
  try{
    const resp: AxiosResponse = await axios.post(rota, dados)

    const respostaAPI: ResponseAPI = {
      success: resp.data.success,
      message: resp.data.message,
      data: resp.data.data
    }
  
    return respostaAPI

  }catch (error: any) {
    const respostaAPIErro: ResponseAPI = {
      success: error.resp.data.success,
      message: error.resp.data.message,
      data: error.response.data.data
    }

    return respostaAPIErro
  }
}

export const apiPut = async (rota: string, dados: any): Promise<ResponseAPI> => {
  try{
    const resp: AxiosResponse = await axios.put(rota, dados)

    const respostaAPI: ResponseAPI = {
      success: resp.data.success,
      message: resp.data.message,
      data: resp.data.data
    }
  
    return respostaAPI

  }catch (error: any) {
    const respostaAPIErro: ResponseAPI = {
      success: error.response.data.success,
      message: error.response.data.message,
      data: error.response.data.data
    }

    return respostaAPIErro
  }
}

export const apiDelete = async (rota: string): Promise<ResponseAPI> => {
  try{
    const resp: AxiosResponse = await axios.delete(rota)

    const respostaAPI: ResponseAPI = {
      success: resp.data.success,
      message: resp.data.message,
      data: resp.data.data
    }
  
    return respostaAPI

  }catch (error: any) {
    const respostaAPIErro: ResponseAPI = {
      success: error.response.data.success,
      message: error.response.data.message,
      data: error.response.data.data
    }

    return respostaAPIErro
  }
}