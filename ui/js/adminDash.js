const clientTable =()=> {
    document.getElementById("clients").style.display = "block";
    document.getElementById("allLoans").style.display = "none";
    document.getElementById("unpaidLoans").style.display = "none";
    document.getElementById("repaidLoans").style.display = "none";
    document.getElementById("specificLoan").style.display = "none";
}

const verifyClient =()=> {
    alert("Client Verified"); 
}

const viewAllLoans =()=> {
    document.getElementById("allLoans").style.display = "block";
    document.getElementById("clients").style.display = "none";
    document.getElementById("unpaidLoans").style.display = "none";
    document.getElementById("repaidLoans").style.display = "none";
    document.getElementById("specificLoan").style.display = "none";
}

const viewUnpaidLoans =()=> {
    document.getElementById("unpaidLoans").style.display = "block";
    document.getElementById("clients").style.display = "none";
    document.getElementById("allLoans").style.display = "none";
    document.getElementById("repaidLoans").style.display = "none";
    document.getElementById("specificLoan").style.display = "none";
}

const viewRepaidLoans =()=> {
    document.getElementById("repaidLoans").style.display = "block";
    document.getElementById("clients").style.display = "none";
    document.getElementById("allLoans").style.display = "none";
    document.getElementById("unpaidLoans").style.display = "none";
    document.getElementById("specificLoan").style.display = "none";
}

const viewSpecificLoan =()=> {
    document.getElementById("specificLoan").style.display = "block";
    document.getElementById("clients").style.display = "none";
    document.getElementById("repaidLoans").style.display = "none";
    document.getElementById("allLoans").style.display = "none";
    document.getElementById("unpaidLoans").style.display = "none";
}

const getSpecificLoan =()=> {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("filterTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
}