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

  KeyListener() {

    let global = this;

    this.document.addEventListener('keydown', function (ev) {
      let KeyPressed = ev.key ? ev.key : null;

      let IsDelete = KeyPressed === 'Delete' && global.IsSquareFocused;
      let IsLeft = KeyPressed === 'ArrowLeft' && global.IsSquareFocused;
      let IsRight = KeyPressed === 'ArrowRight' && global.IsSquareFocused;
      let IsDown = KeyPressed === 'ArrowDown' && global.IsSquareFocused;
      let IsUp = KeyPressed === 'ArrowUp' && global.IsSquareFocused;

      switch (IsDelete) {
        case true: global.onDeleteBox();

          break;

        default:
          break;
      }
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

  BoxToLeft() {

    let selectedStyle = this.selectedBox?.style;
    let pixels = selectedStyle.right?.split('px')[0];

    selectedStyle.right = Number(pixels) + this.pixelCounter + 'px';
    // console.log(`selectedStyle.right`, selectedStyle.right);

    // Decrease Left
    let SelectedLeft = selectedStyle.left.split('px')[0];
    selectedStyle.left = Number(SelectedLeft) - this.pixelCounter + 'px';
  }

  BoxToUp() {

    let selectedStyle = this.selectedBox?.style;
    let pixels = selectedStyle.bottom?.split('px')[0];
    selectedStyle.bottom = Number(pixels) + this.pixelCounter + 'px';

    // Decrease Top
    let SelectedTop = this.selectedBox.style.top.split('px')[0];
    selectedStyle.top = Number(SelectedTop) - this.pixelCounter + 'px';
  }

  BoxToRight() {

    let selectedStyle = this.selectedBox?.style;
    let pixels = selectedStyle.left?.split('px')[0];

    selectedStyle.left = Number(pixels) + this.pixelCounter + 'px';
    // console.log(`selectedStyle.left`, selectedStyle.left);

    // Decrease Right
    let SelectedRight = selectedStyle.right.split('px')[0];
    selectedStyle.right = Number(SelectedRight) - this.pixelCounter + 'px';
  }

  BoxToDown() {

    let selectedStyle = this.selectedBox?.style;
    let pixels = selectedStyle.top?.split('px')[0];
    selectedStyle.top = Number(pixels) + this.pixelCounter + 'px';
    // console.log(`selectedStyle.top`, selectedStyle.top);

    // Decrease Right
    let SelectedBottom = selectedStyle.bottom.split('px')[0];
    selectedStyle.bottom = Number(SelectedBottom) - this.pixelCounter + 'px';
  }

  onDeleteBox() {
    this.selectedBox.remove();
  }

  Clear() {
    this.Boxes.length = 0;
  }

  OnBox(id: number) {
    this.SquareFocusedId = id;
    this.IsSquareFocused = true;
    let FocusedBox = document.getElementById(`${id}`);
    this.selectedBox = FocusedBox;
  }

  AddBox() {
    try {
      let Id = this.onGeneratePassword();
      this.Boxes.push(Id);
    } catch (e) {
      console.log('Error catched in Addbox', e);
    }
  }

  onGeneratePassword() {
    return Math.round(Date.now() + Math.random());
  }
}
