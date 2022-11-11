import _ from 'lodash';
import React from 'react';
// import { setShowModal, useTrackedResumable } from '../../Providers/Resumable/ResumableContext';
import { useResumable } from '../../hooks/useResumable';
import ResumablePopup from '@components/Popup/ResumablePopup/ResumablePopup';
import { setShowModal, useTrackedResumable } from '@src/app/providers/resumable/index';

export default function FileInput({resumableId, options, ...other}) {
    const r = useResumable({id:resumableId, options})
    const [{showModal},dispatch]=useTrackedResumable()
    return (
        <>
            <input type='file' onChange={(e)=>r.addFiles(e.target.files)} {...other}/>
            {showModal===resumableId&& <ResumablePopup isOpen={showModal} onRequestClose={()=>dispatch(setShowModal(false))} r={r}/>
            }
        </>
    )
}