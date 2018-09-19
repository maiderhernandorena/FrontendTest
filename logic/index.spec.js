'use strict'

describe('github api logic test', () => {

    describe('search user', () => {
        const query = 'maiderhernandorena'
        const falseQuery = 'sgjdfadsjfgas'

        it('should retrieve a user info searching by name', () => 
            logic.searchUser(query)
                .then(user => {
                    expect(user).toBeDefined()

                    expect(user.login).toBe(query)
                    expect(user.avatar_url).toBeDefined()
                })
        )

        it('should fail on trying to search a non existing user', () => 
            logic.searchUser(falseQuery)
                .catch(err => err)
                .then(({ message }) => {
                    expect(message).toBeDefined()

                    expect(message).toBe('Not Found')
                })
        )

        it('should fail on trying to search with an empty user', () => 
            logic.searchUser('')
                .catch(err => err)
                .then(({ message }) => {
                    expect(message).toBeDefined()

                    expect(message).toBe('Not Found')
                })
        )

        it('should fail on trying to search with an undefined user', () => 
            logic.searchUser(undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).toBeUndefined())
        )
        
    }),

    describe('retrieve names repos', () => {

        const query = 'maiderhernandorena'
        const falseQuery = 'sgjdfadsjfgas'

        it('should retrieve a user info searching by name', () => 
            logic.retrieveUserRepos(query)
                .then(repos => {
                    expect(repos).toBeDefined()

                    expect(repos[0].name).toBe('FrontendTest')
                    expect(repos[1].name).toBe('reminder-app')

                    expect(repos[0].stargazers_count).toBeDefined()
                    expect(repos[0].forks_count).toBeDefined()
                })
        )

        it('should fail on trying to search a non existing user', () => 
            logic.retrieveUserRepos(falseQuery)
                .catch(err => err)
                .then(({ message }) => {
                    expect(message).toBeDefined()

                    expect(message).toBe('Not Found')
                })
        )

        it('should fail on trying to search with an empty user', () => 
            logic.retrieveUserRepos('')
                .catch(err => err)
                .then(({ message }) => {
                    expect(message).toBeDefined()

                    expect(message).toBe('Not Found')
                })
        )

        it('should fail on trying to search with an undefined user', () => 
            logic.retrieveUserRepos(undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).toBeUndefined())
        )

    })
})