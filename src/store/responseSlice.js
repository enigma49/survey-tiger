import { createSlice } from "@reduxjs/toolkit";

export const responseSlice = createSlice({
    name: "a",
    initialState: "",
    reducers:{
        print:state => console.log(state)
    }
})