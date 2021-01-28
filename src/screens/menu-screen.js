import LandingScreen from "./landing-screen";
import useApi from "../hooks/api";
import * as Actions from '../api/api-actions'
import CategorySelect from "../components/category-select";
import { MobileOnlyView, BrowserView, isMobile, isBrowser } from 'react-device-detect'
import {useState, useEffect} from "react";
import ProgressBar from "../components/progress-bar";
import EmptyListView from "../components/empty-list-view";
import Popup from "../components/popup";
import ErrorPopup from "../components/error-popup";

const MenuScreen = ({ ...props }) => {
    const api = useApi()
    const [categoriesExpanded, setCategoriesExpanded] = useState(isBrowser)
    const [dishes, setDishes] = useState({
        loaded: false,
        list: [],
        error: null
    })

    useEffect(() => {
        console.log(dishes)
    }, [dishes])

    const [currency, setCurrency] = useState('PLN')
    const possibleCurrencies = [
        'PLN',
        'EUR',
        'USD'
    ]

    const updateDishesList = subcategory => {
        setDishes({
            loaded: false,
            list: [],
            error: null
        })
        api.callAction(Actions.Dishes.list(subcategory.id, possibleCurrencies))
            .then(list => setDishes({
                loaded: true,
                list: list,
                error: null
            }))
            .catch(e => setDishes({
                loaded: true,
                list: [],
                error: e
            }))
    }

    useEffect(() => setScreenError(dishes.error), [dishes.error])

    const [screenError, setScreenError] = useState(null)


    return (
        <section>
            <ProgressBar active={!dishes.loaded} />
            <section className={'container'}>
                <section className='category-section'>
                    <BrowserView>
                        <p className='desktop-choose-category-label'>
                            Wybierz kategorię
                        </p>
                    </BrowserView>
                    <MobileOnlyView>
                        <CategoriesTrigger
                        expanded={categoriesExpanded}
                        onChange={val => setCategoriesExpanded(val)}
                        />
                    </MobileOnlyView>
                    <section style={{
                        overflow: 'hidden',
                        height: categoriesExpanded ? null : 0,
                        width: isMobile ? window.innerWidth : null
                    }}>
                        <CategorySelect
                            onSubcategoryChanged={updateDishesList}
                            onError={error => {
                                if(error == null && dishes.error != null) {
                                    error = dishes.error
                                }
                                setScreenError(error)
                            }}
                        />
                    </section>
                </section>
                <section className='dishes-section'>
                    <section className='currency-select-container'>
                        <p className='currency-select-label'>Waluta: </p>
                        <div className='select'>
                            <select value={currency} onChange={(event) => {
                                const value = event.target.value
                                setCurrency(value)
                            }}>
                                {possibleCurrencies.map((value, index) => (
                                    <option key={index}>{value}</option>
                                ))}
                            </select>
                        </div>
                    </section>
                    {dishes.list.map((item, index) => (
                        <section key={index} className='dish-container'>
                            <section className='dish-image-container'>
                                <img className='dish-image' src={item.picture} alt={'Zdjęcie'}/>
                            </section>
                            <section className='dish-title-container'>
                                <p className='dish-name'>{item.name}</p>
                                <p className='dish-description'>{item.description}</p>
                            </section>
                            <section className='dish-currency-container'>
                                <p className='dish-price'>{item.convertedPrice[currency]} {currency}</p>
                            </section>
                        </section>
                    ))}
                    <EmptyListView show={dishes.loaded && dishes.list.length === 0} text={'Niestety, nie znaleziono dań dla podanej kategorii'} />
                </section>
            </section>
            <ErrorPopup error={screenError} />
        </section>
    )
}

const CategoriesTrigger = ({ expanded, onChange, ...props }) => {
    if(typeof onChange !== 'function') {
        onChange = val => {}
    }
    return expanded ? (
            <section onClick={() => onChange(!expanded)}>
                <p className='mobile-choose-category-label'>
                    <i className="fas fa-chevron-up expand-icon"/>
                    Zwiń kategorie
                </p>
            </section>
    ) : (
        <section onClick={() => onChange(!expanded)}>
            <p className='mobile-choose-category-label'>
                <i className="fas fa-chevron-down expand-icon"/>
                Rozwiń kategorie
            </p>
        </section>
    )
}


export default MenuScreen