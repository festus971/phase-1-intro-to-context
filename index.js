// Your code here
let createEmployeeRecord=
function createEmployeeRecord(row){
return{
firstName:row[0],
familyName:row[1],
title:row[2],
payPerHour:row[3],
timeInEvents:[],
timeOutEvents:[]
}
}

let createEmployeeRecords =
 function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}
let createTimeInEvent=
function(employee,Object){
    let [date, hour] = Object.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}
let createTimeOutEvent = 
function(employee, Object){
    let [date, hour] = Object.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}
let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, date){
    let rawWage = hoursWorkedOnDate(employee, date)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(day, d){
        return day + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}
let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(day, rec){
        return day + allWagesFor(rec)
    }, 0)
}