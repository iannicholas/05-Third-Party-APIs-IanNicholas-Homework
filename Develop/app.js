// array
var myDay = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "01",
        time: "13",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "02",
        time: "14",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "03",
        time: "15",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "04",
        time: "16",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "05",
        time: "17",
        meridiem: "pm",
        reminder: ""
    },
    
]

// gets data for the header date
var currentHeaderDate = moment().format('dddd, MMMM Do');
$("#currentDay").text(currentHeaderDate);


// saves data to localStorage
function saveReminders() {
    localStorage.setItem("myDay", JSON.stringify(myDay));
}

// sets any data in localStorage to the view
function displayReminders() {
    myDay.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

// sets any existing localStorage data to the view if it exists
function init() {
    var storedDay = JSON.parse(localStorage.getItem("myDay"));

    if (storedDay) {
        myDay = storedDay;
    }

    saveReminders();
    displayReminders();
}



// creates background colors
myDay.forEach(function(thisHour) {
    // creates row
    var hourRow = $("<form>").attr({
        "class": "row from-control"
    });
    $(".container").append(hourRow);

    // creates time 
    var hourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-1 hour"
    });

    // creates data
    var hourPlan = $("<div>")
        .attr({
            "class": "col-10 description "
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "form-control past col-12", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "form-control present col-12"
        })
    } else {
        planData.attr({
            "class": "form-control future col-12"
        })
    }

    // save button
    var saveButton = $("<i class='fas fa-calendar-plus'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);
})

// loads localstorage 
init();


// saves data for localStorage
$(".saveBtn").on("click", function(event, myDay) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".row").children(".past").attr("id");
    console.log(saveIndex);
    myDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    // var textData = myDay[saveData].reminder;
    textData = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveReminders();
    displayReminders();
})