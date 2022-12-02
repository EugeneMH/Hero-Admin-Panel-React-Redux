
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/sliceApi';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "./heroesList.css"

const HeroesList = () => {

    const {data: heroes = [],
           isError,
           isLoading} = useGetHeroesQuery();

    const activeFilter = useSelector(state => state.filters.activeFilter)
    const [deleteHero] = useDeleteHeroMutation();
    
    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice();

        if (activeFilter === 'All') {
            return filteredHeroes
        } else {
            return filteredHeroes.filter(hero => hero.element === activeFilter)
        }
    }, [heroes, activeFilter])

    const deleteChar = useCallback((id) => {
        deleteHero(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Loading failure</h5>
    }

    const renderHeroesList = (arr) => {
        
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">No heroes here yet :(</h5>
                </CSSTransition>
            )
        }


        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition
                key={id}
                timeout={500}
                classNames="hero">
                    <HeroesListItem
                    {...props}
                    onDelete={() => deleteChar(id)}
                    />
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component="ul">
            {elements}  
        </TransitionGroup>
    )
}

export default HeroesList;