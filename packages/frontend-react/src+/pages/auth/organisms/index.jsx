import s from './styles.module.scss'
import React from 'react'
import { AuthContainer } from '@src/widgets/auth/ui/index'

export function AuthPage() {
  return (
    <>
      <div className={s.container}>
        <AuthContainer />
      </div>
    </>
  )
}
