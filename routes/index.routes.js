import { Router } from 'express';
const router = Router();

// Define tus rutas aquí, importar mis exportaciones de mockdata (incluir .js)
import {hero, sections, inbox} from '../data/mockData.js';

import {getHero} from '../controllers/hero.controller.js';
import {getSections} from '../controllers/sections.controller.js';
import {getFeatures} from '../controllers/features.controller.js';
import {getPraise} from '../controllers/praise.controller.js';
import {getAllCorreos} from '../controllers/correos.controller.js';

// ---------------------------       
//  RUTAS a los controllers (API/v1)
// ---------------------------

// /posts________________________________________________________
    
    // GET /hero
    router.get("/hero", getHero );

    router.get("/sections", getSections );

    router.get("/features", getFeatures );

    router.get("/praise", getPraise );

    router.get("/inbox", getAllCorreos );


    // POST /hero (agregar nuevo hero nuestra base de datos ???????)
    // router.post("/hero", newHero );

export default router;


