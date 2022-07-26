import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import { Container, Sprite } from 'pixi.js';


const WORLD_WIDTH = 1920;
const WORLD_HEIGHT = 1080;
const STICKER_COLOR = 0x60D4AE;


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
    interaction: app.renderer.plugins.interaction // is important
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




//render border
border(viewport)

function border(viewport) {
    const line = viewport.addChild(new PIXI.Graphics());
    line.lineStyle(10, 0xff0000)
        .drawRect(0, 0, viewport.worldWidth, viewport.worldHeight);
}


//create sticker in clicked point
viewport.on('clicked', (event) => {createSticker(viewport, event)});

function createSticker(viewport, event) {
    const pos = event.world;
    const stickerContainer = new Container();
    stickerContainer.buttonMode = true;
    stickerContainer.interactive = true;
    stickerContainer.name = "stickerContainer";
    stickerContainer.x = pos.x;
    stickerContainer.y = pos.y;


    let sticker = new PIXI.Sprite(PIXI.Texture.WHITE);
    sticker.name = "stickerSprite";
    stickerContainer.addChild(sticker);
    sticker.tint = STICKER_COLOR;
    sticker.width = sticker.height = 100;

    

    //drag'n'drop local realization 
    stickerContainer.on('pointerdown', function (e) {
        viewport.pause = true;  
        stickerContainer.dragging = true;
        //put container on top
        stickerContainer.parent.addChild(stickerContainer);
    
    });
    stickerContainer.on('pointermove', function (e) {
        if (stickerContainer.dragging) {
            const cdr = viewport.toWorld(e.data.global.x, e.data.global.y);
            stickerContainer.x = cdr.x - 5;
            stickerContainer.y = cdr.y - 5;
        }
    });
    stickerContainer.on('pointerup', function (e) {
        const cdr = viewport.toWorld(e.data.global.x, e.data.global.y);
        stickerContainer.x = cdr.x - 5;
        stickerContainer.y = cdr.y - 5;
        stickerContainer.dragging = false;
        viewport.pause = false;


    });

    //render sticker border
    const stickerBorder = stickerContainer.addChild(new PIXI.Graphics());
    stickerBorder.name = "border";
    const rect = sticker.getBounds();
    stickerBorder.lineStyle(2, 0x000000)
        .drawRect(0, 0, sticker.width, sticker.height);



    viewport.addChild(stickerContainer);
    console.log(stickerContainer);
}




