import s from './FillRow.module.scss'

export default function FillRow({headerGroups}){
   return(
       <>
          <tr className={s.container}>
            <td colSpan={headerGroups[headerGroups.length-1].headers.length}/>
          </tr>
       </>
   )
}