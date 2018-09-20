const form = document.getElementById('form')
const userData = document.getElementById('user')
const reposList = document.getElementById('repos')
const errorMessage = document.getElementById('error')

clearData = () => {
    userData.innerHTML = ''
    reposList.innerHTML = ''
    errorMessage.innerHTML = ''
}

form.addEventListener('submit', event => {
    event.preventDefault()
    
    clearData()

    const query = document.getElementById('query').value

    if(query !== '') {
        logic.searchUser(query)
            .then(user => {
                if(user.message === 'Not Found') {
                    showError()
                } else {
                    showUser(user)
                    logic.retrieveUserRepos(query)
                        .then(repos => showRepos(repos))
                }
            })   
    } 
})

showUser = user => {
    userData.style.display = "block"
    userData.innerHTML = `<div>
            <img src=${user.avatar_url}/>
            <div>
                <p>@${user.login}</p>
                <h2>${user.name}</h2>
                <a href=${user.html_url}>${user.html_url}</p>
            </div>
        </div> `
}

showRepos = repos => {
    reposList.style.display = "block"
    reposList.innerHTML = `
        <h2>Repositories</h2>
        <ul>
            ${repos.map(repo => (`<li>
                <p>${repo.name}</p>
                <div>
                    <img src="./assets/star.svg" />
                    <p>${repo.stargazers_count}</p>
                    <img src="./assets/code-fork-symbol.svg" />
                    <p>${repo.forks_count}</p>
                </div>
            </li>`))}
        </ul>`
}

showError = () => {
    errorMessage.style.display = "block"
    errorMessage.innerHTML = `<p>Does not exist</p>`
}