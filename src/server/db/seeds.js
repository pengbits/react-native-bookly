import Author from '../models/author.model'
import GetAuthors from '../../../mocks/get-authors.mock'
console.log('deleting all authors from db...')
Author.deleteMany({}, function(res){
  console.log(res)
})
var query = Author.find({})
query.exec(function(e, items) {
  console.log([e, items])
})