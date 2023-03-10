let myLeads = []
let inputEl = document.getElementById("input-el")
let inputBtn = document.getElementById("input-btn");
let ulEl = document.getElementById("ul-el");
let deleteBtn = document.getElementById("delete-btn");
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
let tabBtn = document.getElementById("tab-btn");

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads);
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({
        active: true,
        currentWindow: true
        }, function(tabs) {
            myLeads.push(tabs[0].url);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            render(myLeads);
         });
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads);
})


function render(leads) {
    let listIteams = "";
    for (let i = 0; i < leads.length; i++) {
        // listIteams += "<li> <a target='_blank' href='" + myLeads[i] + "' >" + myLeads[i] + "</a></li>";
        listIteams += `
        <li> 
            <a target='_blank' href='${leads[i]}' >
                ${leads[i]}
            </a>
        </li>
        `;
    }
    ulEl.innerHTML = listIteams;
}
