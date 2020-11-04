import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Movabale Box Generator';
  Boxes: any = [];
  selectedBox: any;
  SquareFocusedId: number;
  IsSquareFocused: boolean;
  pixelCounter: number = 25;
  subscription: Subscription;
  // private ListenToKeyEvents = new BehaviorSubject<boolean>(true);
  // private IsListenToKeyEvents = this.ListenToKeyEvents.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    // this.init();
  }

  ngAfterViewInit() {
    this.KeyListener(true);
  }

  // init() {
  //   this.subscription = this.IsListenToKeyEvents.subscribe((IsToggle) => {
  //     console.log(`IsToggle`, IsToggle);

  //     return IsToggle;
  //   });
  // }

  OnToggleKeyListen(_ev: boolean) {
    console.log(`ev`, _ev);
    _ev ? this.KeyListener(_ev) : this.UnListener();
    // this.IsListenToKeyEvents.next(_ev);
  }

  UnListener() {
    console.log(`UnListener`);

    this.document.removeEventListener('keydown', function (_ev) {
      console.log(`Keys are OFF`);
    });
  }

  /**
   * KeyListener: Function for the listening key events.
   */

  KeyListener(IsListen: boolean) {
    let global = this;

    let listen = this.document.addEventListener('keydown', function (_ev) {
      let KeyPressed = _ev.key ? _ev.key : null;
      console.log(`Keys are ON`);

      let IsDelete = KeyPressed === 'Delete' && global.IsSquareFocused;
      let IsLeft = KeyPressed === 'ArrowLeft' && global.IsSquareFocused;
      let IsRight = KeyPressed === 'ArrowRight' && global.IsSquareFocused;
      let IsDown = KeyPressed === 'ArrowDown' && global.IsSquareFocused;
      let IsUp = KeyPressed === 'ArrowUp' && global.IsSquareFocused;

      if (IsDelete) {
        global.onDeleteBox();
      } else if (IsLeft) {
        global.BoxToLeft();
      } else if (IsRight) {
        global.BoxToRight();
      } else if (IsUp) {
        global.BoxToUp();
      } else if (IsDown) {
        global.BoxToDown();
      }
    });

    console.log(`listen`, listen);

    //  else {
    //   this.document.removeEventListener('keydown', () => {
    //     console.log(`Keys are OFF`);

    //   });
    // }
  }

  /**
   * BoxToLeft: Function to Move Box to Left
   */

  BoxToLeft() {
    let selectedStyle = this.selectedBox?.style;
    let pixels = selectedStyle.right?.split('px')[0];

    selectedStyle.right = `${Number(pixels) + this.pixelCounter}px`;
    // console.log(`selectedStyle.right`, selectedStyle.right);

    // Decrease Left
    let SelectedLeft = selectedStyle.left?.split('px')[0];
    selectedStyle.left = `${Number(SelectedLeft) - this.pixelCounter}px`;
  }

  /**
   * BoxToUp: Function to Move Box to Upper side
   */

  BoxToUp() {
    let selectedStyle = this.selectedBox?.style;
    let pixels = selectedStyle.bottom?.split('px')[0];
    selectedStyle.bottom = `${Number(pixels) + this.pixelCounter}px`;

    // Decrease Top
    let SelectedTop = selectedStyle.top.split('px')[0];
    selectedStyle.top = `${Number(SelectedTop) - this.pixelCounter}px`;
  }

  /**
   * BoxToRight: Function to Move Box to Right
   */

  BoxToRight() {
    let selectedStyle = this.selectedBox?.style;
    let pixels = selectedStyle.left?.split('px')[0];

    selectedStyle.left = `${Number(pixels) + this.pixelCounter}px`;
    // console.log(`selectedStyle.left`, selectedStyle.left);

    // Decrease Right
    let SelectedRight = selectedStyle.right.split('px')[0];
    selectedStyle.right = `${Number(SelectedRight) - this.pixelCounter}px`;
  }

  /**
   * BoxToDown: Function to Move Box to Bottom
   */

  BoxToDown() {
    let selectedStyle = this.selectedBox?.style;
    let pixels = selectedStyle.top?.split('px')[0];
    selectedStyle.top = `${Number(pixels) + this.pixelCounter}px`;
    // console.log(`selectedStyle.top`, selectedStyle.top);

    // Decrease Right
    let SelectedBottom = selectedStyle.bottom.split('px')[0];
    selectedStyle.bottom = `${Number(SelectedBottom) - this.pixelCounter}px`;
  }

  /**
   * onDeleteBox: Function to Delete box from DOM
   */

  onDeleteBox() {
    this.selectedBox.remove();
  }

  /**
   * Clear: Function to Clear array containing Boxex
   */

  Clear() {
    this.Boxes.length = 0;
  }

  /**
   * OnBox: Function to Detect the box HTMLElement for movement
   */
  OnBox(id: number) {
    this.SquareFocusedId = id;
    this.IsSquareFocused = true;
    let FocusedBox = document.getElementById(`${id}`);
    this.selectedBox = FocusedBox;
  }

  /**
   * AddBox: Function to add box to DOM
   */

  AddBox() {
    try {
      let Id = this.onGeneratePassword();
      this.Boxes.push(Id);
    } catch (e) {
      console.log('Error catched in Addbox', e);
    }
  }

  /**
   * onGeneratePassword: Function to generate unique box Id.
   */

  onGeneratePassword() {
    return Math.round(Date.now() + Math.random());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
