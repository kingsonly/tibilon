import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch properties from API
export const fetchProperties = createAsyncThunk('properties/fetchProperties', async () => {
  const response = await fetch('https://api.example.com/properties');
  const data = await response.json();
  return data;
});

// Async thunk to add a property
export const addProperty = createAsyncThunk('properties/addProperty', async (propertyData) => {
  const response = await fetch('https://api.example.com/properties', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(propertyData),
  });
  const data = await response.json();
  return data;
});

// Async thunk to update a property
export const updateProperty = createAsyncThunk('properties/updateProperty', async ({ id, propertyData }) => {
  const response = await fetch(`https://api.example.com/properties/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(propertyData),
  });
  const data = await response.json();
  return { id, updatedProperty: data };
});

// Async thunk to delete a property
export const deleteProperty = createAsyncThunk('properties/deleteProperty', async (propertyId) => {
  await fetch(`https://api.example.com/properties/${propertyId}`, {
    method: 'DELETE',
  });
  return propertyId;
});

const propertiesSlice = createSlice({
  name: 'properties',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        const { id, updatedProperty } = action.payload;
        const existingProperty = state.list.find(property => property.id === id);
        if (existingProperty) {
          Object.assign(existingProperty, updatedProperty);
        }
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        const propertyId = action.payload;
        state.list = state.list.filter(property => property.id !== propertyId);
      });
  },
});

export default propertiesSlice.reducer;
