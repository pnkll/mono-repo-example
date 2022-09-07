import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export default React.memo(function AutoTextArea({ maxLength = 10 }) {
    const [value, setValue] = useState('')
    return (
        <>
            <div className="">
                <TextareaAutosize
                    maxRows={5}
                    minRows={3}
                    value={value}
                    maxLength={maxLength}
                    onChange={(e) => setValue(e.target.value)} />
            </div>
            <p>{value.length}:{maxLength}</p>
        </>
    )
})