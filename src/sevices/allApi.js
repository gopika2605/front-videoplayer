import { commonRequest } from "./commonRequest";
import { base_url } from "./baseUrl";

export const addVideo = async(body)=>{
    return await commonRequest("POST",`${base_url}/videos`,body)
}

export const getVideo = async()=>{
    return await commonRequest("GET",`${base_url}/videos`,"")
}
export const deleteVideo = async(id)=>{
    return await commonRequest("DELETE",`${base_url}/videos/${id}`,{})
}

export const addCategory = async(body)=>{
    return await commonRequest("POST",`${base_url}/categories`,body)
}


export const getallcategory = async()=>{
    return await commonRequest("GET",`${base_url}/categories`,"")
}
export const deletecategory = async(id)=>{
    return await commonRequest("DELETE",`${base_url}/categories/${id}`,{})
}


export const getHistory = async()=>{
    return await commonRequest("GET",`${base_url}/watchhistory`,"")
}
export const addHistroy = async(body)=>{
    return await commonRequest("POST",`${base_url}/watchhistory`,body)
}


export const getaVideo = async(id)=>{
    return await commonRequest("GET",`${base_url}/videos/${id}`,"")
}
export const updateCategory = async(id,body)=>{
    return await commonRequest("PUT",`${base_url}/categories/${id}`,body)
}

