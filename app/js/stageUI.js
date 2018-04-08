module.exports = (config, ) => {
    //Construct the UI
    const div = document.createElement("div");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");


    canvas.setAttribute("width", config.gameWidth);
    canvas.setAttribute("height", config.gameHeight);
    canvas.setAttribute("id", config.domID);

    div.appendChild(canvas);
    document.body.appendChild(div);

    return {"ctx": ctx, "div" : div};
}
