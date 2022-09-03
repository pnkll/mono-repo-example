import React from 'react';
import './HistoryItem.scss'

export default React.memo(function HistoryItem(){
   return(
       <>
       <div className="history-item__container">
        <div className="history-item__wrapper" style={{ background: '#fff', padding: '5px 12px', borderRadius: '5px'}}>
            <p className='history-item__status' style={{ width: 'fit-content',background: 'red', padding: '4px', borderRadius: '3px', marginLeft: '12px', color: 'white'}}>Закрыта</p>
            <div className="history-item__description">Сообщение об аварии на улице овыафрдлвоыфражв авыплвоы аовырап</div>
            <div className="history-item__footer">
                <hr className='history-item__separator' style={{backgroundColor: 'black'}}/>
                <span style={{fontSize: '11px'}}>02.09.2022, 03:23 - Диспетчер Романов Евгений</span>
            </div>
        </div>
       </div>
       </>
   )
})