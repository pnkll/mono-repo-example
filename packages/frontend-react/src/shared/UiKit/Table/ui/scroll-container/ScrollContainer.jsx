import s from './ScrollContainer.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(s)

export default function ScrollContainer({ children, open }) {
    return (
        <>
            <div className={cx(s.container, { open })}>
                {children}
            </div>
        </>
    )
}