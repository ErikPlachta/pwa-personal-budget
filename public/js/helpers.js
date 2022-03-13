export const formatUppercase = word => {
    return word[0].toUpperCase() + word.slice(1);
}

//-- Formatting Date
export const get_DateMonthDayYear = date => {
    return `${
      new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
      date
    ).getFullYear()}`;
  };

export const get_DateTimeFormatted = date => {

    
    //-- converts incoming date to string
    let dateStr = date.toString();
  
    //-- convert to date value
    return moment(dateStr).format('MM/DD/YYYY - HH:MM:SS');

    // get the character before the last from date which will be day. U
    // const lastChar = dateStr.charAt(dateStr.length - 1);
  
    // //-- If-> return statements to determine how to format date suffix based on values
    // if (lastChar === '1' && dateStr !== '11') { return `${dateStr}st`;} 
    // if (lastChar === '2' && dateStr !== '12') { return `${dateStr}nd`;}  
    // if (lastChar === '3' && dateStr !== '13') { return `${dateStr}rd`;}
    // return `${dateStr}th`;
};


export const get_TimePassed = ( date ) => {
  //-- Provide a date/time and get duration since that date-time as a result in formatted str.

  
  
  //-- Get curent time
  var now = moment(new Date()); 
  //-- Get the diff between now and created date
  var duration = moment.duration(now.diff(date));
  //-- Return value in hours
  var results = duration.asHours();

  if(results < 0.01){ let seconds = ((duration._data.seconds)) + " s"; return seconds; }
  if(results < 1){ let minutes = ((duration._data.minutes)) + " m"; return minutes; }
  if(results < 24){ let hours = (Math.trunc(results)) + " h"; return hours; }
  if(results >= 24){ let days = Math.trunc(results / 24) + " d"; return days; }
  
  //-- If for some reason gets to this point, return nothing. ( shouldn't happen but being safe )
  return null;
};