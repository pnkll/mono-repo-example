import s from './PriorityDisplay.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(s)

export default function PriorityDisplay({ value }) {

    const priorityConfig = [
        { label: 'Очень срочно', value: 4 },
        { label: 'Срочно', value: 3 },
        { label: 'Высокий', value: 2 },
        { label: 'Средний', value: 1 },
        { label: 'Низкий', value: 0 }
    ]

    return (
        <>
            <div className={cx({container: true, ['priority'+value]:value})}>
                {priorityConfig.find(item=>item.value===value)?.label}
            </div>
        </>
    )
}