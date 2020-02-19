import GetAuthorsMock from '../../../../mocks/get-authors.mock'

export default () => {
  const {length}     = GetAuthorsMock.authors
  const i            = Math.floor(Math.random() * length)
  expectedAuthor     = GetAuthorsMock.authors[i]
  return expectedAuthor
}
