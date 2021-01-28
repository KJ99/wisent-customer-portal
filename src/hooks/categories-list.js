import {useState, useEffect} from "react";
import useApi from "./api";
import * as Actions from '../api/api-actions'

const useCategoriesList = () => {
    const api = useApi()
    const [data, setData] = useState({
        loaded: false,
        error: null,
        list: []
    })

    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedSubcategory, setSelectedSubcategory] = useState(null)

    useEffect(() => {
        api.callAction(Actions.Categories.list())
            .then(list => {
                setData({
                    loaded: true,
                    error: null,
                    list: list
                })
            })
            .catch(e => {
                setData({
                    loaded: false,
                    error: e,
                    list: []
                })
            })
    }, [])

    useEffect(() => {
        const categoryWithSubcategories = data.list.find(item => item.subcategories.length > 0)
        const selected = categoryWithSubcategories != null
            ? categoryWithSubcategories
            : data.list.length > 0 ? data.list[0] : null
        setSelectedCategory(selected)
    }, [data.list])

    useEffect(() => {
        const selected = selectedCategory?.subcategories?.length > 0
            ? selectedCategory.subcategories[0]
            : null
        setSelectedSubcategory(selected)
    }, [selectedCategory])

    let loaded = data.loaded
    let error = data.error
    let categories = data.list

    return [loaded, error, categories, selectedCategory, setSelectedCategory, selectedSubcategory, setSelectedSubcategory]
}

export default useCategoriesList