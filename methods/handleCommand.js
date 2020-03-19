function handleCommand(message) {
    if (message.author.bot)
        return;

    if (message.mentions.users.has(this.client.user.id) && this.mentionFunction) {
        this.mentionFunction(this.client, message)
    }

    var prefix = this.getPrefix(message.guild.id);
    if (!message.content.startsWith(prefix))
        return;
    var plain = message.content.substr(prefix.length, message.content.length - prefix.length);
    var args = plain.trim().split(" ");
    var command = args.shift().toLowerCase();
    var executeCmd = this.commands[command] || this.commands[this.aliases[command]];
    if (executeCmd) {
        var startTime = Date.now();
        executeCmd.run(this.client, command, args, message).then(function () {
            console.log("(" + message.author.username + " (" + message.author.id + ")) Command " + command + " executed in " + (Date.now() - startTime) + "ms");
        })
    }
}
exports.handleCommand = handleCommand
