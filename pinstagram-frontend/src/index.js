const postURL = "http://localhost:3000/posts"
const likeURL = "http://localhost:3000/likes"
const commentURL = "http://localhost:3000/comments"

document.addEventListener('DOMContentLoaded', () => {
    getData();

})

function getData() {
    fetch(postURL)
    .then(res => res.json())
    .then(json => json.data.forEach(data => {
        createPostCard(data.attributes),
        renderLikes(data.attributes),
        renderComments(data.attributes)
    }))
}


function createPostCard(post) {
    const postCont = document.getElementById('post') 
    const newDiv =  document.createElement('div')    
    newDiv.setAttribute('id', `post-card-${post.id}`)    
    postCont.append(newDiv)    
    newDiv.innerHTML += `        
        <h1>${post.title}</h1>       
        <img src="${post.image_url}">        
        <h3>${post.content}</h3>         
        <ul id='comment-list-${post.id}'>
        </ul>
    `   
}

function renderLikes(post) {
    let card = document.getElementById(`post-card-${post.id}`)
    let div = document.createElement('div')
    card.appendChild(div)
    div.innerHTML += `
        <p id="like-${post.id}">Likes: <span id="span-${post.id}">${post.likes.length}</span></p>        
        <button id="likebtn-${post.id}">Like</button>   
    `
    likePost(post)
}

function likePost(post) {
    let likeBtn = document.getElementById(`likebtn-${post.id}`)   
    likeBtn.addEventListener('click', (e) => {
        e.preventDefault()
        likes = document.getElementById(`span-${post.id}`)
        likes.innerText++
        postLikes(post);
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

function renderComments(post) {
    let card = document.getElementById(`post-card-${post.id}`)
    let div = document.createElement('div')
    card.appendChild(div)
    div.innerHTML += `
        <h3>Comments</h3>
        <div id="button-form-${post.id}">
        <button id="commentBtn-${post.id}">Comment</button>
    `
    ul = document.getElementById(`comment-list-${post.id}`)
    post.comments.forEach(comment => {
        ul.innerHTML += `
                <li>${comment.content}</li>
        <br><br>
        `
    })
    card.appendChild(ul)
    newComment(post)
}

function newComment(post) {
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
        getForm(commentBtn, post)
    })
}

function getForm(btn, post) {
    let btnFrm = document.getElementById(`button-form-${post.id}`)
    form = document.getElementById(`commentForm-${post.id}`)
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        btnFrm.removeChild(form)
        btn.classList.remove('hidden')
        const comment = (e.target.comment_input.value)
        
        let ul = document.getElementById(`comment-list-${post.id}`)
        ul.innerHTML += `
            <li>${comment}</li>
        <br><br>
        `
        postComment(comment, post);
    })
}

function postComment(comment, post) {
    fetch(commentURL, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            content: comment,
            post_id: post.id
        })
    })
   
}

