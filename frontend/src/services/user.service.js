import { $api, $axios } from "./api";

export class UserService {
  async register(userData) {
    const response = await $api.post("/register", userData);
    return response.data;
  }
  async login(user) {
    const response = await $api.post("/login", user);
    return response.data;
  }
  async logout() {
    localStorage.removeItem("accessToken");
    await $api.post("/logout");
  }
  async getUser(token) {
    const { data } = await $axios.get("/get-user", token);
    return data;
  }

  async refresh() {
    const { data } = await $axios.get("/refresh");
    return data;
  }

  async updateUser(payload) {
    const { data } = await $axios.patch("/update-user", payload);
    return data;
  }
}

export default new UserService();
