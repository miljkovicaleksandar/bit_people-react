import React from 'react';
import User from './User';
import UserCard from './UserCard';
import Search from './Search';
import Loader from './Loader'
import { Switch, Route } from 'react-router-dom';



class Main extends React.Component {
    render() {
        const { users, searchValueUsers, searchValue, useListLayout, search } = this.props;

        if (!users.length) {
            return <Loader />
        }

        return (
            <>

                <Search search={search} searchValue={searchValue} />
                <div className="clearfix container">
                    {searchValueUsers.map((user, i) => (
                        useListLayout
                            ? <User user={user} key={i} />
                            : <UserCard user={user} key={i} />
                    ))}
                </div>
            </>
        )
    }

}
export default Main