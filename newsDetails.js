function renderComments() {
    let html = ""
        for (let post of postComments) {
            html += `
                <p>${post.name}</p>
                <p> ${post.comment} </p>
                <div>
                    <button id="delete-btn" onclick=${"deleteComment()"}>Delete</button>
                    <button id="edit-btn">Edit Comment</button>
                </div>
                <hr />
            `
        }
        document.getElementById("comments-list").innerHTML = html
}

const baseurl = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/"
let newsId = "48"

function newsDetails() {
    fetch(`${baseurl}news/${newsId}`)
        .then(res => res.json())
        .then(post => {
            document.getElementById("detailed-news").innerHTML=`
                <h3>${post.title}</h3>
                <img src=${post.avatar} />
                <p>By ${post.author}</p>
            `
            console.log(post)
        })
    }
newsDetails()

function updateDetails() {
    const url=window.location.href
    const id = url.split("#")[1]
    fetch(`${baseurl}news/${id}`)
        .then(res => res.json())
        .then(post => {
            console.log(post)
            document.getElementById("post-author").defaultValue = post.author
            document.getElementById("post-avatar").defaultValue = post.avatar
            document.getElementById("post-title").defaultValue = post.title
            document.getElementById("post-url").defaultValue = post.url
        })
    }
updateDetails()

function updatePost(){
    const url=window.location.href
    const id = url.split("#")[1]
    document.getElementById("update-post").addEventListener("submit", function(event){
        event.preventDefault()
        const postAuthor = document.getElementById("post-author").value
        const postAvatar = document.getElementById("post-avatar").value
        const postTitle = document.getElementById("post-title").value
        const postUrl = document.getElementById("post-url").value
        const updatePost = {
            author: postAuthor,
            avatar: postAvatar,
            title: postTitle,
            url: postUrl
        }
console.log(updatePost, 'updated')
    fetch(`${baseurl}news/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatePost),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        window.location.href = "/"
        return res.json()
    })
    .catch(err => alert(err))
    })
}
updatePost()

function newComment() {
    document.getElementById("add-comment").addEventListener("submit", function(event){
        event.preventDefault()
        const name = document.getElementById("name").value
        const comment = document.getElementById("comment").value
        const newComment = {
            name: name,
            comment: comment
        }
    
    fetch("https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news", {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        console.log(res.status)
        return res.json()
    })
    .then(post => {
        postComments.unshift(post)
        renderComments()
        })
    .catch(err => alert(err))
    })
}
newComment()
