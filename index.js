let postsArr = []

function redirectTodetails(id){
    console.log(id, "id")
    window.location.assign("/newsDetails.html#"+`${id}`)
}

function renderPosts() {
    let html = ""
        for (let post of postsArr) {
            html += `
                <h3>${post.title}</h3>
                <img src=${post.avatar} />
                <p>By ${post.author}</p>
                <a href="newsDetails.html"> See details</a><br/>
                <div>
                    <button id="delete-btn" onclick=${"deletePost()"}>Delete</button>
                    <button id="update-btn" onclick="redirectTodetails(post.id)">Edit</button>
                    <p></p>
                </div>
                <hr />
            `
        }
        document.getElementById("news-list").innerHTML = html
}

function newsList(){
    fetch("https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
        .then(data => {
            postsArr = data.slice(0, 10)
            renderPosts()
        })
        .catch(err => alert(err))
}
newsList()

function newPost() {
    document.getElementById("new-post").addEventListener("submit", function(event){
        event.preventDefault()
        const postAuthor = document.getElementById("post-author").value
        const postAvatar = document.getElementById("post-avatar").value
        const postTitle = document.getElementById("post-title").value
        const postUrl = document.getElementById("post-url").value
        const postId = Math.floor(Math.random() * 45 + 1)
        const newPost = {
            author: postAuthor,
            avatar: postAvatar,
            title: postTitle,
            url: postUrl,
            id: postId
        }
    
    fetch("https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(post => {
        postsArr.unshift(post)
        renderPosts()
        })
    .catch(err => alert(err))
    })
}
newPost()

const baseurl = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/"
// let newsId = post.id

function deletePost() {
    fetch(`${baseurl}news/${post.id}`, {method: "DELETE"})
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(post => console.log(post))
    .catch(err => alert(err))
}


// function paginated_fetch(
//     url = is_required("https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news"), // Improvised required argument in JS
//     page = 1,
//     previousResponse = []
//   ) {
//     return fetch(`${"https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news"}&page=${page}`)
//       .then(response => response.json())
//       .then(newResponse => {
//         const response = [...previousResponse, ...newResponse]; // Combine the two arrays
  
//         if (newResponse.length !== 0) {
//           page++;
  
//           return paginated_fetch(url, page, response);
//         }
  
//         return response;
//       });
//   }
    
// document.getElementById("detailed-news").addEventListener("submit", function(event){
//     event.preventDefault()
//     fetch("https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/:id", {method: "GET"})
//     .then(res => res.json())
//     .then(data => console.log(data))
// })

// paginated_fetch()