import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import Tags from "./Tags";
import Questions from "./Questions";
import {Users} from "./Users";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Search = () => {
    const options = useQuery()
    const [data, setData] = useState(false)


    useEffect(() => {
        if (options.get('type') === 'tags') {
            fetch(`http://localhost:8080/api/categories`).then(res => res.json())
                .then(res => {
                    let result = res?.filter(elem => elem?.title.toUpperCase().includes(options.get('body').toUpperCase()))
                    setData(result)
                })
        } else if (options.get('by') === 'tags') {
            fetch(`http://localhost:8080/api/posts`).then(res => res.json())
                .then(res => {
                    let result = res?.rows.filter(elem => elem?.category?.join('').toUpperCase().includes(options.get('body')?.toUpperCase()))
                    setData({rows: result, likes: res.likes})
                })

        } else if (options.get('type') === 'questions') {
            fetch(`http://localhost:8080/api/posts`).then(res => res.json())
                .then(res => {
                    let result = res?.rows.filter(elem => elem?.title.toUpperCase().includes(options.get('body').toUpperCase()))
                    setData({rows: result, likes: res.likes})
                })

        } else if (options.get('type') === 'users') {
            fetch(`http://localhost:8080/api/users`).then(res => res.json())
                .then(res => {
                    let result = res?.filter(elem => elem?.login.toUpperCase().includes(options.get('body').toUpperCase()))
                    setData(result)
                })

        }
    }, [])

    if (!data || data?.length === 0) {
        return <h3>Not Found</h3>
    }

    if (options.get('by') === 'tags') {
        return (
            <Questions searchedItems={data} />
        )
    }

    if (options.get('type') === 'tags' && data) {
        return (
            <Tags searchedItems={data} />
        )
    }

    if (options.get('type') === 'questions' && data) {
        return (
            <Questions searchedItems={data} />
        )
    }

    if (options.get('type') === 'users' && data) {
        return (
            <Users searchedItems={data} />
        )
    }

    return <h3>Loading...</h3>
}

export default Search