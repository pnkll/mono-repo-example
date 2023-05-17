import { createEvent, createStore, sample, forward, createEffect } from 'effector'
import { createGate } from 'effector-react'
import { not } from 'patronum'

import { myCcAgentStatusQuery } from 'shared/api'

import { sipAgentStatus } from 'shared/entities/sip-agent'

import { t } from 'shared/locales'

import { StatusOption } from '../mollecules/status-option'

export const widgetGate = createGate()

export const options = Object.values(sipAgentStatus)
  .filter((status) => status !== sipAgentStatus.BREAK && status !== sipAgentStatus.AVAILABLE_ON_DEMAND)
  .map((status) => ({
    value: status,
    label: <StatusOption status={status} />,
  }))

sample({
  clock: widgetGate.open,
  source: not(myCcAgentStatusQuery.$data),
  filter: Boolean,
  target: myCcAgentStatusQuery.start,
})
