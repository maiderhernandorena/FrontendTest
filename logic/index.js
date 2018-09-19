'use strict'

const logic = {
    
    searchUser(query) {
        return fetch(`https://api.github.com/users/${query}?client_id=7233be87b684e19edf4a&client_secret=2bd1e36f134a78d7741dcac51fb3a982a6cdf8d1`, { method: 'get' })
            .then(res => res.json())
            .then(user => user)
            .catch(({ message }) => message)
    },

    retrieveUserRepos(query) {
        return fetch(`https://api.github.com/users/${query}/repos?client_id=7233be87b684e19edf4a&client_secret=2bd1e36f134a78d7741dcac51fb3a982a6cdf8d1`, { method: 'get' })
            .then(res => res.json())
            .then(repos => repos)
            .catch(({ message }) => message)
    }
}

if(typeof module !== 'undefined') module.exports = logic