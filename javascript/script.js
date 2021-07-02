// getting the values using ajax from file
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);
    console.log(data.buttons);
    console.log(data.bars);
    //dynamic buttons
    for (let i = 0; i < data.buttons.length; i++) {
      let btnNumber = "btn" + i;
      let btnValue = data.buttons[i];

      let dynBtn = document.createElement("button");
      let dynDivAddBtn = document.getElementById("divButtonslst");
      dynDivAddBtn.appendChild(dynBtn);
      dynBtn.setAttribute("class", "btnStyle");
      dynBtn.setAttribute("id", btnNumber);
      dynBtn.setAttribute("value", btnValue);
      console.log(Math.sign(btnValue));
      if (Math.sign(btnValue) == "1") {
        dynBtn.innerHTML = "Add " + btnValue;
      } else if (Math.sign(btnValue) == "-1") {
        dynBtn.innerHTML = "Substract " + btnValue;
      } else if (Math.sign(btnValue) == "0") {
        dynBtn.innerHTML = btnValue;
      }
      dynBtn.addEventListener("click", () => {
        addwidth(btnValue);
      });
    }

    // genrate dynamic bars using for loop
    for (var i = 0; i < data.bars.length; i++) {
      let progress = document.createElement("div");
      let cont = document.getElementById("divPopulater");
      cont.appendChild(progress);
      progress.setAttribute("class", "clsStyleProgress");
      progress.setAttribute("id", "progress" + i);

      let bar = document.createElement("div");
      progress.appendChild(bar);
      bar.setAttribute("class", "styleBar");
      bar.setAttribute("id", "idBar" + i);
      bar.style.width = data.bars[i] + "%";

      let lb = document.createElement("label");
      bar.appendChild(lb);
      lb.setAttribute("class", "styleLabel");
      lb.setAttribute("id", "label" + i);
      lb.innerHTML = data.bars[i] + "%";
    }
    // populating dropdown based on bars length
    for (let i = 0; i < data.bars.length; i++) {
      let ddlSelectBar = document.getElementById("ddlSelectBar");
      let opt = document.createElement("option");
      ddlSelectBar.appendChild(opt);
      opt.setAttribute("id", "ddl" + i);
      opt.setAttribute("value", i);
      opt.innerHTML = "SelectBar " + (1 + i);
    }
  }
};

// function for filling bar by passing value
function addwidth(value) {
  // if dropdown select value is 0,1,2,3 based on that change the bar value
  let v = parseInt(document.getElementById("ddlSelectBar").value);
  let a = document.getElementById("label" + v).innerHTML;

  // add current value of bar + button current value of selected bar
  value = parseInt(value) + parseInt(a);

  // if value is greater than 100 & above change the color red
  if (value >= 100) {
    document.getElementById("idBar" + v).style.backgroundColor = "red";
    document.getElementById("idBar" + v).style.width = "100%";
    document.getElementById("label" + v).innerHTML = value + "%";
  }
  //if value is less than 100 and greater than 0 than select same green color;
  else if (value <= 100 && value > 0) {
    document.getElementById("idBar" + v).style.backgroundColor =
      "rgb(151, 238, 173)";
    document.getElementById("idBar" + v).style.width = value + "%";
    document.getElementById("label" + v).innerHTML = value + "%";
  }
  // if value is less than or equal to 0 than set value and with of bar equal to 0
  else if (value <= 0) {
    document.getElementById("idBar" + v).style.width = "0%";
    document.getElementById("label" + v).innerHTML = "0%";
  }
}

// ajax method for get file from sever
xhttp.open("GET", "http://pb-api.herokuapp.com/bars");
xhttp.send();
