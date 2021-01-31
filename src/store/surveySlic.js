import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const createSurvey = createAsyncThunk(
    'surveys/createSurvey', 
    async (_,thunkAPI) => {
    const newSurveyId = String(thunkAPI.getState().surveys.length + 1);
    return newSurveyId;
})


export const surveySlice = createSlice({
    name: "surveys",
    initialState: [],
    reducers:{
        addQuestion: (state, action) => {
            const {surveyId, type, options, question} = action.payload;
            const q = state.find((s) => String(s.surveyId) === String(surveyId)).questions;
            console.log(q,"Q");
            const qId = String(q.length + 1);
            q.push({qId, type, question, options});
            console.log(q);
        },
        markPublished: (state, action) =>{
            const {surveyId} = action.payload;
            state.find((s)=> String(s.surveyId) === String(surveyId)).isPublished = true;
        }       
        },
    extraReducers:{
        [createSurvey.fulfilled]: (state, action) =>{
            state.push({questions:[], surveyId: action.payload, isPublished: false});
        },
    },
})