  // ES MODULES
  import express from 'express';
  import cors from 'cors';

  // hash  y jwt (mover a controladores de rutas)
  import bcrypt from 'bcrypt'; // es paara hacer hash de nuestros passwords
  import jwt from 'jsonwebtoken'; //crear y leer tokens JWT

  // Importar configuración desde config.js
  import { PORT, DOMAIN, JWT_SECRET, __dirname } from './config/config.js';


// importar rutas
import indexRoutes from './routes/index.routes.js';
// import mongoRoutes from './routes/mongodb.routes.js';



// helpers /o/ utilities
import { getBoolean, getLastId } from './utils/utils.js';

  const app = express();

  // ---------------------------
  //        Middlewares
  // ---------------------------
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));

  // base de daatos
  const users =[];

  const MockUser=  {
    name: 'Lucas',
    username: 'lucas@mail.com',
    password: '1234',
    image: 'https://picsum.photos/200/300'
  }

// Hacer pública la carpeta Public
app.use(express.static('public'));


// ---------------------------
//    DISEÑO LANDING HTML
// ---------------------------

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");

  const landingHTML = `
                      <h1>Bienvenidos a mi REST-API</h1>
                      <h2>Mi backend es: <strong>${DOMAIN}:${PORT} </h2>
                      <h2>
                        <ul>
                            <li><a href= "${DOMAIN}:${PORT}/api/v1/users">Users</a></li>
                            <li><a href= "${DOMAIN}:${PORT}/api/v1/login">login</a></li>
                            <li><a href= "${DOMAIN}:${PORT}/api/v1/admin">admin</a></li>

                        </ul>
                      </h2>
                      `;
  res.send(landingHTML);
});


  // rutas en general

  app.get('/api/v1/users', async (req, res, next) => {
    res.status(200).json({data:users, message:"aquí están los datos de los usuarios"})
  });

  app.get('/api/v1/admin', async (req, res, next) => {
    console.log('Estoy en admin');

    // res.status(200).json({data:users, message:"aquí están los datos"})
  });


  app.post('/api/v1/login', async (req, res, next) => {

  try {

    const {username, password} = req.body;

    // obtener el usuario recien creado
    const user = users.find( (u) => u.username === username);


    if (!user) {
      return res.status(400).json({message: "usuario no existente"});
    }

    // comparar contraseña con la base de datos
    const isMatch = await bcrypt.compare(password, user.password);

    // ingreso de contraseña incorrecta
    if (!isMatch) {
      return res.status(400).json({message: "contraseña incorrecta"});

    }


    console.log("User encontrado", user);
    res.status(200).json({data:MockUser, message: "Login correcto"});

  } catch (e) {
    res.status(500).json({error: 'Error en el servidooor'})
  }
});


  // REGISTRO
  app.post('/api/v1/register', async (req, res, next) => {

    try {

      const {username, password, email, image='https://picsum.photos/200/300'} = req.body;

      console.log(req.body);
      console.log(image);
    
      //  HASH de CONTRASEÑA con BCRYPT
      const hashedPassword = await bcrypt.hash(password, saltRounds );


      // guardar esto en la DB
      const id = Math.flooor(Math.random()*10000)+1;
        const newUser = {id, username, password:hashedPassword, email, image};
        users.push(newUser);

        // oobtener el usuario recien creadoo (luego consulta a mongoose para obtener usuario)
        const user = users.find( (u) => u.username === username);


      console.log('Estoy en register');
      res.status(200).json({data:user, message: "Registro correcto"});

    } catch (e) {
      res.status(500).json({error: 'Error en el servidooor'})
    }
  }
  );















// ---------------------------
//     Ruta BASE de la DOMAIN
// ---------------------------
app.use("/API/v1/", indexRoutes);
// app.use("/API/v1/mongo", mongoRoutes);

// rutas con mongodb
// app.use("/API/v1/", mongoRoutes);



// ---------------------------
//   Middleware de Manejo de Errores
// ---------------------------
app.use((err, req, res, next) => {
  console.error('Error en la API:', err);  // Para depuración
  res.status(500).json({
    status: "error",
    msg: "Error en la API",
    error: err.message
  });
});


// Aviso en consola
app.listen(PORT, () => {
  console.log(`Servidor iniciado en ${DOMAIN}:${PORT}`);
});