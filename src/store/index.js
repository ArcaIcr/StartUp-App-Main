import { login, register } from "@/authService";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      user: null, // Store user data
      error: null, // Store error messages
    };
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
  },
  actions: {
    async register({ commit }, { username, email, password, isAdmin }) {
      try {
        // Call the register function from authService.js
        const user = await register(username, email, password, isAdmin);
        commit("SET_USER", user);
        return user; // Optionally return user for additional handling
      } catch (error) {
        commit("SET_ERROR", error.message);
        throw error; // Re-throw error to handle in components
      }
    },
    async login({ commit }, { email, password }) {
      try {
        // Call the login function from authService.js
        const user = await login(email, password);
        commit("SET_USER", user);
        return user; // Optionally return user for additional handling
      } catch (error) {
        commit("SET_ERROR", error.message);
        throw error; // Re-throw error to handle in components
      }
    },
    logout({ commit }) {
      auth.signOut();
      commit("CLEAR_USER");
      commit("CLEAR_ERROR");
    },
  },
  getters: {
    user: (state) => state.user,
    error: (state) => state.error,
  },
});

export default store;
