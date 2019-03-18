const referee = {};
referee.rules = {
    gamePlay: 0,
    gameOver: 1
}
referee.participants = [];
referee.init = (config) => {
    referee.score = 0;
    referee.level = 1;
    if (config.custom.hackable === true){
        referee.level = config.custom.level || 1;
    };

    return referee;
}
referee.setScore = (value) => {
    referee.score += value * referee.level;

    if (referee.score < 0){
        referee.score = 0;
    };

    return referee;
}
referee.onGameOver = (call) => {
    call();
    window.location.relaod();
}
referee.checkGameOver = (call) => {
    let callGameOver = false;
    participants.forEach((member) => {
        if (member.currentState === referee.rules.gameOver){
            callGameOver = true;
        }
    });

    if (callGameOver){
        console.log("Game is over!");
        referee.onGameOver(call);
    }

    return callGameOver;
}
referee.addParticipant = (member) => {
    referee.participants.push(member);

    return referee
}
module.exports = referee;
