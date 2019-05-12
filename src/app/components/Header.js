import React from "react"
import { Link } from 'react-router-dom'


class Header extends React.Component {

    render() {
        const { useListLayout, onSwitchClick, refresh, onAboutClick } = this.props
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo center">React Users</Link>

                    {useListLayout ? <i onClick={onSwitchClick} className="fas fa-th-large right"></i> :
                        <i onClick={onSwitchClick} className="fas fa-list right"></i>}
                    <i onClick={refresh} className="fas fa-redo-alt right"></i>
                    <Link to="/about" className="right ">About</Link>
                </div>
            </nav >
        )
    }
}

export default Header

