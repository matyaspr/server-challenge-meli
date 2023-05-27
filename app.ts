import dotenv  from 'dotenv'
import { Server } from './src/server'

dotenv.config();


const app = new Server();
app.listen();