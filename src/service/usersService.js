import requestHeader from "./requestHeader";

class UserService {
  createUser=(data)=> {
    return requestHeader.post("/user", data);
  }

  getAllUser=()=> {
      return requestHeader.get("/user");  
  }

  searchByEmail=(key)=> {
    return requestHeader.get(`/user/?email=${key}`);  
  }

  updateUser=(id,data)=>{
    return requestHeader.put(`/user/${id}`,data)
  }

  deleteUser=(id)=>{
    return requestHeader.delete(`/user/${id}`)

  }
}

export default new UserService();