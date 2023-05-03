import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLoginForm = createAsyncThunk(
  "loginForm/fetchLoginForm",
  async ({ email, password }) => {
    try {
      const response1 = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data1 = await response1.json();
      console.log(data1);
      localStorage.setItem("token", data1.token);
      const response2 = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ email, password }),
      });
      const data2 = await response2.json();
      localStorage.setItem("data", data2);
      console.log(data2);
      return data2;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const loginFormSlice = createSlice({
  name: "loginForm",
  initialState: {
    isAuthenticated: false,
    wrongStatus: null,
    status: null,
    user: null,
    token: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginForm.pending, (state) => {
        state.isAuthenticated = false;
        state.wrongStatus = null;
        state.status = null;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(fetchLoginForm.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.wrongStatus = action.payload.wrongStatus;
        state.status = action.payload.status;
        // console.log(action.payload.status);
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(fetchLoginForm.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.wrongStatus = null;
        state.status = null;
        state.user = null;
        state.token = null;
        state.error = action.error.message;
      });
  },
});

export default loginFormSlice.reducer;