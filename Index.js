let myLeads = []
const save = document.querySelector("#input-btn")
const inputEl = document.querySelector("#input-el")
const ulEl = document.querySelector("#ul-el")
const deleteEl = document.querySelector("#delete-btn")
const tabBtn = document.querySelector("#saveTab-btn")
const localst = JSON.parse(localStorage.getItem("myLeads"))

let listItem = ""


if (localst) {
    myLeads = localst
    render(myLeads)
}

function render(leads) {
    listItem = ""
    for (let i = 0; i < leads.length; i++) {
        listItem += `
         <li>
            <a target='_blank' href='${leads[i]}'> 
            ${leads[i]}
            </a>
        </li>`
    }
    ulEl.innerHTML = listItem
}

save.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

deleteEl.addEventListener("dblclick", function () {
    myLeads = []
    localStorage.clear()
    render(myLeads)
})
tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})





