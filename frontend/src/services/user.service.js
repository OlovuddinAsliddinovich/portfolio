import { adminApi } from "./admin.api";
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
    const { data } = await $axios.get("/auth/get-user", token);
    return data;
  }

  async getUsers() {
    const { data } = await adminApi.get("/auth/get-all-users");
    return data;
  }

  async refresh() {
    const { data } = await $axios.get("/auth/refresh");
    return data;
  }

  async updateUser(payload) {
    const { data } = await $axios.patch("/auth/update-user", payload);
    return data;
  }

  async deleteUser(userId) {
    const { data } = await adminApi.delete(`/auth/delete-user/${userId}`);
    return data;
  }
}

export default new UserService();
