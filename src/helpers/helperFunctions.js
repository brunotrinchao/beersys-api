module.exports = { 
    validaEmail: (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    },
 };