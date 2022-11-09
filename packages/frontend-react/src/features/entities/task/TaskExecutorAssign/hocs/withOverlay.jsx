import React from 'react'
import s from './withOverlay.module.scss'

export function withOverlay(Component, displayName) {
    function Overlay({ label, data, ...other }) {
        const [editMode, setEditMode] = React.useState(false)
        return (
            <div className={s.container}>
                <div className={s.header}>
                    {label}
                    <button className={s.button} onClick={() => setEditMode(v => !v)}>
                        {editMode
                            ? 'отменить'
                            : data.executor
                                ? 'сменить'
                                : 'назначить'
                        }
                    </button>
                </div>
                <Component {...other} data={data} editMode={editMode} />
            </div>
        )
    }
    Overlay.displayName = displayName
    return Overlay
}