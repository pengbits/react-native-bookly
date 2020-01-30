import { Router } from 'express'
import controller from '../controllers/books.controller'

export default () => {
  const api = Router();
  
  api.get('/'   ,     controller.list)
  //api.get('/search',  controller.search)
  //api.get('/:id',     controller.get)
  //api.put('/:id',     controller.update)
  //api.post('/'  ,     controller.create)
  //api.delete('/:id',  controller.remove)
  
  return api
}