const app = new PIXI.Application({                  
    antialias: true, 
    transparent: false, 
    resolution: 1
});

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
app.resizeTo = window;



document.body.appendChild(app.view);



//all global vars
let state, board, background, sceneContainer, sceneBorderX, sceneBorderY;
sceneBorderX = 2000;
sceneBorderY = 2000; 
  

//load an image and run the `setup` function when it's done
PIXI.Loader.shared
  .add("images/background.jpg")
  .load(setup);




//This `setup` function will run when the image has loaded
function setup() {

  const background = new PIXI.Sprite(PIXI.Loader.shared.resources["images/background.jpg"].texture);

  app.stage.addChild(background);

  sceneContainer = new PIXI.Container();
  sceneContainer.pivot.set(sceneBorderX/2, sceneBorderY/2);
  sceneContainer.addChild(background);

  app.stage.addChild(sceneContainer);

}

