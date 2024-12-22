import React from 'react';
 import SingleBlackBoard from './calendarModal/SingleBlackBoard';
 import CalendarMultiDatePicker from './CalendarMultiDatePicker';
import ComponentCard from '../../components/ComponentCard';


const BlackBoard = () => {


  return (<ComponentCard CardBodyClass="rounded-2">
    <SingleBlackBoard />
     <CalendarMultiDatePicker />
  </ComponentCard>);
};

export default BlackBoard;
