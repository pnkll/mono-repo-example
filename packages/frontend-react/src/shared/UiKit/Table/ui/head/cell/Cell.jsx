import HeaderInput from '@components/Table/HeaderInput/HeaderInput'
import HeaderSort from '@components/Table/HeaderSort/HeaderSort'
import s from './Cell.module.scss'

export default function Cell({header,...other}){

    const selectType = () => {
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

   return(
       <>
          <th
          className={s.cell}
          {...other}>
            {selectType()}
          </th>
       </>
   )
}