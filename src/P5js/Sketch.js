import React, { useEffect } from "react";
import * as p5 from "p5";

const MySketch = () => {
  const Sketch = (p5) => {
    let companyName;
    let beforeandafter;
    let baf = "Before";
    let before = "Before";
    let after = "After";
    let colorPicker;
    let button;
    let img;
    let img2;
    let smaller;
    let input;
    let input2;
    let nextImage = false;
    let textSize;
    let slider;

    // Click and Drag an object
    // Daniel Shiffman <http://www.shiffman.net>

    class Draggable {
      constructor(str, x, y, w, h, textSize) {
        this.dragging = false; // Is the object being dragged?
        this.rollover = false; // Is the mouse over the ellipse?
        this.str = str;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.offsetX = 0;
        this.offsetY = 0;
      }

      over() {
        // Is mouse over object
        if (
          p5.mouseX > this.x &&
          p5.mouseX < this.x + this.w &&
          p5.mouseY > this.y &&
          p5.mouseY < this.y + this.h
        ) {
          this.rollover = true;
        } else {
          this.rollover = false;
        }
      }

      update(baf) {
        // Adjust location if being dragged
        if (this.dragging) {
          this.x = p5.mouseX + this.offsetX;
          this.y = p5.mouseY + this.offsetY;
        }
        if (baf) {
          this.str = baf;
        }
      }

      show(str) {
        p5.stroke(0);
        // Different fill based on state
        if (this.dragging) {
          p5.fill(50);
        } else if (this.rollover) {
          p5.fill(100);
        } else {
          p5.fill(175, 200);
        }
        p5.fill(colorPicker.color());
        p5.text(this.str, this.x, this.y, this.w, this.h);

        p5.textSize(textSize);
      }

      pressed() {
        // Did I click on the rectangle?
        if (
          p5.mouseX > this.x &&
          p5.mouseX < this.x + this.w &&
          p5.mouseY > this.y &&
          p5.mouseY < this.y + this.h
        ) {
          this.dragging = true;
          // If so, keep track of relative location of click to corner of rectangle
          this.offsetX = this.x - p5.mouseX;
          this.offsetY = this.y - p5.mouseY;
        }
      }

      released() {
        // Quit dragging
        this.dragging = false;
      }
    }

    p5.preload = () => {
      //   img = loadImage("before.jpg");
      // img2= loadImage("after.jpg");
      //load Gif
      smaller = p5.loadImage("fairy.gif");
    };

    p5.setup = () => {
      // p5.background(0);
      p5.createCanvas(480, 270).parent("canvasheading");

      // buffer = p5.createGraphics(1920, 1080);
      p5.frameRate(30);

      // input before and after images
      input = p5.createFileInput(p5.handleFile);
      input.position(0, 750);
      input2 = p5.createFileInput(p5.handleFile2);
      input2.position(200, 750);

      //create button to reset animation/frame rate
      button = p5.createButton("Replay");
      button.position(0, p5.height + 100);
      button.mouseClicked(p5.clicked);

      //create button to record

      //create slider for text size
      slider = p5.createSlider(0, 80, 50);
      slider.position(0, p5.height + 50);

      //create text fields

      //create dragable objects with font and color
      let cnt = "Pixie Dust";
      // let cntWidth = p5.textWidth(cnt);
      companyName = new Draggable(cnt, 10, 10, 200, 100, textSize);
      beforeandafter = new Draggable(baf, 10, 200, 100, 100, textSize);
      p5.textFont("Dancing Script");
      colorPicker = p5.createColorPicker("#ed225d");
      colorPicker.position(0, p5.height + 5);
    };

    p5.clicked = () => {
      console.log("button pressed");
      p5.frameCount = 0;
      smaller.reset();
      nextImage = false;
    };

    p5.draw = () => {
      p5.scale(0.25);
      p5.background(255);
      textSize = slider.value();
      if (img) {
        p5.image(img, 0, 0, 1920, 1080);

        if (p5.frameCount === 60) {
          nextImage = true;
        }

        if (nextImage) {
          p5.image(img2, 0, 0, 1920, 1080);
        }
      }

      let frame = smaller.getCurrentFrame();
      if (p5.frameCount <= 120) {
        p5.image(smaller, 0, 0, 1920, 1080);
        p5.text(frame, 1920 / 2, 1080 / 2);
      }
      p5.scale(4);
      if (p5.frameCount >= 60) {
        baf = after;
      } else {
        baf = before;
      }
      companyName.over();
      companyName.update();
      companyName.show();

      beforeandafter.over();
      beforeandafter.update(baf);
      beforeandafter.show();
    };

    p5.mousePressed = () => {
      companyName.pressed();
      beforeandafter.pressed();
    };

    p5.mouseReleased = () => {
      companyName.released();
      beforeandafter.released();
    };

    p5.handleFile = (file) => {
      p5.print(file);
      if (file.type === "image") {
        img = p5.loadImage(file.data, "");

        //img.hide();
      }
    };
    p5.handleFile2 = (file) => {
      p5.print(file);
      if (file.type === "image") {
        img2 = p5.loadImage(file.data, "");
        //img2.hide();
      } else {
        img2 = null;
      }
    };
  };

  useEffect(() => {
    new p5(Sketch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default MySketch;
