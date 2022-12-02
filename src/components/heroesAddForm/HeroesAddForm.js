import { useSelector } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { selectAll } from "../heroesFilters/filtersSlice";
import store from "../../store";

import { useCreateHeroMutation } from "../../api/sliceApi";

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroText, setHeroText] = useState('');
    const [heroElement, setHeroElement] = useState('');
    const {filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState())

    const [createHero] = useCreateHeroMutation();

    const createNewHero = (e) => {
        e.preventDefault();
        const id = uuidv4();
        const newHero = {
            name: heroName,
            description: heroText, 
            element: heroElement,
            id: id
        }

        createHero(newHero);

        setHeroName('');
        setHeroText('');
        setHeroElement('');
    }

    const renderOptions = (filters, status) => {

        if (status === 'loading') {
            return <option>'Loading of elements...'</option>
        } else if (status === 'error'){
            return <option>'Loading failed'</option>
        }   

        if (filters && filters.length > 0) {
            return filters.map((item, i) => {
                if (item.element === 'All') {
                    return null;
                }
                return (    
                    <option key={i} value={item.element}>{item.element}</option>
                )
            })
        }

    }

    const options = renderOptions(filters, filtersLoadingStatus);

    return (
        <form className="border p-4 shadow-lg rounded" 
        onSubmit={(e) => createNewHero(e)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">New Hero's name</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="What's my name?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Description</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="What are my skills?"
                    style={{"height": '130px'}}
                    value={heroText}
                    onChange={(e) => setHeroText(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Choose the hero's element</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}>
                    <option >I control the element...</option>
                    {options}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    )
}

export default HeroesAddForm;