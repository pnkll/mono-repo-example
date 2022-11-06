import ToggleInput from '@components/ToggleInput/ToggleInput'
import { orgApi } from '@services/OrganizationService'
import { withTransition } from '@src/hocs/withTransition/withTransition'
import ContentItemOverlay from '@src/overlays/ContentItemOverlay/ContentItemOverlay'
import { useParams } from 'react-router-dom'
import s from './OrganizationPage.module.scss'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import moment from 'moment'
import { dateFormat } from '@src/helpers/dateFormat'

function OrganizationPage() {
    const { id } = useParams()
    const { data: org, isSuccess } = orgApi.useGetOrgQuery()
    return (
        <>
            {isSuccess &&
                <ContentItemOverlay label={org.short_name}>
                    <ul className={s.container}>
                        <li className={s.elem}>Инн: {org.inn}</li>
                        <li className={s.elem}>E-mail: {org.email}</li>
                        <li className={s.elem}>Дата регистрации: {dateFormat(new Date(org.createdAt),'table')}</li>
                        <li className={s.elem}>Активирована: <ToggleInput checked={org.activated} readOnly={true} /></li>
                        <li className={s.elem}>Пространство на диске: {`${org.diskSpace / 1024 / 1024} Mb`}</li>
                        <li className={s.elem}>Использовано: {`${org.diskSpaceUsed / 1024 / 1024} Mb`}</li>
                    </ul>
                </ContentItemOverlay>}
        </>
    )
}

export default OrganizationPage = withTransition(OrganizationPage, 'OrganizationPage', 'right')