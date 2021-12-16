import axiosRequest from 'axios'

export const apiScale = async (commit, params) => {
  return await
  axiosRequest({
      url: "http://172.16.18.116:8080/scale",
      method: "GET"
    }).then(res =>{
      console.log(res.data)
      commit('SET_SCALE', res.data) 
    }).catch(res =>{

    })

  }
export const apiScaleCallBack = async (params) => {
  return await
  axiosRequest({
      url: "http://172.16.18.116:8080/scale",
      method: "GET"
    }).then(res =>{
      console.log(res.data.data)
      if(params && typeof params.nextCallback === 'function') params.nextCallback(res)
    }).catch(res =>{

    })

  }

export const apiScaleSave = async (commit, params) => {
  return await
  axiosRequest({
      url: "http://172.16.18.116:8080/scale",
      method: "POST"
    }).then(res =>{
      console.log(res.data.data)
      this.scale = res.data.data
    }).catch(res =>{

    })

  }

