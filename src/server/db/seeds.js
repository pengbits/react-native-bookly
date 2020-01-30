import db from '../db'
import Author from '../models/author.model'
import GetAuthorsMock from '../../../mocks/get-authors.mock'
const {authors} = GetAuthorsMock

export const SeedAuthors = () => {

  console.log('deleting all authors from db...')
  Author.deleteMany({}, function(res){
    res && console.log(res)
  })
  console.log('loading authors into db from fixtures')

  const fixtures = authors.map((author) => {
    // reject reserved attributes
    const {_id,__v, ...attrs} = author
    new Author(attrs).save()
  })

}