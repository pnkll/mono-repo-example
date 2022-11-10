import s from './Sidebar.module.scss'
import './override.scss'
//import { Menu, MenuItem, ProSidebar, Sidebar as ReactSidebar, SidebarHeader, SubMenu } from 'react-pro-sidebar'
import { ClipboardListIcon, HomeIcon, XIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
import { Menu, MenuItem, ProSidebar, SidebarContent, SidebarHeader, SubMenu,SidebarFooter } from 'react-pro-sidebar'
import { CogIcon, TableIcon } from '@heroicons/react/solid'

export default function Sidebar() {
    return (
        <>
            <ProSidebar
                collapsed={true}
                collapsedWidth={'75px'}>
                <SidebarHeader className={s.header}>
                    <HomeIcon width={27} />
                </SidebarHeader>
                <SidebarContent className={s.content}>
                    <Menu>
                        <SubMenu icon={<HomeIcon width={27} />}>
                            <MenuItem><Link to='../demo'>Demo</Link></MenuItem>
                            <MenuItem><Link to='../tasks'>Tasks</Link></MenuItem>
                            <MenuItem><Link to='../call-center'>Control</Link></MenuItem>
                            <MenuItem><Link to='../operator'>Operator</Link></MenuItem>
                            <MenuItem><Link to='../users'>Пользователи</Link></MenuItem>
                        </SubMenu>
                        <SubMenu title="Таблицы" icon={<TableIcon width={27} />}>
                            <MenuItem><Link to='../tables'>Список таблиц</Link></MenuItem>
                            <MenuItem><Link to='../tables/new'>Создать</Link></MenuItem>
                        </SubMenu>
                        <SubMenu title="Задачи" icon={<ClipboardListIcon width={27} />}>
                            <MenuItem><Link to='../tasks'>Все</Link></MenuItem>
                            <MenuItem><Link to='../events'>Календарь</Link></MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    <Menu>
                        <MenuItem icon={<CogIcon width={27}/>}>
                            <Link to='../settings'/>
                        </MenuItem>
                    </Menu>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}