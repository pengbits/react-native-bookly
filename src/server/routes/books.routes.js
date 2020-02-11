import { Router } from 'express'
import controller from '../controllers/books.controller'

export default () => {
  const api = Router();
  
  api.get('/'   ,             controller.list)
  api.get('/favorites',       controller.favorites)
  api.get('/:id',             controller.get)
  api.put('/:id',             controller.update)
  api.post('/'  ,             controller.create)
  api.delete('/:id',          controller.remove)
  api.put('/:id/favorite',    controller.favorite) // favoriting is just a micro update, must be a PUT
  api.put('/:id/unfavorite',  controller.unfavorite)
  
  return api
}