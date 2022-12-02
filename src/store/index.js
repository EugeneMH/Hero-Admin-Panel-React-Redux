import {configureStore} from '@reduxjs/toolkit'
import filters from '../components/heroesFilters/filtersSlice';
import { heroesApi } from '../api/sliceApi';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    } 
    return next(action)
}

// const store = createStore(
//                 combineReducers({filters, heroes}), 
//                 compose(
//                     applyMiddleware(ReduxThunk, stringMiddleware),
//                     // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//                 ));

const store = configureStore({
    reducer: {filters,  
              [heroesApi.reducerPath] : heroesApi.reducer
            },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, heroesApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;