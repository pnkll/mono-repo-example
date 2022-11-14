import Cell from '@src/shared/UiKit/Table/ui/head/cell/Cell'
import Row from '@src/shared/UiKit/Table/ui/head/row/Row'
import s from './Head.module.scss'

export default function Head({ getTableHeadProps, headerGroups }) {

    const selectType = (header) => {
        try {
            switch (header.type) {
                case 'filter': return <HeaderInput header={header} handleSearch={handleSearch} />
                case 'sort': return <HeaderSort header={header} columns={columns} sortDataCallback={sortDataCallback} />
            }
        } catch (error) {
            return header.render('Header')
        }
        return header.render("Header")
    }

    return (
        <>
            <thead
                className={s.container}
            >
                {headerGroups.map(headerGroup =>
                    <Row
                        {...headerGroup.getHeaderGroupProps()}
                        headerGroup={headerGroup}
                        >
                        {headerGroup.headers.map(header =>
                            <Cell
                                {...header.getHeaderProps()}
                                header={header}
                                {...header.getHeaderProps}
                            />
                        )}
                    </Row>)}
            </thead>
        </>
    )
}