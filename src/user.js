const getUserRole = (message) => {
    let userRole = new Set();
    message.member._roles.map((role, index) => {
        /* 
         * userRole.name, userRole.color
         */
        userRole.add(
            message.guild.roles.cache.get(role).name
            // color: message.guild.roles.cache.get(role).color
        );
    })

    return userRole;
}

module.exports = { getUserRole };