import {useEffect} from "react";
import useCategoriesList from "../hooks/categories-list";
import '../assets/css/menu.css'

const CategorySelect = ({ onSubcategoryChanged, onError, ...props }) => {
    const [
        loaded,
        error,
        categories,
        selectedCategory,
        setSelectedCategory,
        selectedSubcategory,
        setSelectedSubcategory
    ] = useCategoriesList()

    useEffect(() => {
        if(typeof onSubcategoryChanged === 'function' && selectedSubcategory != null) {
            onSubcategoryChanged(selectedSubcategory)
        }
    }, [selectedSubcategory])

    useEffect(() => {
        if(typeof onError == 'function') {
            onError(error)
        }
    }, [error])

    return (
        <section className='category-select-container'>
            {categories.map((item, index) => (
                <CategorySelectItem
                    key={index}
                    category={item}
                    selectedCategory={selectedCategory}
                    selectedSubcategory={selectedSubcategory}
                    onCategoryChanged={category => setSelectedCategory(category)}
                    onSubcategoryChanged={subcategory => setSelectedSubcategory(subcategory)}
                    />
            ))}
        </section>
    )
}

const CategorySelectItem = ({ category, selectedCategory, selectedSubcategory, onCategoryChanged, onSubcategoryChanged, ...props }) => {
    const isActive = selectedCategory?.id === category?.id
    return (
        <section
            className={`select-item category-select-item ${isActive ? 'selected-category' : ''}`}
            onClick={() => {
                if(typeof onCategoryChanged === 'function') {
                    onCategoryChanged(category)
                }
            }}
        >
            <p>{category.name}</p>
            <SubcategoriesList
                isOpen={isActive}
                subcategories={category.subcategories}
                selectedSubcategory={selectedSubcategory}
                onSubcategoryChanged={onSubcategoryChanged}
            />
        </section>
    )
}

const SubcategoriesList = ({ subcategories, isOpen, selectedSubcategory, onSubcategoryChanged }) => {
    return isOpen ? (
        <section>
            {subcategories.map((item, index) => {
                const isActive = item?.id === selectedSubcategory?.id
                return (
                    <section
                        className={`select-item subcategory-select-item ${isActive ? 'selected-subcategory' : ''}`}
                        key={`subcategory_${index}`}
                        onClick={() => {
                            if(typeof onSubcategoryChanged === 'function') {
                                onSubcategoryChanged(item)
                            }
                        }}
                    >
                        <p>{item.name}</p>
                    </section>
                )
            })}
        </section>
    ) : null
}

export default CategorySelect