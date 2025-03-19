@namespace
class SpriteKind:
    Sign = SpriteKind.create()
    enemy1 = SpriteKind.create()
def spawnSign():
    global sign1
    for value in tiles.get_tiles_by_type(assets.tile("""
        signPost
    """)):
        sign1 = sprites.create(assets.image("""
            sign1
        """), SpriteKind.Sign)
        tiles.place_on_tile(sign1, value)
        tiles.set_tile_at(value, assets.tile("""
            myTile
        """))

def on_a_pressed():
    hero.vx = 200
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def spawnThings():
    spawnPlayer()
    spawnSign()
    spawnEnemy1()
def spawnEnemy1():
    global bat
    for value2 in tiles.get_tiles_by_type(assets.tile("""
        enemy1
    """)):
        bat = sprites.create(assets.image("""
            Bat
        """), SpriteKind.enemy1)
        tiles.place_on_tile(bat, value2)
        tiles.set_tile_at(value2, assets.tile("""
            myTile
        """))
        bat.set_bounce_on_wall(True)
        bat.vy = 50
def spawnPlayer():
    global hero
    for value3 in tiles.get_tiles_by_type(sprites.dungeon.collectible_blue_crystal):
        hero = sprites.create(assets.image("""
            mushroom
        """), SpriteKind.player)
        controller.move_sprite(hero)
        hero.set_stay_in_screen(True)
        scene.camera_follow_sprite(hero)
        tiles.place_on_tile(hero, value3)
        tiles.set_tile_at(value3, assets.tile("""
            myTile
        """))

def on_on_overlap(sprite, otherSprite):
    pass
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy1, on_on_overlap)

bat: Sprite = None
hero: Sprite = None
sign1: Sprite = None
scene.set_background_image(assets.image("""
    background
"""))
game.splash("Make Code Arcade: The Game")
game.show_long_text("Welcome! In this game you play as a mushroom guy who has to fight enemies and try to find a way out of the castle. To move use WASD and press space to go faster. Space is also select/interact.",
    DialogLayout.CENTER)
tiles.set_current_tilemap(tilemap("""
    level0
"""))
spawnThings()
spawnEnemy1()
scroller.scroll_background_with_camera(scroller.CameraScrollMode.ONLY_HORIZONTAL)