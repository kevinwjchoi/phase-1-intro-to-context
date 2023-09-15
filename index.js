function createEmployeeRecord(array){
    const employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []

    }
    return employeeRecord;
};

function createEmployeeRecords(array){
    const twoRows = array.map(createEmployeeRecord);
    return twoRows;
}

function createTimeInEvent(employeeRecord, dateTimeString){
    const timeInEvent = {
        type: "TimeIn",
        date: dateTimeString.split(" ")[0],
        hour: parseInt(dateTimeString.split(" ")[1])
      };
      employeeRecord.timeInEvents.push(timeInEvent);
      return employeeRecord;
};

function createTimeOutEvent(employeeRecord, dateTimeString){
    const timeOutEvent = {
        type: "TimeOut",
        date: dateTimeString.split(" ")[0],
        hour: parseInt(dateTimeString.split(" ")[1])
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
};

function hoursWorkedOnDate(employeeRecord, dateTimeString){
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === dateTimeString);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === dateTimeString);
    
    const timeInHour = timeInEvent.hour;
    const timeOutHour = timeOutEvent.hour; 

    const hoursWorked = (timeOutHour - timeInHour) * .01;
    return hoursWorked;
};

function wagesEarnedOnDate(employeeRecord, dateTimeString){
    const hoursWorked = hoursWorkedOnDate(employeeRecord, dateTimeString);
    const payRate = employeeRecord.payPerHour;
    const wagesEarned = hoursWorked * payRate; 
    return wagesEarned; 
    
};

function allWagesFor(employeeRecord){
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => {
        const wagesEarned = wagesEarnedOnDate(employeeRecord, date);
        return total + wagesEarned;
    }, 0);
    return totalWages;
};
function calculatePayroll(employeeRecords){
    const totalPayroll = employeeRecords.reduce((total, record) => {
        const wagesEarned = allWagesFor(record);
        return total + wagesEarned;
    }, 0);
    return totalPayroll;
}