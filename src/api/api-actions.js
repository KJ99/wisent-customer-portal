import {convertToSneakCase} from "../utilities/case-converter";

const urls = {

}

const standardHeaders = {
    'Accept': 'application/json',
    'Origin': 'admin.wisent.local',
}

const standardPostPatchHeaders = contentType => {
    return {
        ...standardHeaders,
        'Content-Type': contentType
    }
}

const createConfig = (endpoint, method, contentType = 'application/json') => {
    return {
        endpoint: endpoint,
        method: method,
        contentType: contentType,
        body: data => {
            return contentType === 'application/json' ? JSON.stringify(convertToSneakCase(data)) : data
        },
        headers: () => {
            return method === 'POST' || method === 'PATCH' ? standardPostPatchHeaders(contentType) : standardHeaders
        }
    }
}

const createGetConfig = endpoint => createConfig(endpoint, 'GET')
const createPostConfig = (endpoint, contentType = 'application/json') => createConfig(endpoint, 'POST', contentType)
const createPatchConfig = (endpoint, contentType = 'application/json') => createConfig(endpoint, 'PATCH', contentType)
const createDeleteConfig = endpoint => createConfig(endpoint, 'DELETE')

export const Categories = {
    list: () => createGetConfig('/menu/categories')
}

export const Dishes = {
    list: (subcategoryId, currencies = []) => createGetConfig(`/menu?visible=true&subcategory_id=${subcategoryId}&multi_currency=true&currencies=${encodeURI(currencies.join(','))}`)
}

export const Reservations = {
    availablePlaces: (day) => createGetConfig(`/reservations/places/${day}`),
    reserve: () => createPostConfig('/reservations')
}