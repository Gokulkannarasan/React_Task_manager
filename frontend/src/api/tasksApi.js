// import axios from "axios";


// const url="http://localhost:5000/api/tasks";

// export const gettask= () => {return axios.get(url)};

// export const addtask=(title)=>{ return axios.post(url,{title}) };

// export const deletetask=(id)=>{ return axios.delete(`${url}/${id}`) };

// export const updatetask=(id,completed)=>{return  axios.patch(`${url}/${id}`,{completed}) };

// export const updatetitle=(id,title)=>{return axios.put(`${url}/${id}`,{title})};

import instance from "./axiosInstance";   // ✅ use your configured instance

const url = "/tasks";   // no need full URL anymore

export const gettask = () => {
  return instance.get(url);
};

export const addtask = (title) => {
  return instance.post(url, { title });
};

export const deletetask = (id) => {
  return instance.delete(`${url}/${id}`);
};

export const updatetask = (id, completed) => {
  return instance.patch(`${url}/${id}`, { completed });
};

export const updatetitle = (id, title) => {
  return instance.put(`${url}/${id}`, { title });
};
