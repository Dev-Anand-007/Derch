import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, register, checkAuth } from './AuthApi';
import { API_ROUTES } from '../../api/routes';

const initialState = {
    status: "idle",
    errors: null,
    registerStatus: 'idle',
    registerError: 'null',
    loginStatus: 'idle',
    loginError: null,
    loggedInUser: null,
    // forgotPasswordStatus:"idle",
    // forgotPasswordSuccessMessage:null,
    // forgotPasswordError:null,
    // resetPasswordStatus:"idle",
    // resetPasswordSuccessMessage:null,
    // resetPasswordError:null,
    successMessage: null,
    isAuthChecked: false
}

//Register AsyncThunk

export const registerAsync = createAsyncThunk('auth/register', async (cred) => {
    const res = await register(cred)
    return res
});

export const loginAsync = createAsyncThunk('auth/login', async (cred) => {
    const res = await login(cred);
    return res;
})

export const checkAuthAsync = createAsyncThunk('auth/checkAuthAsync', async () => {
    const res = await checkAuth()
    return res
})
export const logoutAsync=createAsyncThunk("auth/logoutAsync",async()=>{
       // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Return success response
    return { success: true, message: "Logged out successfully" };
})

const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {
        clearAuthSuccessMessage: (state) => {
            state.successMessage = null
        },
        clearAuthErrors: (state) => {
            state.errors = null
        },
        resetAuthStatus: (state) => {
            state.status = 'idle'
        },
        resetRegisterStatus: (state) => {
            state.registerStatus = 'idle'
        },
        clearRegisterError: (state) => {
            state.registerError = null
        },
        resetLoginStatus: (state) => {
            state.loginStatus = 'idle'
        },
        clearLoginError: (state) => {
            state.loginError = null
        },

        // resetForgotPasswordStatus:(state)=>{
        //     state.forgotPasswordStatus='idle'
        // },
        // clearForgotPasswordSuccessMessage:(state)=>{
        //     state.forgotPasswordSuccessMessage=null
        // },
        // clearForgotPasswordError:(state)=>{
        //     state.forgotPasswordError=null
        // },
        // resetResetPasswordStatus:(state)=>{
        //     state.resetPasswordStatus='idle'
        // },
        // clearResetPasswordSuccessMessage:(state)=>{
        //     state.resetPasswordSuccessMessage=null
        // },
        // clearResetPasswordError:(state)=>{
        //     state.resetPasswordError=null
        // }


    },
    extraReducers: (builder) => {
        builder
            .addCase(registerAsync.pending, (state) => {
                state.registerStatus = 'pending'
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.registerStatus = 'fulfilled'
                state.loggedInUser = action.payload
                if (action.payload.data?.token) {
                    localStorage.setItem('token', action.payload.data.token)
                    localStorage.setItem('user', JSON.stringify(action.payload.data.user))
                }
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.registerStatus = 'rejected'
                state.registerError = action.error
            })

            .addCase(loginAsync.pending, (state) => {
                state.loginStatus = 'pending'
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loginStatus = 'fulfilled'
                state.loggedInUser = action.payload
                // Store token and user in localStorage
                if (action.payload.data?.token) {
                    localStorage.setItem('token', action.payload.data.token)
                    localStorage.setItem('user', JSON.stringify(action.payload.data.user))
                }
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loginStatus = 'rejected'
                state.loginError = action.error
            })
            // .addCase(forgotPasswordAsync.pending,(state)=>{
            //     state.forgotPasswordStatus='pending'
            // })
            // .addCase(forgotPasswordAsync.fulfilled,(state,action)=>{
            //     state.forgotPasswordStatus='fulfilled'
            //     state.forgotPasswordSuccessMessage=action.payload
            // })
            // .addCase(forgotPasswordAsync.rejected,(state,action)=>{
            //     state.forgotPasswordStatus='rejected'
            //     state.forgotPasswordError=action.error
            // })

            // .addCase(resetPasswordAsync.pending,(state)=>{
            //     state.resetPasswordStatus='pending'
            // })
            // .addCase(resetPasswordAsync.fulfilled,(state,action)=>{
            //     state.resetPasswordStatus='fulfilled'
            //     state.resetPasswordSuccessMessage=action.payload
            // })
            // .addCase(resetPasswordAsync.rejected,(state,action)=>{
            //     state.resetPasswordStatus='rejected'
            //     state.resetPasswordError=action.error
            // })

            .addCase(logoutAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(logoutAsync.fulfilled,(state)=>{
                state.status='fulfilled'
                state.loggedInUser=null
                
            })
            .addCase(logoutAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(checkAuthAsync.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(checkAuthAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.loggedInUser = action.payload
                state.isAuthChecked = true
            })
            .addCase(checkAuthAsync.rejected, (state, action) => {
                state.status = 'rejected'
                state.errors = action.error
                state.isAuthChecked = true
            })

    }
})

// exporting selectors
export const selectAuthStatus = (state) => state.AuthSlice.status
export const selectAuthErrors = (state) => state.AuthSlice.errors
export const selectLoggedInUser = (state) => state.AuthSlice.loggedInUser
export const selectAuthSuccessMessage = (state) => state.AuthSlice.successMessage
export const selectIsAuthChecked = (state) => state.AuthSlice.isAuthChecked
export const selectRegisterStatus = (state) => state.AuthSlice.registerStatus
export const selectRegisterError = (state) => state.AuthSlice.registerError
export const selectLoginStatus = (state) => state.AuthSlice.loginStatus
export const selectLoginError = (state) => state.AuthSlice.loginError
export const selectForgotPasswordStatus = (state) => state.AuthSlice.forgotPasswordStatus
export const selectForgotPasswordSuccessMessage = (state) => state.AuthSlice.forgotPasswordSuccessMessage
export const selectForgotPasswordError = (state) => state.AuthSlice.forgotPasswordError
export const selectResetPasswordStatus = (state) => state.AuthSlice.resetPasswordStatus
export const selectResetPasswordSuccessMessage = (state) => state.AuthSlice.resetPasswordSuccessMessage
export const selectResetPasswordError = (state) => state.AuthSlice.resetPasswordError


// exporting reducers
export const { clearAuthSuccessMessage, clearAuthErrors, resetAuthStatus, clearRegisterError, resetRegisterStatus, clearLoginError, resetLoginStatus, clearForgotPasswordError, clearForgotPasswordSuccessMessage, resetForgotPasswordStatus, clearResetPasswordError, clearResetPasswordSuccessMessage, resetResetPasswordStatus } = authSlice.actions

export default authSlice.reducer

