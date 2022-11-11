import { withSidebar } from '@src/shared/ui/templates/main/model/withSidebar/withSidebar'
import { Header } from '@src/widgets/Header/index'
import { NotifyContainer } from '@src/widgets/NotifyContainer/index'
import { Sidebar } from '@src/widgets/sidebar/index'
import { Outlet } from 'react-router-dom'
import s from './MainTemplate.module.scss'

function MainTemplate() {
    return (
        <>
            <div className={s.container}>
                <Sidebar />
                <div className={s['main-section']}>
                    <Header/>
                        <div className={s['content-section']}>
                            <Outlet />
                        </div>
                </div>
                <NotifyContainer/>
            </div>
        </>
    )
}

export default MainTemplate
//withSidebar(MainLayout,'MainLayout')