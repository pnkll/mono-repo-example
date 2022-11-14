import SelectNumber from '@components/SelectNumber/SelectNumber'
import Paginate from '@components/Table/Paginate/Paginate'
import Pagination from './pagination/Pagination'
import s from './Bottom.module.scss'

export default function Bottom(){
   return(
       <>
          <div className={s.container}>
            <Pagination/>
            <div className={s['right-side']}>
                {/* <SelectNumber
                    values={[5,10,15,20]}
                /> */}
            </div>
          </div>
       </>
   )
}