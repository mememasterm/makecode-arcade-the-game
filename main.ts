namespace SpriteKind {
    export const Sign = SpriteKind.create()
    export const enemy1 = SpriteKind.create()
    export const chest = SpriteKind.create()
    export const enemy2 = SpriteKind.create()
}
function spawnSign () {
    for (let value of tiles.getTilesByType(assets.tile`signPost`)) {
        sign1 = sprites.create(assets.image`sign1`, SpriteKind.Sign)
        tiles.placeOnTile(sign1, value)
        tiles.setTileAt(value, assets.tile`myTile`)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    hero.z = 200
})
function spawnThings () {
    spawnPlayer()
    spawnSign()
    spawnEnemy1()
    spawnEnemy2()
}
function spawnEnemy2 () {
    for (let value of tiles.getTilesByType(assets.tile`myTile0`)) {
        dragon = sprites.create(assets.image`dragon`, SpriteKind.enemy2)
        tiles.placeOnTile(dragon, value)
        tiles.setTileAt(value, assets.tile`myTile`)
    }
}
function spawnEnemy1 () {
    for (let value2 of tiles.getTilesByType(assets.tile`enemy1`)) {
        bat = sprites.create(assets.image`Bat`, SpriteKind.enemy1)
        tiles.placeOnTile(bat, value2)
        tiles.setTileAt(value2, assets.tile`myTile`)
        bat.setBounceOnWall(true)
        bat.vy = 50
    }
}
function spawnPlayer () {
    for (let value3 of tiles.getTilesByType(sprites.dungeon.collectibleBlueCrystal)) {
        hero = sprites.create(assets.image`mushroom`, SpriteKind.Player)
        controller.moveSprite(hero)
        hero.setStayInScreen(true)
        scene.cameraFollowSprite(hero)
        tiles.placeOnTile(hero, value3)
        tiles.setTileAt(value3, assets.tile`myTile`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.enemy1, function (sprite, otherSprite) {
	
})
function spawnTreasureChest () {
    for (let value of tiles.getTilesByType(assets.tile`chest`)) {
        treasureChest = sprites.create(assets.image`treasureChest`, SpriteKind.chest)
        tiles.placeOnTile(treasureChest, value)
        tiles.setTileAt(value, assets.tile`myTile`)
    }
}
let laserBeam: Sprite = null
let treasureChest: Sprite = null
let bat: Sprite = null
let dragon: Sprite = null
let hero: Sprite = null
let sign1: Sprite = null
game.splash("Make Code Arcade: The Game")
game.showLongText("Welcome! In this game you play as a mushroom guy who has to fight enemies and try to find a way out of the castle. To move use WASD and press space to go faster. Space is also select/interact.", DialogLayout.Center)
tiles.setCurrentTilemap(tilemap`level0`)
spawnThings()
spawnEnemy1()
scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.OnlyHorizontal)
game.onUpdateInterval(2000, function () {
    for (let value of sprites.allOfKind(SpriteKind.enemy2)) {
        laserBeam = sprites.createProjectileFromSprite(assets.image`attack_`, dragon, 50, 0)
        laserBeam.setFlag(SpriteFlag.GhostThroughWalls, true)
        laserBeam.setFlag(SpriteFlag.AutoDestroy, true)
        laserBeam.follow(hero, 1000)
    }
})
