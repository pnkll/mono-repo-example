import { PriorityDisplayWithLabel } from '@src/entities/priority/PriorityDisplay/index'
import { Item } from '@src/shared/UiKit/Descriptions/index'
import { TextAreaWithLabel } from '@src/shared/UiKit/TextArea/index'
import s from './TaskCard.module.scss'

export default function TaskCard({ data, isLoading }) {

    if (isLoading) {
        return <>Preloader</>
    }

    return (
        <>
            <div className={s.container}>
                <Item label='Статус'>{data.status}</Item>
                <PriorityDisplayWithLabel label='Приоритет' value={data.priority} />
                <TextAreaWithLabel label='Описание' value={data.description} readOnly={true} />
            </div>
        </>
    )
}