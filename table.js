function addRow(tableID) {
 
            var table = document.getElementById("table1");
 
            var rowCount = table.rows.length;
            var row = table.insertRow(1);
 
            var cell1 = row.insertCell(0);
            var element1 = document.createElement("input");
            element1.type = "text";
            element1.name="txtbox1";
            element1.placeholder = "Kushal"
            cell1.appendChild(element1);
 
            var cell2 = row.insertCell(1);
            var element2 = document.createElement("input");
            element2.type = "text";
            element2.name = "txtbox2";
            element2.placeholder = "Kushal"
            cell2.appendChild(element2);
 
            var cell3 = row.insertCell(2);
            var element3 = document.createElement("input");
            element3.type = "text";
            element3.id = "description";
            cell3.appendChild(element3);

            var cell4 = row.insertCell(3);
            var element4 = document.createElement("input");
            element4.type = "text";
            element4.id = "amount";
            cell4.appendChild(element4);

            var myButtons = document.getElementById("myButtons");
            var newButton = document.createElement("input");
            newButton.type = "submit";
            newButton.value = "Send Request";
            newButton.className = "btn btn-primary";
            newButton.id = "newButton";
            newButton.onclick = new Function("document.getElementById('table1').deleteRow(1); document.getElementById('newButton').remove();");
            myButtons.appendChild(newButton);
}

function show(){
      alert(document.getElementById("description").value);
      var description = document.getElementById("description");
      var amount = document.getElementById("amount");
      if (description.value == "" || amount.value == "")
            alert("invalid input");
      document.getElementById('abc').style.display = "block";
}
 