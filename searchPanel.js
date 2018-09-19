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
    userData.innerHTML = `
        <img src=${user.avatar_url}/>
        <p>@${user.login}</p>
        <h1>${user.name}</h1>
        <a href=${user.html_url}>${user.html_url}</p> `
}

showRepos = repos => {
    reposList.innerHTML = `
        <ul>
            ${repos.map(repo => (`<li>
                <p>${repo.name}</p>
                <img src="./assets/code-fork-symbol.svg" />
                <p>${repo.stargazers_count}</p>
                <img src="./assets/star.svg" />
                <p>${repo.forks_count}</p>
            </li>`))}
        </ul>`
}

showError = () => errorMessage.innerHTML = `<h3>Does not exist</h3>`