'use strict'
import calendar from './calendar';
import { CalendarOnClick, CreateToDoOnClick } from './Menu/actions';

import '../public/styles/style.scss';

calendar();

CalendarOnClick();
CreateToDoOnClick();