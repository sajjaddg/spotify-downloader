import {store} from "../redux/store";
import {saveApi, setApiError, setApiLoading} from "../redux/api/apiSlice";
import {batch} from "react-redux";

export const isUndefined = v => v === null || typeof v === 'undefined'
export const callInfo = async (apiKey, action, conf = {}) => {
  const config = {
    fetchData: (data) => data?.data,
    isArray: false,
    ...conf
  }
  const {isArray, fetchData} = config
  const error = value => store.dispatch(setApiError({id: apiKey, value, isArray}))
  const loading = value => store.dispatch(setApiLoading({id: apiKey, value, isArray}))
  const success = value => store.dispatch(saveApi({id: apiKey, value, isArray}))

  batch(() => {
    error({})
    loading(true)
  })

  try {
    const data = await action()
    batch(() => {
        success(data)
        loading(false)
      }
    )
    return {data}
  } catch (errorResponse) {
    batch(() => {
      error(errorResponse)
      loading(false)
    })
    return {response: errorResponse, error: errorResponse}
  }
}
