const MINUTES_IN_HOUR = 60;

const convertTimeToMinutes = (time) =>
  parseInt(time.split(':')[0], 10) * MINUTES_IN_HOUR + parseInt(time.split(':')[1], 10);

const isMeetingInTime = (timeStartWorkingDay, timeEndWorkingDay, timeStartMeeting, durationMeeting) => {
  const timeStartWorkingDayInMinutes = convertTimeToMinutes(timeStartWorkingDay);
  const timeEndWorkingDayInMinutes = convertTimeToMinutes(timeEndWorkingDay);
  const timeStartMeetingInMinutes = convertTimeToMinutes(timeStartMeeting);

  return timeStartMeetingInMinutes >= timeStartWorkingDayInMinutes &&
    timeStartMeetingInMinutes + durationMeeting <= timeEndWorkingDayInMinutes;
};

isMeetingInTime('08:00', '17:30', '14:00', 90);  //true
isMeetingInTime('8:0', '10:0', '8:0', 120);      //true
isMeetingInTime('08:00', '14:30', '14:00', 90);  //false
isMeetingInTime('14:00', '17:30', '08:0', 90);   //false
isMeetingInTime('8:00', '17:30', '08:00', 900);  //false
