let visitorArray = [];

function createVisit() {
    let visitor_FName = document.getElementById("visitorFName").value;
    let visitor_LName = document.getElementById("visitorLName").value;
    let visit_Type = document.getElementById("visitType").value;
    let visit_Priority = document.getElementById("visitPriority").value;

    if (visitor_FName === "") {
        document.getElementById("alert_messageF").innerHTML =
            "This field cannot be blank.";
        document.getElementById("visitorFName").focus();
        return;
    } else {
        document.getElementById("alert_messageF").innerHTML = "";
    }

    if (visitor_LName === "") {
        document.getElementById("alert_messageL").innerHTML =
            "This field cannot be blank.";
        document.getElementById("visitorLName").focus();
        return;
    } else {
        document.getElementById("alert_messageL").innerHTML = "";
    }

    let visitorObject = {
        firstName: visitor_FName,
        lastName: visitor_LName,
        type: visit_Type,
        priority: visit_Priority,
    };

    visitorArray.push(visitorObject);

    $("#successMessage").text("Visitor added successfully!");

    setTimeout(function() {
        $("#successMessage").text("");
    }, 3000);

    //for clearing input fields fname and lname
    document.getElementById("visitorFName").value = "";
    document.getElementById("visitorLName").value = "";

    //create a unique id for each item in the array
    visitorArray.forEach(function(item, index) {
        item.id = Date.now() + index;
    });
}

document.getElementById("addVisitorBtn").addEventListener("click", createVisit);

function createList() {
    let arrayItems = "";
    for (let i = 0; i < visitorArray.length; i++) {
        let visitor = visitorArray[i];
        let arrayItem =
            "<li><a href='#DetailPage' onclick='showVisitorDetails(" + visitor.id + ")'>" + visitor.firstName + " " + visitor.lastName + "</a> </li>";
        arrayItems += arrayItem;
    }
    return arrayItems;
}

//display visitor list
function showVisitorList() {
    let visitorList = document.getElementById("visitorList");
    visitorList.innerHTML = createList();
    visitorList.style.display = "block";
}

function showVisitorDetails(visitorId) {
    //Finding the visitor object in the array based on visitorId, takes vis ID as argument
    let visitor = visitorArray.find(function(item) {
        return item.id === visitorId;
    });

    if (visitor) {
        $("#visitorFullName").text(visitor.firstName + " " + visitor.lastName);
        $("#visitorDetailsType").text(visitor.type);
        $("#visitorDetailsPriority").text(visitor.priority);
    }
}

$(document).on("pagebeforeshow", "#DisplayPage", function() {
    if (visitorArray.length > 0) {
        showVisitorList();
    }
});