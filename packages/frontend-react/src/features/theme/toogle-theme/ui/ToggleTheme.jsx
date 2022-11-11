import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import { selectTheme } from '@src/features/theme/toogle-theme/model/selectTheme'
import { withToggle } from '@src/features/theme/toogle-theme/model/withToggle'
import s from './ToggleTheme.module.scss'

function ToggleTheme({ callback,theme }) {
    return (
        <>
            {theme === 'dark'
                ? <MoonIcon width={20} onClick={callback} className={s.icon}/>
                : <SunIcon width={20} onClick={callback} className={s.icon}/>}
        </>
    )
}

export default withToggle(ToggleTheme,'ToggleTheme')