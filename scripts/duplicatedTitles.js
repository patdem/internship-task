"use strict";

async function getDuplicatedPostsTitle() {
    const posts = await getData('https://jsonplaceholder.typicode.com/posts');

    const groupByTitle = groupPostByTitle(posts);
    const duplicatedPosts = getDuplicates(groupByTitle);

    let displayResult = duplicatedPosts.map(prettyPrintDuplicatedTitles);

    if (displayResult.length > 0) {
        displayResult = displayResult.join("<br>");
    } else {
        displayResult = 'There are no duplicates.'
    }

    document.getElementById("duplicatedPosts").innerHTML = displayResult;
}

function groupPostByTitle(posts) {
    return posts.reduce((acc, post) => {
        acc[post.title] = acc[post.title] + 1 || 1;
        return acc;
    }, {});
}

function getDuplicates(posts) {
    return Object.keys(posts).reduce((filtered, key) => {
        if (posts[key] > 1) {
            const duplicatedTitle = {
                title: key,
                count: posts[key],
            };
            filtered.push(duplicatedTitle);
        }
        return filtered;
    }, []);
}

function prettyPrintDuplicatedTitles(duplicatedPosts) {
    return `Post's title <b>"${duplicatedPosts.title}"</b> appears <b>${duplicatedPosts.count}</b> times.`
}

async function getData(url) {
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.error(error);
    }
}