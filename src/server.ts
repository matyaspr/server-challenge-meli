import express, { Application } from 'express';
import cors from 'cors';
import itemsRoutes from './routes/item.route';


export class Server {
  private app: Application;
  private port: string;
  private apiPath = {
    apiItems: '/api/items'
  }

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3010';
    this.routes();
    this.middlewares();
  }

  routes() {
    this.app.use( this.apiPath.apiItems, itemsRoutes)
  }

  middlewares() {
    this.app.use( cors() )
    this.app.use( express.json() )
  }

  listen() {
    this.app.listen( this.port, () => 
      console.log(`server running in port ${ this.port}`)
    )
  }
}