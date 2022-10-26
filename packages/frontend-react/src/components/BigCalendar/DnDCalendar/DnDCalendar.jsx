import React from 'react';
import { Calendar } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

export const DnDCalendar = withDragAndDrop(Calendar)