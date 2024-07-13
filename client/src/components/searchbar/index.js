import React from 'react'
import { useStateValue } from '../../context/StateProvider'
import { actionType } from '../../context/reducer'
import { IoSearch } from 'react-icons/io5'
import './searchbar.css'

export const SearchBar = () => {
    const [{ searchTerm }, dispatch] = useStateValue();

    const setSearchTerm = (value) => {
        dispatch({
            type: actionType.SET_SEARCH_TERM,
            searchTerm: value,
        });
    };
    return (
        <div className="search-bar-01">
            <div className="search-bar-02">
                <IoSearch className="search-bar-03" />
                <input
                    type="text"
                    value={searchTerm}
                    className="search-bar-04 "
                    placeholder="Search here ..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    )
}
