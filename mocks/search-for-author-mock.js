export default ({name,vendorId}) => {
  const authorSlug = name.split(' ').map((str) => {
    return str[0].toUpperCase() + str.substr(1)
  }).join('_')
  
  return {
    success: true,
    author: {
      name,
      vendorId,
      link: `https://www.goodreads.com/author/show/${vendorId}.${authorSlug}?utm_medium=api&utm_source=author_link`
    }
  }
}