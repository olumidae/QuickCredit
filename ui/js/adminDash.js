const clientTable =()=> {
    document.getElementById("clients").style.display = "block";
    document.getElementById("allLoans").style.display = "none";
    document.getElementById("unpaidLoans").style.display = "none";
    document.getElementById("repaidLoans").style.display = "none";
}

const verifyClient =()=> {
    alert("Client Verified"); 
}

const viewAllLoans =()=> {
    document.getElementById("allLoans").style.display = "block";
    document.getElementById("clients").style.display = "none";
    document.getElementById("unpaidLoans").style.display = "none";
    document.getElementById("repaidLoans").style.display = "none";
}

const viewUnpaidLoans =()=> {
    document.getElementById("unpaidLoans").style.display = "block";
    document.getElementById("clients").style.display = "none";
    document.getElementById("allLoans").style.display = "none";
    document.getElementById("repaidLoans").style.display = "none";
}

const viewRepaidLoans =()=> {
    document.getElementById("repaidLoans").style.display = "block";
    document.getElementById("clients").style.display = "none";
    document.getElementById("allLoans").style.display = "none";
    document.getElementById("unpaidLoans").style.display = "none";
}