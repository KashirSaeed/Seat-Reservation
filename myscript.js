
var reservedSeats = {
    record1: {
        seat: "B19",
        owner: {
            fname: "kashir",
            lname: "saeed"
        }
    },

    record2: {
        seat: "B20",
        owner: {
            fname: "kashir",
            lname: "saeed"
        }
    },

    record3: {
        seat: "B21",
        owner: {
            fname: "kashir",
            lname: "saeed"
        }
    },

    record4: {
        seat: "B22",
        owner: {
            fname: "kashir",
            lname: "saeed"
        }
    },
}



function addRows(sectionLength, rowLength, placement) {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"]
    var counter = 1
    var html = ""
    rows.forEach(function (row) {
        switch (placement) {
            case "left": { html += ` <div class="Label" > ${row}  </div> ` } break;
            case "right": { counter = counter + (rowLength - sectionLength) } break;
            default: { counter = counter + ((rowLength - sectionLength) / 2) } break;
        }
        for (let i = 0; i < sectionLength; i++) {
            html += ` <div class="a" id="${row + counter}" > ${counter}  </div> `
            counter++;
        }

        switch (placement) {
            case "left": { counter = counter + (rowLength - sectionLength) } break
            case "right": { html += ` <div class="Label" > ${row}  </div> ` } break
            default: { counter = counter + ((rowLength - sectionLength) / 2) } break
        }
    })
    document.getElementById(placement).innerHTML = html

}

addRows(3, 15, "left");
addRows(3, 15, "right");
addRows(9, 15, "middle");


(function () {
    "use strict";

    for (const key in reservedSeats) {

        if (reservedSeats.hasOwnProperty(key)) {
            const obj = reservedSeats[key]
            document.getElementById(obj.seat).className = "r";
            document.getElementById(obj.seat).innerHTML = "R";
        }
    }

    
}());


(function () {
    "use strict";

    var selectedSeats = []
    var seats = document.querySelectorAll(".a")
    seats.forEach(function (eachSeat) {
        eachSeat.addEventListener("click", function () {
            reservingSeats(eachSeat.id);
        })
    })


    function reservingSeats(seatId) {
        
        if(! (document.getElementById(seatId).classList.contains("r"))  ){
            var seatIdIdx = selectedSeats.indexOf(seatId)
            if (seatIdIdx > -1) {
                selectedSeats.splice(seatIdIdx, 1)
                document.getElementById(seatId).className = "a";
    
            }
            else {
                selectedSeats.push(seatId);
                document.getElementById(seatId).className = "s";
            }
            manageFormDisplay()
            console.log(selectedSeats)
        }
       
    }

    document.getElementById("reserve").addEventListener("click", function (event) {
        document.getElementById("resform").style.display = "block";
        event.preventDefault();
    })

    document.getElementById("cancel").addEventListener("click", function (event) {
        document.getElementById("resform").style.display = "none";
        event.preventDefault();

    })
    

    function manageFormDisplay() {
        if (selectedSeats.length > 0) {
            document.getElementById("confirmres").style.display = "block";
            var seatsContainer = selectedSeats.toString();

            if(selectedSeats.length === 1){
                document.getElementById("selectedseats").innerHTML = `You have selected some seat ${selectedSeats[0]}`
            }
            else{
                seatsContainer = seatsContainer.replace(/,/g, ", ")
                seatsContainer = seatsContainer.replace(/,(?=[^,]*$)/," and")
                document.getElementById("selectedseats").innerHTML = `You have selected some seats ${seatsContainer}`   
            }


        }
        else {
            document.getElementById("confirmres").style.display = "none";
            document.getElementById("selectedseats").innerHTML = `You need to select some seats to reserve. <br> <a href = "#" id="error"  >Close</a> this dialog box and pick atleast one seat...  `
            document.getElementById("error").addEventListener("click" , function(event){
                document.getElementById("resform").style.display = "none";
                event.preventDefault();
            })

        }
    }

    manageFormDisplay()


    document.getElementById("confirmres").addEventListener("submit"  ,function(event){
        processReservation()
        event.preventDefault();
    })

    function processReservation(){
        var hardCortedRecord =Object.keys(reservedSeats).length
        var counter = 1
        var newRecord = ""
        var firstName = document.getElementById("fname").value;
        var lastName = document.getAnimations("lname").value;
        
        selectedSeats.forEach(function(eachSeat){
            document.getElementById(eachSeat).className = "r";
            document.getElementById(eachSeat).innerHTML = "R";
            newRecord = `record${hardCortedRecord + counter}`
            reservedSeats[newRecord] = {
                seat: eachSeat,
                 owner: {
                     fname: firstName,
                     lname: lastName
                 }
            } 
            counter++;

        })

        document.getElementById("resform").style.display = "none";
        selectedSeats = []
        manageFormDisplay()



    }


}());


