import dotenv from 'dotenv';
// import  program  from '../../process.js';

import { Command } from 'commander';

const program = new Command()

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Puerto del server', 9090)
    .option('--mode <mode>', 'Modo de trabajo', 'develop')
    .option('-u <user>', 'Usuario que va utilizar la app', "No se declaro ningun usuario")

program.parse()



// console.log("Options: ", program.opts());
// console.log("Modo Opt: ", program.opts().mode);
// console.log("Puerto Opt: ", program.opts().p);

console.log("Argumentos Opt: ", program.args);















const enviroment = program.opts().mode;
console.log("Modo Opt: ", program.opts().mode);

dotenv.config({
   path: enviroment === "production" ? "./src/config/.env.production" : "./src/config/.env.development"
})      

export default {
    program:program,
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    // adminName: process.env.ADMIN_NAME,
    // adminPassword: process.env.ADMIN_PASSWORD
    
}