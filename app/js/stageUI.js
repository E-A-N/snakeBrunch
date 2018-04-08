module.exports = (config) => {
    //Construct the UI
    const div = document.createElement("div");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.setAttribute("width", config.gameWidth);
    canvas.setAttribute("height", config.gameHeight);
    canvas.setAttribute("id", config.domID);
    div.innerHTML = "Herro Robo!!";
    console.log("Stage is up!!");
    console.log(config);
    div.appendChild(canvas);
    document.body.appendChild(div);

    //Style the stage UI
    ctx.lineWidth = config.style.lineWidth;
    ctx.strokeStyle = config.style.strokeStyle;
    const strokeArgs = [config.style.lineWidth]
    ctx.strokeRect(...config.uiPosition)
}
