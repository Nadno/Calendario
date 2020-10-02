"use strict";

import calendarGenerator from "./Calendar/index";
import calendar from "./utils/date";
import "./Calendar/actions";
import "./Menu/inputs";

import "../public/styles/style.scss";


const initialDate = true;
calendarGenerator(calendar(initialDate));
