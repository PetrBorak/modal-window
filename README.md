modal-window
============

widget for setting up a modal window on your sites with possibility to define a callback on it.

Usage:
Initial contructor creates a new instance of Modal Class. 
Initial parametres are content of title, content of body of the modal and its width.

The instance shows the modal window object through its show method, which accepts two parametres:
  - left: this is the left distance from the left edge of the window
  - top: distance from the top of the window
  - 

One callback on each instance of a button in the modal instance can be defined througn method addCallback.
It is called with arbitrary number of arguments, which are initiated in the addButton method.
In the addButton method the first paramets is always the value of a label to the button and the rest are the arguments
that go to the callback function.

Callback function is triggered by the click event of a button.

