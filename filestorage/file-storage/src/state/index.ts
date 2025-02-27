import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateType {
    isSidebarCollapsed: boolean;
}

// INITIALIZING STATES
const initialState: InitialStateType = {
    isSidebarCollapsed: false,
}

// CREATING SLICE
export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setIsSidebarCollapsed: (state,action:PayloadAction<boolean>) => {
        state.isSidebarCollapsed = action.payload;
    }
}
})

export const { setIsSidebarCollapsed } = globalSlice.actions;

export default globalSlice.reducer;