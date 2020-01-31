import db from '../db'
import Author from '../models/author.model'
import Book   from '../models/book.model'
import GetAuthorsMock from '../../../mocks/get-authors.mock'
import GetBooksMock   from '../../../mocks/get-books.mock'

const seedable_models = {
  Author,
  Book
}

const seedable_mocks = {
  'Author': GetAuthorsMock.authors,
  'Book': GetBooksMock.books
}

export const SeedAuthors = () => {

  console.log('deleting all authors from db...')
  Author.deleteMany({}, function(res){
    res && console.log(res)
  })
  console.log(`loading ${GetAuthorsMock.authors.length} authors into db...`)
  const fixtures = GetAuthorsMock.authors.map((author) => {
    // reject reserved attributes
    const {_id,__v, ...attrs} = author
    new Author(attrs).save()
  })

}

export const SeedBooks = () => {
  console.log('deleting all books from db...')
  Book.deleteMany({}, function(res){
    res && console.log(res)
  })

  console.log(`loading ${GetBooksMock.books.length} books into db...`)
  const fixtures = GetBooksMock.books.map((author) => {
    const {_id,__v, ...attrs} = author
    return attrs
  })
  
  Book.insertMany(fixtures, (err,docs) =>{
    if(err) {
      console.log(err)
    } else {
      console.log('success')
    }
  })

}


// naming-conventions in use
// key 'MyModel' - capitalized name
// GetMyModelMock - mock request response
// GetMyModelMock.mymodel - array of model attrs/payload
// 
export const SeedModel = async (key) => {
  const model = seedable_models[key]
  if(!model) throw new Error('couldn\'t seed '+key)
  
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