import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'

const WORLD_WIDTH = 1920;
const WORLD_HEIGHT = 1080;







const app = new PIXI.Application();
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
app.resizeTo = window;






document.body.appendChild(app.view)


    
PIXI.Loader.shared
  .add("images/background.jpg")




// create viewport

let viewport = new Viewport({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    worldWidth: WORLD_WIDTH,
    worldHeight: WORLD_HEIGHT,
    passiveWheel: false,
    interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
});


//zoom limit
viewport.clampZoom({
    maxHeight:   WORLD_HEIGHT,
    minHeight:  WORLD_HEIGHT / 10,
});

//bound from borders
viewport.bounce();


// add the viewport to the stage
app.stage.addChild(viewport)

// activate plugins
viewport
    .drag()
    .pinch()
    .wheel()
    //.decelerate()


//zooming to full board view, and centre it
viewport.fit();
viewport.moveCenter(WORLD_WIDTH / 2, WORLD_HEIGHT /2)


const background = new PIXI.Sprite(PIXI.Texture.from("images/background.png"));
viewport.addChild(background);
background.width = WORLD_WIDTH;
background.height = WORLD_HEIGHT;

// add a red box and drag and drop

//var for world position
let cdr;

const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
sprite.tint = 0xff0000;
sprite.width = sprite.height = 100;
sprite.position.set(100, 100);
sprite.interactive = true;

//drag'n'drop local realization
sprite.on('pointerdown', function (e) {
    viewport.pause = true;  
	sprite.dragging = true;

});
sprite.on('pointermove', function (e) {
	if (sprite.dragging) {
        cdr = viewport.toWorld(e.data.global.x, e.data.global.y);
        sprite.x = cdr.x - 5;
        sprite.y = cdr.y - 5;
	}
});
sprite.on('pointerup', function (e) {
    cdr = viewport.toWorld(e.data.global.x, e.data.global.y);
    sprite.x = cdr.x - 5;
    sprite.y = cdr.y - 5;
	sprite.dragging = false;
    viewport.pause = false;
});




sprite.buttonMode = true;
viewport.addChild(sprite);
//sprite.on('pointerdown', (event) => { alert('clikced') });

border(viewport)

function border(viewport) {
    const line = viewport.addChild(new PIXI.Graphics());
    line.lineStyle(10, 0xff0000).drawRect(0, 0, viewport.worldWidth, viewport.worldHeight);
}

