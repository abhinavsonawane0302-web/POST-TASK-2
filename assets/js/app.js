let cl = console.log

const form =document.getElementById("form")
const postId =document.getElementById("postId")
const name =document.getElementById("name")
const email =document.getElementById("email")
const body =document.getElementById("body")
const addbtn =document.getElementById("addbtn")
const updatebtn =document.getElementById("updatebtn")
const commentContainer =document.getElementById("commentContainer")
const table =document.getElementById("table")
 

const BASE_URL  ="https://jsonplaceholder.typicode.com/"

const COMMENTS_URL = `${BASE_URL}/Comments`


const xhr = new XMLHttpRequest()

xhr.open("GET",COMMENTS_URL)

xhr.send(null)

xhr.onload  = function() {
    if (xhr.status === 200) {
        let res =JSON.parse(xhr.response)
        let result =``;
        res.forEach(Comment => {

            result +=  `  <div class="col-4 mt-4" id="${Comment.id}">
                <div class="card h-100">
                    <div class="card-header">
                         <h3>UserId:- ${Comment.postId}</h3>
                        <h3>${Comment.name}</h3>
                    </div>
                    <div class="card-body">
                        <p>${Comment.body}</p>

                        <h6>${Comment.email}</h6>
                    </div>
                    <div class="card-footer d-flex justify-content-between">

                        <button onclick = "onEdit(this)" class="btn btn-sm btn-outline-primary">EDIT</button>
                        <button onclick = "ondelete(this)" class="btn btn-sm btn-outline-danger">DELETE</button>
                    </div>
                </div>
            </div>
            `

    commentContainer.innerHTML= result;

        });
    } else {
        cl("error")
    }
} 



function oncreate(ele) {
    ele.preventDefault()

    let commentobj ={
        postId:postId.value,
        name:name.value,
        email:email.value,
        body:body.value
    }
    
    let xhr = new XMLHttpRequest()

    xhr.open("POST",COMMENTS_URL)

    xhr.send(JSON.stringify(commentobj))

    xhr.onload = function () {

        let response = JSON.parse(xhr.response)

        if (xhr.status >= 200 && xhr.status <=299) {

            let newComment =document.createElement("div")

            newComment.className = `col-4 mt-4`
            newComment.id = response.id
            newComment.innerHTML = ` <div class="card h-100">
                    <div class="card-header">
                         <h3>UserId:- ${commentobj.postId}</h3>
                        <h3>${commentobj.name}</h3>
                    </div>
                    <div class="card-body">
                        <p>${commentobj.body}</p>

                        <h6>${commentobj.email}</h6>
                    </div>
                    <div class="card-footer d-flex justify-content-between">

                        <button onclick = "onEdit(this)" class="btn btn-sm btn-outline-primary">EDIT</button>
                        <button onclick = "ondelete(this)" class="btn btn-sm btn-outline-danger">DELETE</button>
                    </div>
                </div>`

            commentContainer.prepend(newComment)
            form.reset()

        }else{
            cl(`something went wrong while get data!!!`)
        }
        
        
    }

}

function onEdit(ele) {

    let editId = ele.closest(".col-4").id

    localStorage.setItem("updateId", editId)

    let editurl = `${BASE_URL}/comments/${editId}`

    let xhr = new XMLHttpRequest()

    xhr.open("GET", editurl)

    xhr.send(null)

    xhr.onload =function () {
        
        if (xhr.status >= 200 && xhr.status <= 299) {
            
            let response = JSON.parse(xhr.response)

            postId.value = response.postId,
            name.value = response.name,
            email.value = response.email,
            body.value = response.body


            addbtn.classList.add("d-none")
            updatebtn.classList.remove("d-none")

        }
    }

    
}


function onupdate() {
    let updateId = localStorage.getItem("updateId")

    let updateobj = {
        postId:postId.value,
        name:name.value,
        email:email.value,
        body:body.value
    }

    let xhr = new XMLHttpRequest()

    xhr.open("PATCH",`${COMMENTS_URL}/${updateId}`)

    xhr.send(JSON.stringify(updateobj))

    
    xhr.onload =  function() {
        
        if (xhr.status >= 200 && xhr.status <= 299) {
            
            let response = JSON.parse(xhr.response)

            let upadateComments = document.getElementById(updateId)
            
            upadateComments.querySelector("h3").innerHTML = updateobj.postId
            upadateComments.querySelector("h3").innerHTML = updateobj.name
            upadateComments.querySelector(".card-body").innerHTML = updateobj.email
            upadateComments.querySelector(".card-body").innerHTML = updateobj.body

            updatebtn.classList.add("d-none")
            addbtn.classList.remove("d-none")

            form.reset()
        }
    }

    localStorage.removeItem("updateId")
}


function ondelete(ele) {

        let deleteId = ele.closest(".col-4").id
        
        let xhr = new XMLHttpRequest()
        let deleteurl = `${BASE_URL}/Comments/${deleteId}`

        xhr.open("DELETE", deleteurl)
        xhr.send(null)
        xhr.onload = function () {
            if (xhr.status === 200) {
                
                ele.closest(".col-4").remove()

            }
        }
}



form.addEventListener("submit", oncreate)
updatebtn.addEventListener("click", onupdate)
 