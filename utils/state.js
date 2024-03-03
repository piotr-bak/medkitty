'use client'
import { createContext, useContext, useState } from 'react';

export const AnimalContext = createContext();

export function AnimalProvider ({ children }) {
    const [animalData, setAnimalData] = useState(
        {
            animalData: {},
            medicationData: {},
            scheduleData: { }
        }
    )
    
    const updateAnimalData = (data) => {
        setAnimalData((prevState) => ({...prevState, ...data}))
    }

    return (
        <AnimalContext.Provider value={{ animalData, updateAnimalData }}>
            {children}
        </AnimalContext.Provider>
    )
}

export function useAnimalState () {
    return useContext(AnimalContext);
}
