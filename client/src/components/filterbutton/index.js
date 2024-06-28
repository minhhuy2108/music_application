import React, { useState } from 'react'
import "./filterbutton.css"
import { IoChevronDown } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { actionType } from '../../context/reducer'
import { useStateValue } from '../../context/StateProvider'

const FilterButton = ({ flag, filterData }) => {
    const [filterName, setFilterName] = useState(null);
    const [filterMenu, setFilterMenu] = useState(false);
    const [{ artistFilter, albumFilter, filterTerm, languageFilter }, dispatch] = useStateValue();

    const updateFilterButton = (name) => {
        setFilterName(name);
        setFilterMenu(false);
        if (flag === "Artist") {
            dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: name });
        }
        if (flag === "Language") {
            dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: name });
        }

        if (flag === "Albums") {
            dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: name });
        }

        if (flag === "Category") {
            dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: name });
        }

    };
    return (
        <div className="filter-button-1">
            <p className='filter-button-6'
                onClick={() => setFilterMenu(!filterMenu)}
            >
                {!filterName && flag}
                {filterName && (
                    <>
                        {filterName.length > 15
                            ? `${filterName.slice(0, 14)}...`
                            : filterName}
                    </>
                )}
                <IoChevronDown className={` ${filterMenu ? "filter-button-3" : "filter-button-4"}`} />
            </p>
            {filterData && filterMenu && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="filter-button-2"
                >
                    {filterData?.map((data) => (
                        <div
                            key={data.name}
                            className="filter-button-5"
                            onClick={() => updateFilterButton(data.name)}
                        >
                            {(flag === "Artist" || flag === "Albums") && (
                                <img
                                    src={data.imageURL}
                                    className="filter-button-7"
                                    alt=""
                                />
                            )}
                            <p style={{ width: 100 }}>
                                {data.name.length > 15
                                    ? `${data.name.slice(0, 14)}...`
                                    : data.name}
                            </p>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    )
}

export default FilterButton
