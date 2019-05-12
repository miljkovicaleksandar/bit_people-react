import React from 'react';



const Search = (props) => (
    <nav >
        <div className="nav-wrapper">
            <form>
                <div className="input-field">
                    <input id="search" type="search" required placeholder="Search" value={props.searchValue} onChange={props.search} />
                    <label className="label-icon" htmlFor="search"><i className="material-icons"></i></label>
                </div>
            </form>
        </div>
    </nav>
)

export default Search