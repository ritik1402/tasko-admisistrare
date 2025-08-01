import {createSlice,nanoid} from '@reduxjs/toolkit';

const initialState = {
    users: [{
        id: nanoid(),
        name: 'John Doe',
    }]
};

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        
    }
});
