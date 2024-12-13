import CanvasItem from './CanvasItem.js';

export default class PasswordArray extends CanvasItem {
  public goodPasswords: string[];

  public badPasswords: string[];

  public passwordArray: {goodPasswords: string[], badPasswords: string[]};

  public constructor() {
    super();

    this.goodPasswords = [
      'Ast3roid',
      'Sp@ceR0ck',
      'M00nL@nd',
      'Stell@r8!',
      'Nebul@r2',
      'Qu@sr!',
      'Cosm!c12',
      'Galaxy9!',
      'Orbit@l3',
      'Plut0!d',
      'Spac3W@lk',
      'S@turn5!',
      'ExoPl@n3t',
      'Bl@ckH0le',
      'C0sm1cL!ght',
      'Gr@v1t@t3',
      'Lun@rR0v3r',
      'Sol@rW1nd',
      'Ast3r0!d',
      'M@rsR0ck',
      'C0sm0s!',
      'Jup!ter9',
      'V0yd9!',
      'Int3rst3ll@r',
      'Sp@ceDust!'
    ];

    this.badPasswords = [
      'Space1',
      'StarrySky',
      'Galaxy123',
      'Planet1',
      'Moonlight',
      'Spaceship',
      'Astronaut',
      'Nebula321',
      'Solar123',
      'StarWars',
      'Comet567',
      'BlackHole!',
      'Universe',
      'RocketShip',
      'Gravity',
      'MilkyWay1',
      'Cosmic',
      'Sun123',
      'Nebula',
      'Star123',
      'Satellite',
      'Meteor',
      'Celestial',
      'Orbital1',
      'SpaceTime'
    ];
    this.passwordArray = {
      goodPasswords: this.goodPasswords,
      badPasswords: this.badPasswords
    };
  }
}
