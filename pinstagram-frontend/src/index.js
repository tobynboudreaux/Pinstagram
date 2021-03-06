const postURL = "http://localhost:3000/posts"
const likeURL = "http://localhost:3000/likes"
const commentURL = "http://localhost:3000/comments"

const loginDiv = document.getElementById('login-window')
const loginForm = document.getElementById('login-form')
const createForm = document.getElementById('new-user-form')
let loginBtn = document.createElement('button')
let createBtn = document.createElement('button')
let logoutBtn = document.createElement('button')
    logoutBtn.setAttribute('class', 'logout-btn')

createBtn.innerText = "Sign Up"
loginBtn.innerText = "Login"
logoutBtn.innerText = 'Logout'
let currentUser = {}


document.addEventListener('DOMContentLoaded', () => {
    loggedIn()
    loginForm.classList.add('hidden')
    createForm.classList.add('hidden')
    loginDiv.append(loginBtn, createBtn)
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginBtn.classList.add('hidden')
        createBtn.classList.add('hidden')
        loginForm.classList.remove('hidden')
        loginFormHandler(e)
    })
    createBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginBtn.classList.add('hidden')
        createBtn.classList.add('hidden')
        createForm.classList.remove('hidden')
        createFormHandler(e)
    })
  
})

function loginFormHandler(e) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const user = {
            "username": e.target.username_input.value,
            "email": e.target.email_input.value,
            "password": e.target.password_input.value
        }
        loginForm.classList.add('hidden')
        fetchLogin(user);
    })
}

function fetchLogin(user) {
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        // credentials: 'include',
        body: JSON.stringify(user)
    })
    .then(resp => resp.json())
    .then(json => {
        sessionStorage.setItem('username', json.username),
        sessionStorage.setItem('email', json.email)
        sessionStorage.setItem('id', json.id)
        location.reload()
        getData(), 
        createPost()
    })
    
}

function loggedIn() {
    if (sessionStorage.length != 0) {
        loginBtn.classList.add('hidden')
        createBtn.classList.add('hidden')
        loginDiv.appendChild(logoutBtn)
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault()
            sessionStorage.clear()
            location.reload()
        })
        getData(),
        createPost()

    }
}

function createFormHandler(e) {
    createForm.addEventListener('submit', (e) => {
        e.preventDefault()
        createForm.classList.add('hidden')
        fetchNewUser(e);
    })
}

function fetchNewUser(e) {
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        // credentials: 'include',
        body: JSON.stringify({
            user: {
                username: e.target.username_input.value,
                password: e.target.password_input.value,
                email: e.target.email_input.value
            }
        })
      })
        .then(r => r.json())
        .then(location.reload())
}

function getData() {
    fetch(postURL)
    .then(res => res.json())
    .then(json => json.data.forEach(data => {
        createPostCard(data.attributes),
        renderLikes(data.attributes),
        renderComments(data.attributes)
    }))
}

function createPost() {
    let top = document.getElementById('top')
    let button = document.createElement('button')
    top.appendChild(button)
    button.id = "create-post"
    button.innerText = "Create New Post"
    button.addEventListener('click', (e) => {
        e.preventDefault()
        button.classList.add('hidden')
        createPostForm();
    })

}

function createPostForm() {
    let top = document.getElementById('top')
    let form = document.createElement('form')
        form.setAttribute('class', 'new-post-form')
    let button = document.getElementById('create-post')
    top.appendChild(form)
    form.innerHTML = `
        <input class="new-post-input" id="title_input" type="text" name="title" placeholder="Add Title"/>
        <input class="new-post-input" id="image_input" type="text" name="imgae" placeholder="Add Image URL"/>
        <input class="new-post-input" id="content_input" type="text" name="content" placeholder="Add Description"/>
        <input type="submit" value="New Post" class="post-btn"/>
    `
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const post = {
            "title": e.target.title_input.value,
            "image_url": e.target.image_input.value,
            "content": e.target.content_input.value,
            "user_id": sessionStorage["id"]
        }
        console.log(post)
        button.classList.remove('hidden')
        top.removeChild(form)
        postNewPost(post)
    })
}

function postNewPost(post) {
    fetch(postURL, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Accept: "applicaion/json"
        },
        body: JSON.stringify(post)
    })
    .then(resp => resp.json())
    .then(json => {
        createPostCard(json.data.attributes),
        renderLikes(json.data.attributes),
        renderComments(json.data.attributes)
    })
}

function createPostCard(post) {
    const postCont = document.getElementById('post')
        postCont.setAttribute('class', 'container') 
    const newDiv =  document.createElement('div')
         newDiv.setAttribute('id', `post-card-${post.id}`) 
         newDiv.setAttribute('class', 'post-card')    
    postCont.append(newDiv)    
    newDiv.innerHTML += `        
        <h1>${post.title}</h1><br>       
        <img src="${post.image_url}">
        <h3>${post.content}</h3>         
        <ul class="comment-list" id='comment-list-${post.id}'>
        </ul>
    `   
}

function renderLikes(post) {
    let card = document.getElementById(`post-card-${post.id}`)
    let div = document.createElement('div')
    card.appendChild(div)
    div.innerHTML += `
        <p id="like-${post.id}">Likes: <span id="span-${post.id}">${post.likes.length}</span></p>        
        <button id="likebtn-${post.id}" class="like-btn">Like</button>   
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
        <button id="commentBtn-${post.id}">Add Comment</button>
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
            form.setAttribute('class', 'comment-form')
        form.id = `commentForm-${post.id}`
        form.innerHTML = `
            <br><input class="comment_input" id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
            <br><input type="submit" value="Post Comment" class="comment_btn"/>
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
        if(comment !== ""){
        let ul = document.getElementById(`comment-list-${post.id}`)
        ul.innerHTML += `
            <br><li>${comment}</li>
        <br>
        `
        }
        if(comment !== "")
        {postComment(comment, post);}
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
            post_id: post.id,
            user_id: sessionStorage["id"]
        })
    })
   
}

