describe("Count posts per user", function() {

    it("A user wrote 3 posts", function() {
        const users = [
            {
              "id": 1,
              "name": "Leanne Graham",
              "username": "Bret",
              "email": "Sincere@april.biz",
              "address": {
                "street": "Kulas Light",
                "suite": "Apt. 556",
                "city": "Gwenborough",
                "zipcode": "92998-3874",
                "geo": {
                  "lat": "-37.3159",
                  "lng": "81.1496"
                }
              },
              "phone": "1-770-736-8031 x56442",
              "website": "hildegard.org",
              "company": {
                "name": "Romaguera-Crona",
                "catchPhrase": "Multi-layered client-server neural-net",
                "bs": "harness real-time e-markets"
              }
            }
        ];
        const posts = [
            {
              "userId": 1,
              "id": 1,
              "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
              "body": `quia et suscipit
              suscipit recusandae consequuntur expedita et cum
              reprehenderit molestiae ut ut quas totam
              nostrum rerum est autem sunt rem eveniet architecto`
            },
            {
              "userId": 1,
              "id": 2,
              "title": "qui est esse",
              "body": `est rerum tempore vitae
              sequi sint nihil reprehenderit dolor beatae ea dolores neque
              fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis
              qui aperiam non debitis possimus qui neque nisi nulla`
            },
            {
              "userId": 1,
              "id": 3,
              "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
              "body": `et iusto sed quo iure
              voluptatem occaecati omnis eligendi aut ad
              voluptatem doloribus vel accusantium quis pariatur
              molestiae porro eius odio et labore et velit aut`
            },
        ];
        const postsPerUserExpected = [
            {
                id: 1, 
                name: "Leanne Graham", 
                postsCount: 3,
            }
        ];

        const postsPerUserActual = getPostsPerUser(users, posts);

        assert.equal(JSON.stringify(postsPerUserActual), JSON.stringify(postsPerUserExpected));
    });

    it("Empty arrays as arguments", function() {
        const users = [];
        const posts = [];
        assert.isEmpty(getPostsPerUser(users, posts));
    });

});

describe("Group posts by title", function() {

    it("Three posts: two of them have the same title", function() {
        const posts = [
            {
              "userId": 1,
              "id": 1,
              "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
              "body": `quia et suscipit
              suscipit recusandae consequuntur expedita et cum
              reprehenderit molestiae ut ut quas totam
              nostrum rerum est autem sunt rem eveniet architecto`
            },
            {
              "userId": 1,
              "id": 2,
              "title": "qui est esse",
              "body": `est rerum tempore vitae
              sequi sint nihil reprehenderit dolor beatae ea dolores neque
              fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis
              qui aperiam non debitis possimus qui neque nisi nulla`
            },
            {
              "userId": 1,
              "id": 3,
              "title": "qui est esse",
              "body": `et iusto sed quo iure
              voluptatem occaecati omnis eligendi aut ad
              voluptatem doloribus vel accusantium quis pariatur
              molestiae porro eius odio et labore et velit aut`
            },
        ];

        const groupByTitleExpected = {
                "sunt aut facere repellat provident occaecati excepturi optio reprehenderit": 1,
                "qui est esse": 2,
            };

        const groupByTitleActual = groupPostByTitle(posts);

        assert.equal(JSON.stringify(groupByTitleActual), JSON.stringify(groupByTitleExpected));
    });

    it("Empty array as arguments", function() {
        const posts = [];
        assert.isEmpty(groupPostByTitle(posts));
    });
});

describe("Find duplicates", function() {

    it("Three posts: two of them have the same title", function() {
        const groupByTitle = {
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit": 1,
            "qui est esse": 2,
        };

        const duplicatesExpected = [
            {
            title: "qui est esse",
            count: 2,
            }
        ];

        const duplicatesActual = getDuplicates(groupByTitle);

        assert.equal(JSON.stringify(duplicatesActual), JSON.stringify(duplicatesExpected));
    });

    it("Empty array as arguments", function() {
        const posts = [];
        assert.isEmpty(getDuplicates(posts));
    });
});

describe("Find the nearest neighbours pairs", function() {

    it("Three users with different cooridantes", function() {
        const users = [
            {
              "id": 1,
              "name": "Leanne Graham",
              "username": "Bret",
              "email": "Sincere@april.biz",
              "address": {
                "street": "Kulas Light",
                "suite": "Apt. 556",
                "city": "Gwenborough",
                "zipcode": "92998-3874",
                "geo": {
                  "lat": "-37.3159",
                  "lng": "81.1496"
                }
              },
              "phone": "1-770-736-8031 x56442",
              "website": "hildegard.org",
              "company": {
                "name": "Romaguera-Crona",
                "catchPhrase": "Multi-layered client-server neural-net",
                "bs": "harness real-time e-markets"
              }
            },
            {
              "id": 2,
              "name": "Ervin Howell",
              "username": "Antonette",
              "email": "Shanna@melissa.tv",
              "address": {
                "street": "Victor Plains",
                "suite": "Suite 879",
                "city": "Wisokyburgh",
                "zipcode": "90566-7771",
                "geo": {
                  "lat": "-43.9509",
                  "lng": "-34.4618"
                }
              },
              "phone": "010-692-6593 x09125",
              "website": "anastasia.net",
              "company": {
                "name": "Deckow-Crist",
                "catchPhrase": "Proactive didactic contingency",
                "bs": "synergize scalable supply-chains"
              }
            },
            {
              "id": 3,
              "name": "Clementine Bauch",
              "username": "Samantha",
              "email": "Nathan@yesenia.net",
              "address": {
                "street": "Douglas Extension",
                "suite": "Suite 847",
                "city": "McKenziehaven",
                "zipcode": "59590-4157",
                "geo": {
                  "lat": "-68.6102",
                  "lng": "-47.0653"
                }
              },
              "phone": "1-463-123-4447",
              "website": "ramiro.info",
              "company": {
                "name": "Romaguera-Jacobson",
                "catchPhrase": "Face to face bifurcated interface",
                "bs": "e-enable strategic applications"
              }
            },
        ];

        const nearestNeighboursPairsExpected = [
            {
                neighbours: ["Leanne Graham", "Clementine Bauch"],
                distance: 7489.528094472759,
            },
            {
                neighbours: ["Ervin Howell", "Clementine Bauch"],
                distance: 2837.0610095079833,
            },
            {
                neighbours: ["Clementine Bauch","Ervin Howell"],
                distance: 2837.0610095079833,
            },
        ];

        const nearestNeighboursPairsActual = getNearestNeighboursPairs(users);

        assert.equal(JSON.stringify(nearestNeighboursPairsActual), JSON.stringify(nearestNeighboursPairsExpected));
    });
});


describe("Compute distance between two points given latitude and longitude", function() {

    it("Distance from Leanne Graham to Chelsey Dietrich (expected: ~1807.29 km)", function() {
        const geo1 = {
            "lat": "-31.8129",
            "lng": "62.5342"
        };
        const geo2 = {
            "lat": "-37.3159",
            "lng": "81.1496"
        }
        assert.approximately(1807.29, getGeoDistance(geo1, geo2), 1e-2);
    });

    it("Distance between the same point (expected: ~0.0 km)", function() {
        const geo1 = {
            "lat": "-90.0",
            "lng": "0.0"
        };
        assert.approximately(0, getGeoDistance(geo1, geo1), 1e-2);
    });

    it("Distance from center point to two symmetrical points", function() {
        const center = {
            "lat": "0.0",
            "lng": "0.0"
        };
        const geo1 = {
            "lat": "-31.8129",
            "lng": "62.5342"
        };
        const geo2 = {
            "lat": "31.8129",
            "lng": "62.5342"
        }
        assert.approximately(getGeoDistance(geo1, center), getGeoDistance(center, geo2), 1e-2);
    });
});