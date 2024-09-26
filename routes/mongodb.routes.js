import { Router } from "express";

import { getEmails,
        getEmailsById,
        createEmail,
        deleteEmail,
        updateEmail,

        getEmailsByUserId,
        getEmailsBySubject

} from '../controllers/correos.mongo.controller.js'

const router = Router();


router.get('/correos', getEmails);
router.get('/correos/:id', getEmailsById);

router.post('/correos', createEmail);

router.delete('/correos/:id', deleteEmail);

router.patch('/correos/:id', updateEmail) //marcar como leído

// rutas específicas
router.get('/correos/user/:user_id', getEmailsByUserId);

router.get('/correos/asunto/:asunto', getEmailsBySubject);



export default router;