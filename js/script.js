$(document).ready(function () {
  let expensesArray = []
  let filteredArray = []


  let obj = {}
  let budget
  // createTable()
  createTable($("#Filter").val());


  $("#Expensessubmit").on("click", function () {

    let isValid1 = true, isValid2 = true, isValid3 = true

    let expName = $("#expName").val()
    if (expName == "") {
      $("#expName").css({
        "border": "1px solid red"
      })
      $(".nameError").text("Enter the name")
      isValid1 = false
    }
    else {
      $("#expName").css({
        "border": "1px solid black"
      })
      $(".nameError").text("")
      isValid1 = true
    }

    let type = $("#type").val()
    if (type == "") {
      $("#type").css({
        "border": "1px solid red"
      })
      $(".categoryError").text("Select a category")
      isValid2 = false
    }
    else {
      $("#type").css({
        "border": "1px solid black"
      })
      $(".categoryError").text("")
      isValid2 = true
    }


    let expAmount = $("#expAmount").val()
    if (expAmount == "") {
      $("#expAmount").css({
        "border": "1px solid red"
      })
      $(".amountError").text("Enter the amount")
      isValid3 = false
    }
    else if (expAmount < 0) {
      $("#expAmount").css({
        "border": "1px solid red"
      })
      $(".amountError").text("The amount should be negative")
      isValid3 = false
    }
    else {
      $("#expAmount").css({
        "border": "1px solid black"
      })
      $(".amountError").text("")
      isValid3 = true
    }

    if (isValid1 && isValid2 && isValid3) {

      let obj = {
        name: expName,
        category: type,
        budAmt: (type == "Budget") ? Number(expAmount) : "",
        amt: (type == "Expenses") ? Number(expAmount) : "",
      }

      expensesArray.push(obj)

      $("#expName").val("")
      $("#type").val("")
      $("#expAmount").val("")
    }

    createTable($("#Filter").val());

  })


  let Filter = $("#Filter")
  Filter.on("change", function () {
    let val = Filter.val()
    createTable(val)
  })








  function createTable(val) {
    let bbuuddeeggtt = 0
    let ex = 0
    let sum = 0
    let rowFormat = ""
    let displayArray = []
    if (!val || val === "") {
      displayArray = expensesArray;
    } else {
      displayArray = expensesArray.filter(e => e.category === val);
    }

    if (displayArray.length > 0) {

      displayArray.forEach((e, index) => {


        rowFormat += `
          <tr class="${e.category}">
          <td>${index + 1}</td>
          <td>${e.category}</td>
          <td>${e.name}</td>
          <td class="bbdd">${e.budAmt}</td>
          <td class="eexx">${e.amt}</td>
          </tr>
        `

        bbuuddeeggtt += Number(e.budAmt)
        ex += Number(e.amt)

      })




      rowFormat += `
               <tr class="ttoott">
                  <td colspan="3">Total</td>
                  <td class="bbdd">${bbuuddeeggtt}</td>
                  <td class="eexx">${ex}</td>
               </tr>
  
              
  
              <tr class="rreemm">
                <td colspan="3">Remaining</td>
                <td colspan="2">${bbuuddeeggtt - ex}</td>
              </tr>
  
               `


    }

    else {
      rowFormat += `
                <tr>
                    <td colspan="5">No Records Found</td>
                </tr>
      `

    }

    $("#tableBody").html(rowFormat)

    if (val == "Expenses") {
      $(".bbdd").addClass("hide")
      $(".eexx").removeClass("hide")
      $(".rreemm").addClass("hide")
    }
    else if (val == "Budget") {
      $(".bbdd").removeClass("hide")
      $(".eexx").addClass("hide")
      $(".rreemm").addClass("hide")
    }
    else {

      $(".rreemm").removeClass("hide")
      $(".bbdd").removeClass("hide")
      $(".eexx").removeClass("hide")
    }

    $(".Budget").addClass("budback")
    $(".Expenses").addClass("exback")

    if ((bbuuddeeggtt - ex) > 0) {
      $(".rreemm").addClass("remainingPos")
    }

    else {
      $(".rreemm").addClass("remainingNeg")

    }

    if (expensesArray.length > 0) {
      $("#print").removeClass("hide")
    }
    else {
      $("#print").addClass("hide")
    }

  }




  $("#print").on("click", () => {
    window.print()
  })

})