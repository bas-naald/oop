import Scene from './Scene.js';
import MouseListener from './MouseListener.js';
import KeyListener from './KeyListener.js';
import Screens from './Screens.js';
import BackButton from './BackButton.js';
import CanvasRenderer from './CanvasRenderer.js';
import PopUpMessage from './PopUpMessage.js';
import MenuButton from './MenuButton.js';
import MenuSearch from './MenuSearch.js';
import EmptySearchBar from './EmptySearchBar.js';
import Link from './Link.js';
import Download from './Download.js';
import MenuMessage from './MenuMessage.js';
import FilesGame from './FilesGame.js';

export default class VirusGame extends Scene {
  private nextGame: boolean = false;

  private screen: Screens;

  private backButton: BackButton;

  private popUpMessage: PopUpMessage;

  private menuButton: MenuButton;

  private menuButtonPressed: boolean = false;

  private popUpBoolean: boolean = true;

  private menuSearch: MenuSearch;

  private menuMessage: MenuMessage;

  private emptySearchBar: EmptySearchBar;

  private searchBarBoolean: boolean = false;

  private link: Link;

  private linkBoolean: boolean = false;

  private download: Download;

  private downloadBoolean: boolean = false;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.screen = new Screens(maxX, maxY);
    this.backButton = new BackButton(maxX, maxY);
    this.popUpMessage = new PopUpMessage(maxX, maxY);
    this.menuButton = new MenuButton(maxX, maxY);
  }

  public override processesInput(keylistener: KeyListener, mouselistener: MouseListener): void {
    this.cursor.movepos(mouselistener.getMousePosition().x, mouselistener.getMousePosition().y);
    if (!this.cursor.isCollidingWith(this.backButton)) {
      if (mouselistener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        this.popUpBoolean = true;
        this.menuButtonPressed = false;
        this.searchBarBoolean = false;
        this.linkBoolean = false;
        this.downloadBoolean = false;
        this.screen.image = CanvasRenderer.loadNewImage('assets/navigation.png');
      }
    } else if (!this.cursor.isCollidingWith(this.popUpMessage)) {
      if (mouselistener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        this.searchBarBoolean = false;
        this.popUpBoolean = false;
        this.linkBoolean = false;
        this.downloadBoolean = false;
        this.screen.image = CanvasRenderer.loadNewImage('assets/nasa.png');
      }
    } else if (!this.cursor.isCollidingWith(this.menuButton)) {
      if (mouselistener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        this.menuSearch = new MenuSearch(this.maxX, this.maxY);
        this.menuMessage = new MenuMessage(this.maxX, this.maxY);
        this.menuButtonPressed = !this.menuButtonPressed;
      }
    }

    if (this.menuButtonPressed) {
      if (!this.cursor.isCollidingWith(this.menuSearch)) {
        if (mouselistener.buttonPressed(MouseListener.BUTTON_LEFT)) {
          this.menuButtonPressed = false;
          this.popUpBoolean = false;
          this.linkBoolean = false;
          this.downloadBoolean = false;
          this.screen.image = CanvasRenderer.loadNewImage('assets/emptySearch.png');
          this.emptySearchBar = new EmptySearchBar(this.maxX, this.maxY);
          this.searchBarBoolean = true;
        }
      }
    }
    if (this.menuButtonPressed) {
      if (!this.cursor.isCollidingWith(this.menuMessage)) {
        if (mouselistener.buttonPressed(MouseListener.BUTTON_LEFT)) {
          this.menuButtonPressed = false;
          this.popUpBoolean = false;
          this.linkBoolean = false;
          this.searchBarBoolean = false;
          this.downloadBoolean = false;
          this.screen.image = CanvasRenderer.loadNewImage('assets/nasa.png');
        }
      }
    }
    if (this.emptySearchBar) {
      if (!this.cursor.isCollidingWith(this.emptySearchBar)) {
        if (mouselistener.buttonPressed(MouseListener.BUTTON_LEFT)) {
          this.menuButtonPressed = false;
          this.popUpBoolean = false;
          this.searchBarBoolean = false;
          this.downloadBoolean = false;
          this.screen.image = CanvasRenderer.loadNewImage('assets/search.png');
          this.link = new Link(this.maxX, this.maxY);
          this.linkBoolean = true;
        }
      }
    }
    if (this.linkBoolean) {
      if (!this.cursor.isCollidingWith(this.link)) {
        if (mouselistener.buttonPressed(MouseListener.BUTTON_LEFT)) {
          this.menuButtonPressed = false;
          this.popUpBoolean = false;
          this.searchBarBoolean = false;
          this.linkBoolean = false;
          this.screen.image = CanvasRenderer.loadNewImage('assets/linkOpened.png');
          this.download = new Download(this.maxX, this.maxY);
          this.downloadBoolean = true;
        }
      }
    }
    if (this.downloadBoolean) {
      if (!this.cursor.isCollidingWith(this.download)) {
        if (mouselistener.buttonPressed(MouseListener.BUTTON_LEFT)) {
          this.nextGame = true;
        }
      }
    }
  }

  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.fillRectangle(canvas, 0, 0, this.maxX, this.maxY, 'white');
    this.screen.render(canvas);

    this.menuButton.render(canvas);
    this.backButton.render(canvas);
    if (this.popUpBoolean) {
      this.popUpMessage.render(canvas);
    }
    if (this.searchBarBoolean) {
      this.emptySearchBar.render(canvas);
    }
    if (this.menuButtonPressed) {
      this.menuSearch.render(canvas);
      this.menuMessage.render(canvas);
    }
    if (this.linkBoolean) {
      this.link.render(canvas);
    }
    if (this.downloadBoolean) {
      this.download.render(canvas);
    }

    this.cursor.render(canvas);
  }

  public override nextScene(): Scene {
    if (this.nextGame) {
      return new FilesGame(this.maxX, this.maxY);
    }
    return null;
  }
}
