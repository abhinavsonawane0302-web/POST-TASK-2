let cl = console.log

const BASE_URL  ="https://jsonplaceholder.typicode.com/"

const COMMENTS_URL = `${BASE_URL}/Comments`


const XHR = new XMLHttpRequest()

XHR.open("GET",COMMENTS_URL)


XHR.onload  = function() {
    if (XHR.status === 200) {
        let res =JSON.parse(XHR.response)
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

                        <button class="btn btn-sm btn-outline-primary">EDIT</button>
                        <button class="btn btn-sm btn-outline-danger">DELETE</button>
                    </div>
                </div>
            </div>
            `
            
    const  commentContainer = document.getElementById("commentContainer")

    commentContainer.innerHTML= result;

        });
    } else {
        cl("error")
    }
} 


XHR.send()















