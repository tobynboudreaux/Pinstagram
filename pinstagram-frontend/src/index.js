const postURL = "http://localhost:3000/posts"
const likeURL = "http://localhost:3000/likes"
const postURL = "http://localhost3000/comments"

document.addEventListener('DOMContentLoaded', () => {

    getData();

})

function getData() {
    fetch(postURL)
    .then(res => res.json())
    .then(json => {
        renderPosts(json),
        renderComments(json),
        renderLikes(json)
    })
}

function renderPosts(posts) {

    posts.forEach(post => {
        createPostCard(post)
    })

}

function createPostCard(post) {
    const postCard = document.getElementById('post')
    postCard.innerHTML = `
        <h1>${post.title}</h1>
        <img src="${post.image_url}">
        <h3>${post.content}</h3>
    `
}
