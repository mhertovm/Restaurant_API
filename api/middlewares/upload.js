const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, './api/public/image')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.png');
    }
});
const types = ['image/png', 'image/jpeg', 'image/jpg'];
function filterFile (req, file, cb) {
    if (types.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    };
};
const upload = multer({ storage: storage, filterFile });
module.exports = upload;