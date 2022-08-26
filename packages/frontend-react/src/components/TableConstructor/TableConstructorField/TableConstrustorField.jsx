import { XIcon } from '@heroicons/react/outline';
import { isNil } from 'lodash';
import React, { useEffect, useState } from 'react';
import Input from '../../Input/Input.jsx';
import Select from '../../Select/Select.jsx';
import ToggleInput from '../../ToggleInput/ToggleInput.jsx';
import './TableConstructorField.scss'

export default React.memo(function TableConstructorField({ field, fields, setFields, index, errors }) {
    const handleRemove = () => {
        fields.length > 1 && setFields(fields.filter((el, idx) => index !== idx))
    }
    const handleChange = (field, value, index) => {
        setFields(fields.map((el, idx) => idx === index ? { ...el, [field]: value } : el))
    }
    const options = [
        { value: 'string', label: 'string' },
        { value: 'number', label: 'number' },
        { value: 'date', label: 'date' },
    ]
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    useEffect(()=>{
        !isNil(errors)&&errors&&setMenuIsOpen(true)
    },[errors])
    return (
        <>
            <div className="table-constructor__field__container" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <XIcon width={20} onClick={handleRemove} color='red' style={{ cursor: 'pointer', position: 'absolute', left: '156px', top: '6px' }} />
                <div className="table-constructor__field__elem">
                    <Input placeholder={'Title'} handleChange={(e) => handleChange('title', e.target.value, index)} id='title' name='title' value={field.title} className={'table-constructor__field__title__input'} />
                    <span className='table-constructor__field__elem__bar' onClick={() => setMenuIsOpen(!menuIsOpen)}>
                        <svg width='10px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M2 6.75A.75.75 0 012.75 6h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 6.75zm0 6.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>
                    </span>
                    {!isNil(errors) && errors.title?.type === 'required' && <p style={{ margin: 0, color: 'red', position: 'absolute',top: '3px',left: '6px' }}>*</p>}
                </div>
                <div className={`table-constructor__field__menu${menuIsOpen ? '' : ' hide'}`}>
                            <div className="table-constructor__field__menu__elem">
                                <Input placeholder={'Code'} handleChange={(e) => handleChange('code', e.target.value, index)} id='code' name='code' value={field.code} />
                                {!isNil(errors) && errors.code?.type !== 'required' && <p style={{ margin: 0, fontSize: '12px', color: 'red' }}>{errors.code?.errors[0]}</p>}
                            </div>
                            <Select id='type' name='type' options={options} value={options.find(option => option.value === field.type)} defaultValue={options.find(option => option.value === field.type)} isSearchable={false} menuPlacement={'bottom'} handleChange={(e) => handleChange('type', e, index)} />
                            <ToggleInput id='required' name='required' handleChange={(e) => handleChange('required', e.target.checked, index)} checked={field.required} label={'is required?'} />
                            <ToggleInput id='unique' name='unique' handleChange={(e) => handleChange('unique', e.target.checked, index)} checked={field.unique} label={'is unique?'} />
                            <ToggleInput id='toIndex' name='toIndex' handleChange={(e) => handleChange('toIndex', e.target.checked, index)} checked={field.toIndex} label={'is to index?'} />
                        </div>
            </div>
        </>
    )
})

