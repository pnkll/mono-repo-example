import Body from '@src/shared/UiKit/Table/ui/body/Body'
import Container from '@src/shared/UiKit/Table/ui/container/Container'
import Head from '@src/shared/UiKit/Table/ui/head/Head'
import Header from '@src/shared/UiKit/Table/ui/header/Header'
import ScrollContainer from '@src/shared/UiKit/Table/ui/scroll-container/ScrollContainer'
import s from './Table.module.scss'
import { useTable } from "react-table"
import Bottom from '@src/shared/UiKit/Table/ui/bottom/Bottom'

export default function Table({columns,data}) {
    const { prepareRow, rows, headerGroups, getTableProps, getTableBodyProps } = useTable({ columns, data })
    return (
        <>
            <Container open={true}>
                <Header />
                <ScrollContainer open={true}>
                    <table {...getTableProps()} className={s.container}>
                        <Head
                            headerGroups={headerGroups}
                        /> 
                        <Body 
                        headerGroups={headerGroups}
                        prepareRow={prepareRow} 
                        rows={rows} 
                        tableBodyProps={getTableBodyProps()}/>                            
                    </table>
                    <Bottom/>
                </ScrollContainer>
            </Container>
        </>
    )
}