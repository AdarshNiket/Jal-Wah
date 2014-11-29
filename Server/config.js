var fs = require('fs');
module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'development':
            return fs.read('./')
        case 'production':
            return {prod settings};

        default:
            return {error or other settings};
    }
};