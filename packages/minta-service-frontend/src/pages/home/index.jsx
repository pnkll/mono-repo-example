import { Button } from "@minta/ui-kit"

import s from './styles.module.scss'

export function HomePage(){
    return(<>
    <div className="">some example
    <Button text='hello' cn={s.button}/>
    </div>
    </>)
}