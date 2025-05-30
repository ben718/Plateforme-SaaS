import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import catalogReducer from './slices/catalogSlice';
import callsReducer from './slices/callsSlice';
import documentsReducer from './slices/documentsSlice';
import lexiconReducer from './slices/lexiconSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    catalog: catalogReducer,
    calls: callsReducer,
    documents: documentsReducer,
    lexicon: lexiconReducer,
    ui: uiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
