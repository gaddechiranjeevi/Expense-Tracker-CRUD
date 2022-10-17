function saveToLocalStorage(event){
    const expenseAmount=event.target.expenseAmount.value
    const description= event.target.description.value
    const choose= event.target.choose.value
    let obj={
        expenseAmount,description,choose
    } 
     //POST User data
    event.preventDefault() 
      axios.post('https://crudcrud.com/api/f14abd13f5654c82b3bec2bd6ff669d6/ExpenseTracker',obj)
         .then((response) => {
             showNewListOnScreen(response.data)
             console.log(response)
         })
         .catch((err) => {
             console.log(err)
         })

}
// Get CRUD CRUD data 

window.addEventListener("DOMContentLoaded", () => {
    axios.get('https://crudcrud.com/api/f14abd13f5654c82b3bec2bd6ff669d6/ExpenseTracker')
        .then((response)=>{
            for (var i = 0; i < response.data.length; i++) {
                showNewListOnScreen(response.data[i])
            }
        })
        .catch((err)=> {
            console.log(err)
        })
    
    
})

//Show list on screen

function showNewListOnScreen(list){
    event.preventDefault()
    const parentNode =  document.getElementById("listOfItems")
    const childHTML = `<li id=${list._id}>${list.expenseAmount}-${list.description}-${list.choose} 
        <button onclick=deleteList('${list._id}')>Delete</button>
        <button onclick=editListDetails('${list.expenseAmount}','${list.description}','${list.choose}','${list._id}')>Edit</button>
        </li>`
    parentNode.innerHTML= parentNode.innerHTML + childHTML
 }

//EDIT
 function editListDetails(choose,expenseAmount,description,listId){
    document.getElementById('choose').value =choose;
    document.getElementById('expenseAmount').value = expenseAmount;
    document.getElementById('description').value = description;
    deleteList(listId)
}

//DELETE
function deleteList(listId){
    axios.delete(`https://crudcrud.com/api/f14abd13f5654c82b3bec2bd6ff669d6/ExpenseTracker/${listId}`)
        .then((response)=>{
            removeListFromScreen(listId)
        })
        .catch((err)=>{
            console.log(err)
        })
}
function removeListFromScreen(listId){
    const parentNode=document.getElementById("listOfItems")
    const childNodeToBeDeleted=document.getElementById(listId)
    if(childNodeToBeDeleted){
    parentNode.removeChild(childNodeToBeDeleted);
    }
}