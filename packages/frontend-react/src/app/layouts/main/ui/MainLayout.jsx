import { withSidebar } from '@src/app/layouts/main/model/withSidebar/withSidebar'
import { Header } from '@src/widgets/Header/index'
import { Sidebar } from '@src/widgets/sidebar/index'
import { Outlet } from 'react-router-dom'
import s from './MainLayout.module.scss'

function MainLayout() {
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
            </div>
        </>
    )
}

export default MainLayout
//withSidebar(MainLayout,'MainLayout')