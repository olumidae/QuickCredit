const clientTable =()=> {
    document.getElementById("clients").style.display = "block";
    document.getElementById("allLoans").style.display = "none";
}

const verifyClient =()=> {
    alert("Client Verified"); 
}

// View All Loans Table
const viewAllLoans =()=> {
    document.getElementById("allLoans").style.display = "block";
    document.getElementById("clients").style.display = "none";
}