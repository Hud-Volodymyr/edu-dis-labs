function maskProfile(data) {
    return {
        name : data.name,
        lastName : data.lastName,
        email : data.email
    }
}


module.exports = {
    maskProfile
}
