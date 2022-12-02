import { useEffect } from 'react';
import { fetchFilters } from '../heroesFilters/filtersSlice'
import { activeFilterChanged } from './filtersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectAll } from '../heroesFilters/filtersSlice';
import store from '../../store';

import Spinner from '../spinner/Spinner'


const HeroesFilters = () => {
    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const classNames = require('classnames');
    const filters = selectAll(store.getState())

    useEffect(() => {
        dispatch(fetchFilters())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (filtersLoadingStatus === 'loading') {
        return <Spinner/>
    } else if (filtersLoadingStatus === 'error') {
        return <h5 className="text-center mt-5">Loading Error</h5>
    }

    const renderFilters = (arr) => {
        return arr.map(({element, className}, i) => {

            let btnClass = classNames(className, {
                ' active': element === activeFilter
            })

            return <button 
            className={btnClass}
            key={i}
            onClick={() => dispatch(activeFilterChanged(element))}>{element}</button>
        })
    }

    const elements = renderFilters(filters);
    console.log(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Filter the hero by elements</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;