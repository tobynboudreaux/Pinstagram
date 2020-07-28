const postURL = "http://localhost:3000/posts"
const likeURL = "http://localhost:3000/likes"
const commentURL = "http://localhost3000/comments"

document.addEventListener('DOMContentLoaded', () => {
    getData();

})

function getData() {
    fetch(postURL)
    .then(res => res.json())
    .then(json => json.data.forEach(data => {
        createPostCard(data.attributes)
    }))
}


function createPostCard(post, data) {
    const postCont = document.getElementById('post') 
    const newDiv =  document.createElement('div')    
    newDiv.setAttribute('id', 'post-card')    
    postCont.append(newDiv)    
    newDiv.innerHTML += `        
        <h1>${post.title}</h1>       
        <img src="${post.image_url}">        
        <h3>${post.content}</h3>        
        <p id='like'>Likes: ${post.likes.length}</p>        
        <button id="likebtn-${post.id}">Like</button>    
        <div>
        <h3>Comments</h3>
        <div id="button-form-${post.id}">
        <button id="commentBtn-${post.id}">Comment</button>
        </div>
        <ul id='comment-list-${post.id}'>
        </ul>
        </div>
    `    
    ul = document.getElementById(`comment-list-${post.id}`)
    post.comments.forEach(comment => {
        ul.innerHTML += `
                <li>${comment.content}</li>
        <br><br>
        `
    })
    newDiv.appendChild(ul)
    let likeBtn = document.getElementById(`likebtn-${post.id}`)   
    likeBtn.addEventListener('click', (e) => {
        e.preventDefault()
        postLikes(post);
    })
    let btnFrm = document.getElementById(`button-form-${post.id}`)
    let commentBtn = document.getElementById(`commentBtn-${post.id}`)
    commentBtn.addEventListener('click', (e) => {
        e.preventDefault()
        commentBtn.classList.add('hidden')
        let form = document.createElement('form')
        form.id = `commentForm-${post.id}`
        form.innerHTML = `
            <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
            <input type="submit" value="Submit"/>
        `
        btnFrm.appendChild(form)
        form = document.getElementById(`commentForm-${post.id}`)
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            btnFrm.removeChild(form)
            commentBtn.classList.remove('hidden')
            const comment = {
                "content": e.target.comment_input.value
            }
            let ul = document.getElementById(`comment-list-${post.id}`)
            ul.innerHTML += `
                <li>${comment.content}</li>
            <br><br>
            `
            postComment(comment, post)
        })
    })
  
}

function postLikes(post) {
    fetch(likeURL, {
        method:"POST",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            post_id: post.id
        })
    })
}

function postComment(comment, post) {
    fetch(commentURL, {
        method:"POST",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "post_id": post.id,
            "comments": comment
        })
    })
}

