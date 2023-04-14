const HOST = location.href.replace(/^http/, "ws"); //'ws://localhost:8080/diff'
const ws = new WebSocket(HOST);

ws.onopen = function () {
  setTiltle("connected");
};

ws.onmessage = function ({ data }) {
  const rowsInfo = JSON.parse(data);
  if (rowsInfo.status == "maxDiff") {
    console.log(rowsInfo);
    printMaxDiff(rowsInfo.maxDiff)
  }else if (rowsInfo.size) {
    printClientSize(rowsInfo.size);
  }else{
    printData(rowsInfo);
  }
};

ws.onclose = function () {
  setTiltle("disconnected");
};

function setTiltle(title) {
  document.querySelector("h4").innerHTML = title;
}

function printMaxDiff(maxDiff) {
  let text = ""
   text = maxDiff[0].symbol +":=> "+ maxDiff[0].percent+" :"+ " بهترین درصد  "

  let diffMax = document.querySelector("h3")
  diffMax.innerText = text
  console.log("maxdiff;",maxDiff);
}

function printClientSize(size) {
  document.querySelector("h5").innerHTML = "تعداد افراد آنلاین : " + size;
}

function printData(rowsInfo) {
  clearTable();
  rowsInfo.forEach(function (rowInfo) {
    const statusbuy = rowInfo.statusbuy;
    const rowData = rowInfo.rowData;
    const tBody = document.querySelector("tbody");
    const tRow = document.createElement("tr");
    tRow.setAttribute("class", "row");
    tBody.appendChild(tRow);

    Object.keys(rowData).forEach(function (key) {
      const tCell = document.createElement("td");
      tRow.appendChild(tCell);

      tCell.innerText = rowData[key];
      if (statusbuy == key) {
        tCell.style.backgroundColor = "#8fff4e"
      }
    });
    // console.log(tBody.rows[1].getElementsByTagName("td")[4].innerHTML);
  });
  sortTable();
}

function clearTable() {
  const trows = document.querySelectorAll(".row");
  trows.forEach(function (tRow) {
    tRow.remove();
  });
}

function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("exchange");
  switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < rows.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("td")[1];
      y = rows[i + 1].getElementsByTagName("td")[1];
      // Check if the two rows should switch place:
      if (+x.innerHTML < +y.innerHTML) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
