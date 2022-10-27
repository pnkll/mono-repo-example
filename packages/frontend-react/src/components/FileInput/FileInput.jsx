import _ from 'lodash';
import React from 'react';
import { setShowModal, useTrackedResumable } from '../../Providers/Resumable/ResumableContext';
import { useResumable } from '../../hooks/useResumable';
import ResumableModal from '../ResumableModal/ResumableModal';

export default function FileInput({resumableId, options, ...other}) {
    const r = useResumable({id:resumableId, options})
    const [{showModal},dispatch]=useTrackedResumable()
    return (
        <>
            <input type='file' onChange={(e)=>r.addFiles(e.target.files)} {...other}/>
            {showModal===resumableId&&<ResumableModal isOpen={showModal===resumableId} setIsOpen={(e)=>dispatch(setShowModal(e))} r={r}/>}
        </>
    )
}