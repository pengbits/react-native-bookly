const routes = (app) => {
  app.route('/authors')
    .get((req,res) => 
    res.send('GET request ok'))
    
    .post((req,res) =>
    res.send('POST request ok'))
    
  app.route('/authors/:author_id')
    .get((req, res) => 
    res.send('GET request ok'))
    
    .put((req, res) => 
    res.send('PUT request ok'))
    
    .delete((req, res) => 
    res.send('DELETE request ok'))
}

export default routes