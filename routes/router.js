import express from 'express';
import { 
  getTree,
  createFolder,
  uploadFiles,
  downloadFiles,
  renameFile,
  deleteFile
} from '../controllers/filesManager.js';

const router = express.Router();

router.get('/files/?*', getTree );
router.post('/create', createFolder );
router.post('/upload', uploadFiles );
router.get('/download/*/:id', downloadFiles );
router.put('/rename/*/:id', renameFile );
router.delete('/delete/*/:id', deleteFile );

export default router;