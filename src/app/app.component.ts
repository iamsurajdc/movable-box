import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

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

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.KeyListener();
  }

  /**
   * KeyListener: Function for the listening key events.
   */

  KeyListener() {
    let global = this;

    this.document.addEventListener('keydown', function (ev) {
      let KeyPressed = ev.key ? ev.key : null;

      let IsDelete = KeyPressed === 'Delete' && global.IsSquareFocused;
      let IsLeft = KeyPressed === 'ArrowLeft' && global.IsSquareFocused;
      let IsRight = KeyPressed === 'ArrowRight' && global.IsSquareFocused;
      let IsDown = KeyPressed === 'ArrowDown' && global.IsSquareFocused;
      let IsUp = KeyPressed === 'ArrowUp' && global.IsSquareFocused;

      if (IsDelete) {
        // global.onDeleteBox();
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
    let SelectedLeft = selectedStyle.left.split('px')[0];
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
    let SelectedTop = this.selectedBox.style.top.split('px')[0];
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
    selectedStyle.top = Number(pixels) + this.pixelCounter + 'px';
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
}
