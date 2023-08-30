// Your code here
let createEmployeeRecord = function(row){
     return {
        firstName:row[0],
        familyName:row[1],
        title:row[2],
        payPerHour:row[3],
        timeInEvents: [],
        timeOutEvents: [],
      }
     }

let createEmployeeRecords = function(employeeRowData){
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
    }    

let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date,
    })
    return employee
}

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date,
    })
    return employee
}
let hoursWorkedOnDate = function(employee, dateWorked){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === dateWorked
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === dateWorked
    })

    return (outEvent.hour - inEvent.hour) / 100
}
let wagesEarnedOnDate = function(employee, dateWorked){
    let rawWage = hoursWorkedOnDate(employee, dateWorked)
       *employee.payPerHour
    return parseFloat(rawWage.toString())   
}
let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })
    let payable = eligibleDates.reduce(function(memo, date) {
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)
    return payable
}
let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, record) {
        return memo + allWagesFor(record) 
    }, 0)
}
