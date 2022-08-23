import { isNil } from "lodash"
import { useState } from "react"

export default (function useDrag(setItems,items,endCallback,overCallback) {
    const [currentOrder, setCurrentOrder] = useState(null)
    const dragStartHandler = (e, header) => {
        setCurrentOrder(header.order)
    }
    const dragEndHandler = (e) => {
        !isNil(endCallback)?endCallback():e.target.style.background = 'white'
    }
    const dragOverHandler = (e) => {
        e.preventDefault()
        !isNil(overCallback)?overCallback():e.target.style.background = 'beige'
    }
    const dropHandler = (e, header) => {
        e.preventDefault()
        !isNil(currentOrder) && setItems(items.map(item => item.order === header.order ? { ...item, order: currentOrder } : item.order === currentOrder ? { ...item, order: header.order } : item))
    }
    const sortItems = (a,b)=>{
        if(a.order>b.order){
            return 1
        } else{
            return -1
        }
    }
    return {dragStartHandler,dragEndHandler,dragOverHandler,dropHandler,sortItems}
})