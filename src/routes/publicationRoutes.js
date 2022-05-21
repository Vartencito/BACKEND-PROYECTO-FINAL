import { Router } from "express";
import { createPublication, deletePublication, deletePublicationsFromUser, getPublicationById, getPublications, getPublicationsByUserId } from "../controllers/publicationController";

const router = Router();

router.get('/publicaciones', getPublications);

router.get('/publicaciones/:Id', getPublicationById);

router.get('/publicaciones/getPublicationsByUserId/:fkUser', getPublicationsByUserId)

router.post('/publicaciones', createPublication);

router.delete('/publicaciones/:Id', deletePublication);

router.delete('/publicaciones/getPublicationsByUserId/:fkUser', deletePublicationsFromUser);

// router.put('/publicaciones/:Id', updateUser); (no se si esta bien hacer un update de una publicacion)

export default router;