var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer');

var mainState = {
  preload: function () {
    game.stage.backgroundColor = '#03A9F4';
    game.load.image('player', 'assets/yoshis.png');
    game.load.image('mario', 'assets/mario.png'); 
    game.load.image('ground', 'assets/ground.png');
  },
  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Create the YOSHIS
    this.player = this.game.add.sprite(100, game.world.height-200, 'player');
    game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 1000; 
    //this.player.body.bounce.y = 0.5;
    this.player.body.collideWorldBounds = true;
    this.player.scale.setTo(0.5, 0.5);

    // Create the baby mario
    this.mario = this.game.add.sprite(100, 100, 'mario');
    game.physics.arcade.enable(this.mario);
    this.mario.body.gravity.y = 1000;
    this.mario.body.collideWorldBounds = true;
    this.mario.scale.setTo(0.5, 0.5);


    this.platforms = game.add.group();
    this.platforms.enableBody = true;
    this.ground = [];
    for (var i = 0; i < game.world.width; i+=70) {
      this.ground.push(this.platforms.create(i, game.world.height - 70, 'ground'));
    }
    this.platforms.forEach(function(platform) {
      platform.body.immovable = true;
    });
    
  },
  update: function () {
    for (var i = 0; i < this.ground.length; i++) {
      game.physics.arcade.collide(this.player, this.ground[i]);
      game.physics.arcade.collide(this.mario, this.ground[i]);
    }
    this.player.body.velocity.x = 0;

    var cursors = game.input.keyboard.createCursorKeys();
    if (cursors.left.isDown)
    {
        this.player.body.velocity.x = -300;
    }
    else if (cursors.right.isDown)
    {
        this.player.body.velocity.x = 300;
    }
    // if (cursors.up.isDown && this.player.body.touching.down)
    // {
    //     this.player.body.velocity.y = -800;
    // }
  }
};

game.state.add('main', mainState);
game.state.start('main');
