let api = "https://api.github.com/users/";
var userName = document.getElementById("textfield");

userName.addEventListener("keydown", function(e) {
    if (e.code === "Enter") {
        getUser(userName.value);
    }
});

function getUser(userName) {
    console.log(api + userName);
    fetch(api + userName)

    .then(response => response.json())
    .then(data => {
        console.log(data);
        getUserRepos(userName)
        userCard(data);
    })
    .catch(error => console.error(error));
}

function getUserRepos(userName){
    endPoint = '/repos?sort=created'
    console.log(api + userName + endPoint);
    fetch(api + userName + endPoint)

    .then(response => response.json())
    .then(data => {
        console.log(data)
        userRepoCard(data);

    })
    .catch(error => console.error(error))
}

function userCard(user){
    let id = user.name || user.login;
    let bio = user.bio || '';
    let followers = user.followers;
    let following = user.following;
    let publicRepos  = user.public_repos;

    let cardElement = `
    <div class="card">
        <div class="picture">
            <img src="${user.avatar_url}" alt="${id}" class="avatar">
        </div>

        <div class="user-info">
            <h2 class="name">${id}</h2>
            <h3 class="user-stats">Followers: ${followers} Following: ${following} Repos: ${publicRepos}</h3>
            <p>${bio}</p>
            <p class="repo-info">Avalible repos:</p>

            <div id="repos"> </div>

            
        </div>
    </div>`;

    let container = document.getElementById("userCardContainer");
    container.innerHTML = cardElement; 

}

function userRepoCard(repos) {
    let reposElement = document.getElementById("repos");
    reposElement.innerHTML = ''; 

    for (let i = 0; i < 5 && i < repos.length; i++) {
        let repo = repos[i];
        let projectLink = repo.html_url;
        console.log(repo);

        let repoCardElement = `
        <h1 class="repo-card" onclick="directUser('${projectLink}')">${projectLink}</h1>
        `;
        reposElement.innerHTML += repoCardElement; 
    }
}

function directUser(link) {
    console.log(link)
    window.location.href = link;
}


