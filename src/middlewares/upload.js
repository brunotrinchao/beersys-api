const multer = require('multer');
const fs = require('fs');

const uploadDirectory = './src/uploads';

// Verificar se o diretório de upload existe, senão criar
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Configurando o destino do armazenamento das imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Pasta onde as imagens serão salvas
  },
  filename: (req, file, cb) => {
    cb(null, getRandomFileName(file.originalname)); // Nome do arquivo
  }
});

const getRandomFileName = (filename) => {
    const extensao = filename.split('.').pop();
    var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
    var random = ("" + Math.random()).substring(2, 8); 
    var random_number = timestamp+random;  
    return random_number + '.' + extensao;
}

// Configurando o filtro de tipos de arquivo aceitos (opcional)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({ storage: storage, fileFilter: fileFilter });

