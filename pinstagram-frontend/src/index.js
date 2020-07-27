const postURL = "http://localhost:3000/posts"
const likeURL = "http://localhost:3000/likes"
const commentURL = "http://localhost3000/comments"

document.addEventListener('DOMContentLoaded', () => {
    getData();
    newPost();
})

function getData() {
    fetch(postURL)
    .then(res => res.json())
    .then(json => {
        renderPosts(json)
    })

}

function renderPosts(posts) {
    const postCard = document.getElementById('post')
    posts.forEach(post => {
        createPostCard(post, postCard),
        addLikes(post, postCard),
        addComments(post, postCard)
    })

}

function createPostCard(post, postCard) {
    const newDiv = document.createElement('div')
        newDiv.setAttribute('id', 'post-list')
        newDiv.innerHTML = `
        <h2>${post.title}</h2>
        <img src="${post.image_url}" class="post-image">
        <h3>${post.content}</h3>
        `
        postCard.append(newDiv)

}
function newPost() {
    const postForm = document.querySelector('.add-post-form')
    postForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        postFetch(e); 
    })
};

function postFetch(e){  
      fetch(postURL, {
        method: 'POST',
        body: JSON.stringify({ 
            "title": e.target.title.value,
            "image_url": e.target.image.value,
            "likes": 0,
            "comments": []
    }), 
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }})
      .then(resp => resp.json())
      .then(json => console.log(json));
};

function addLikes(post, postCard) { 
    let likesCont = document.createElement('div')
    likesCont.id = 'likesCont'
    likesCont.innerHTML = `
        <p>Likes: ${post.like_count}</p>
        <button id='likebtn'>Like</button>
    `
    postCard.appendChild(likesCont)
    
}

function addComments(post, postCard) {
    let commentsCont = document.createElement('div')
    commentsCont.id = 'commentsCont'
    commentsCont.innerHTML = `
    <h3>Comments</h3>
    <button id="commentBtn">Comment</button>
    `

    postCard.appendChild(commentsCont)
    addCommentForm(post, commentsCont)

    ul = document.createElement('ul')
    post.comments.forEach(comment => {
        ul.innerHTML += `
        <br><br>
                <li>${comment.content}</li>
        <br><br>
        `
    })

    postCard.appendChild(ul)

}

function createCommentForm(commentsCont) {
    let form = document.createElement('form')
    form.id = 'commentForm'
    form.innerHTML = `
            <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
            <input type="submit" value="Submit"/>
    `
    commentsCont.appendChild(form)
}

function addCommentForm(post, element) {
    let commentBtn = document.getElementById('commentBtn')
    commentBtn.addEventListener('click', (e) => {
        e.preventDefault()
        commentBtn.classList.add('hidden')
        createCommentForm(commentsCont)
        form = document.getElementsByTagName('form')[0]
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            element.removeChild(form)
            commentBtn.classList.remove('hidden')
            const comment = {
                "content": e.target.comment_input.value
            }
            console.log(comment)
        })
    })
}