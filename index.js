const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())

/* 
- Query params => meusite.com/users?nome=lukas&age=24  // FILTROS
- Route params =>  // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
- Request Body => {"name":"Lukas", "age":}
*/

const users = []

const checkUserId = (request, response, next) => {
    const {id} = request.params
    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({error: "User not found"})
    }
    request.userIndex = index
    request.userId = id

    next()

}
app.get('/users', (request, response) => {
   
    return response.json(users)
})

app.post('/users', (request, response) => {
    const {name, age} = request.body

    const user = {id:uuid.v4(), name, age}
    
    users.push(user)
    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {
    const {name, age} = request.body
    const index = request.userIndex
    const id = request.id
   
    
    const updateUser = {id, name, age}

    users[index] = updateUser

    return response.json(updateUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index,1)
    return response.status(204).json()
})



// const myFirstMiddleare = (request, response, next) => {
//     console.log('Fui chamado')

//     next()

//     console.log('finalizamos')
// }
// app.use(myFirstMiddleare)





app.listen(3000, () => {
    console.log(`🚀 Server started on ${port}`)
})




// app.get('/users', (request, response) => {
//     const { name, age} = request.query
  

//     return response.json({name, age})
// })


// app.get('/users/:id', (request, response) => {
//     const { id } = request.params
  

//     return response.json({id})
// })
