import s from './TaskEditableItem.module.scss'
import React from 'react'
import { useParams } from 'react-router-dom'
import { isNil } from 'lodash'

export default function TaskEditableItem({ value, label, readOnly, children, api, name }) {
  const { id } = useParams()
  const [editMode, setEditMode] = React.useState(false)
  const [showChild, setShowChild] = React.useState(isNil(value) ? false : true)
  const [updateTask,{isSuccess}] = api()
  function handleChange(e) {
    updateTask({ taskId: id, [name]: e })
  }
  const childrenWithProps = React.useMemo(() => React.Children.map(children, (child) =>
    React.cloneElement(child, {
      readOnly: editMode ? false : true,
      value: value,
      onChange: handleChange,
    })), [editMode,value])
  function handleClick() {
    if (!isNil(value)) {
      editMode
        && isNil(value)
        && setShowChild(false)
      setEditMode(v => !v)
    } else {
      setShowChild(true)
      setEditMode(true)
    }
  }
  React.useEffect(()=>{
    isSuccess&&setEditMode(false)
  },[isSuccess])
  return (
    <>
      <div className={s.container}>
        <div className={s.header}>
          {label}
          <button className={s.button} onClick={handleClick}>
            {showChild
              ? editMode
                ? 'отменить'
                : 'сменить'
              : 'назначить'}
          </button>
        </div>
        {showChild && childrenWithProps}
      </div>
    </>
  )
}