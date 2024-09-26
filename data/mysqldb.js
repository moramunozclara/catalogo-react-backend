import mysql from 'mysql2/promise';

import {mysqlConfig} from '../config/config.js';

// tambien llamado  db  o  connection
const mysqldb = await mysql.createConnection(mysqlConfig);

export default mysqldb;

