"use strict";

async function countPostsByUserId() {
    const users = await getData('https://jsonplaceholder.typicode.com/users');
    const posts = await getData('https://jsonplaceholder.typicode.com/posts');

    const postsPerUser = getPostsPerUser(users, posts);
    
    const displayResult = postsPerUser.map(prettyPrintUsersPosts).join("<br>");

    document.getElementById("postPerUser").innerHTML = displayResult;
}

function getPostsPerUser(users, posts){
    let postsPerUser = [];
    
    for (const user of users) {
        const userPosts = posts.filter(post => post.userId == user.id);
        
        const countUserPosts = {
            id: user.id,
            name: user.name,
            postsCount: userPosts.length,
        };

        postsPerUser.push(countUserPosts);
    }

    return postsPerUser;
}

function prettyPrintUsersPosts(userPostsArray) {
    return `<b>${userPostsArray.name}</b> wrote <b>${userPostsArray.postsCount}</b> posts.`
}

async function getData(url) {
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.error(error);
    }
}