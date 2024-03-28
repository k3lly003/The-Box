import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateType {
    isSidebarCollapsed: boolean;
    isDarkMode: boolean;
}

// INITIALIZING STATES
const initialState: InitialStateType = {
    isSidebarCollapsed: false,
    isDarkMode: false,
}

// CREATING SLICE
export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setIsSidebarCollapsed: (state,action:PayloadAction<boolean>) => {
        state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state,action:PayloadAction<boolean>) => {
        state.isDarkMode = action.payload;
    }
}
})

export const { setIsSidebarCollapsed, setIsDarkMode } = globalSlice.actions;

export default globalSlice.reducer;