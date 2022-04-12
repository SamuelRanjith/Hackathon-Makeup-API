  // API Fetching
  async function Hello() {
    return fetch("http://makeup-api.herokuapp.com/api/v1/products.json", {
      method: "GET",
    });
  }

// async/await and try catch
async function MakeupAPI() {
  try {
    var data = await Hello();
    var res = await data.json();
    console.log(res);
  } catch (error) {
    alert("Welcome to Makeup!!!  Reload it..☺");
    console.log(error);   
  }
  return res;
}
  
//initiate Elements
  
  var tbody = document.getElementById("tbody");
  var tr = () => document.createElement("tr");
  var btn = () => document.createElement("button");
  var td = () => document.createElement("td");
  var nextBtn = document.getElementById("next");
  var prevBtn = document.getElementById("prev");
  var firstBtn = document.getElementById("first");
  var lastBtn = document.getElementById("last");
  var currentPage = document.getElementById("currentPage");
  var totalPage = document.getElementById("totalPages");
  var pageCon = document.getElementById("pageBtns");
  
  // class for Pagination
  class Pagination {
    constructor() {
      this.firstIndex = 0;
      var data = MakeupAPI();
  
      // Button creation
      data
        .then((data) => {
          var numOfBtn = data.length / 5;
          for (let i = 0; i < numOfBtn; i++) {
            var pageBtn = btn();
            pageBtn.setAttribute("onclick", `page.setPage(${i})`);
            pageBtn.setAttribute("class", "btn btn-dark");
            pageBtn.innerHTML = i + 1;
  
            pageCon.append(pageBtn);
          }
        })
        .catch((err) => console.log(err));
    }
  
    // logic for pagination buttons
    buttons() {
      var data = MakeupAPI();
      data
        .then((data) => {
          // condition logic for next button
          if (this.firstIndex < data.length - 6 && this.firstIndex >= 0) {
            nextBtn.style.display = "block";
          } else {
            nextBtn.style.display = "none";
          }

          // condition logic for prev button
          if (this.firstIndex > 0 && this.firstIndex < data.length) {
            prevBtn.style.display = "block";
          } else {
            prevBtn.style.display = "none";
          }
        })
        .catch((err) => console.log(err));
    }
  
    // to display table contents
    display() {
      var data = MakeupAPI();
      data
        .then((data) => {
  
          // navigation i.e showing current and total page number
          totalPage.innerHTML = Math.ceil(data.length / 5);
          currentPage.innerHTML = this.firstIndex / 5 + 1;
  
          //display table
          tbody.innerHTML = "";
          for (let i = this.firstIndex; i < this.firstIndex +7; i++) {
            var row = tr();
            var rowData = [td(), td(), td(), td(), td(), td()];
            rowData[0].innerHTML = data[i].brand;
            rowData[1].innerHTML = data[i].name;
            rowData[2].innerHTML = data[i].price;
            rowData[3].innerHTML="<img src="+data[i].image_link+">";
            rowData[4].innerHTML = "<a href="+data[i].product_link+"> <button>Click here to view Product</button></a>";
            rowData[5].innerHTML = data[i].description;
            row.append(...rowData);
            tbody.append(row);
          }
        })
        .catch((err) => console.log(err));
      this.buttons();
    }
  
    // to change next page
    next() {
      this.firstIndex = this.firstIndex + 5;
      this.display();
    }
  
    // to change previous page
    prev() {
      this.firstIndex = this.firstIndex - 5;
      this.display();
    }
  
    // setting page numbers
    setPage(num) {
      this.firstIndex = num * 5;
      this.display();
    }
    lastPage() {
      var data = MakeupAPI();
      console.log(data.length);
      data
        .then((data) => {
          this.setPage(data.length / 5 - 1);
        })
        .catch((err) => console.log(err));
    }
  }
  
  var page = new Pagination();
  page.display();
  firstBtn.addEventListener("click", () => page.setPage(0));
  lastBtn.addEventListener("click", () => page.lastPage());
  nextBtn.addEventListener("click", () => page.next());
  prevBtn.addEventListener("click", () => page.prev());

