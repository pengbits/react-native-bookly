import db from '../db'
import Author from '../models/author.model'
import Book   from '../models/book.model'
import GetAuthorsMock from '../../../mocks/get-authors.mock'
import GetBooksMock   from '../../../mocks/get-books.mock'

// mandatory naming-conventions in use:
// key 'MyModel' - capitalized name
// GetMyModelMock - mock request response
// GetMyModelMock.mymodel - array of model attrs/payload
// 

const seedable_models = {
  Author,
  Book
}

const seedable_mocks = {
  'Author': GetAuthorsMock.authors,
  'Book': GetBooksMock.books
}

export const SeedModel = async (key) => {
  const model = seedable_models[key]
  if(!model) throw new Error('couldn\'t seed '+key)
  console.log(`SeedModel(${key})`)
  const {modelName}   = model
  const instanceName  = modelName.toLowerCase()
  
  
  const fixtures = (seedable_mocks[key] || []).map((item) => {
    const {_id,__v, ...attrs} = item
    return item
  })

  return await model.deleteMany({})
    .then(() => {
      console.log(`deleted all ${instanceName}s from db...`)
      console.log(`loading ${fixtures.length} ${instanceName}s into db...`)
    })
    .then(() => {
      return model.insertMany(fixtures)
    })
    .then(docs => console.log('success!'))
    .catch(err => console.log(err))
  
}