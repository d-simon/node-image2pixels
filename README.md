node-image2pixels
============

Opens and converts image to pixels

## Usage

**Syntax:** image2pixels **(** `imagePath`, [`options`], `callback` **)**

### Arguments

 * `imagePath` *String*
 The path to the input image.
 * `options`    *Object*  (optional)
 The options object.
 * `callback`    *Function*
 The callback function wich receives `err`, `output`
   * `err` - if there was an error otherwise this will be *null*
   * `output` - *node-gd object* or array of row objects

##Example usage:

Taken from the [example/example.js][https://github.com/d-simon/node-image2pixels/blob/master/example/index.js]

```javascript
var image2pixels = require('../index.js')
  , _ = require('underscore')
  , fs = require('fs');


// Output first row to json
image2pixels('input.jpg', // { GD: false } // default
    function (err, output) {
        if(err) console.log(err);
        fs.writeFile('output-first-row.json', JSON.stringify(output.slice(0,1), undefined, 2), 'utf8', function (err) {
            if(err) console.log(err);
        });
    });


// Save Image as png
image2pixels('input.jpg', { GD: true },
    function (err, output) {
        if(err) console.log(err);
        output.savePng('output.png', 0, function (err)
        {
            if(err) console.log(err);
        });
    });

// Recreate the "sorted pixels" effect from node-pixel-sort
image2pixels('input.jpg', { GD: true, pixelsCallback: sortPixels },
    function (err, output) {
        if(err) console.log(err);
        output.savePng('output-sorted.png', 0, function (err)
        {
            if(err) console.log(err);
        });
    });

function sortPixels (pixels) {
    var height = pixels.length
      , width = pixels[0].length
      , sortedpixels = _.sortBy(_.flatten(pixels), function (pixel) {
            return pixel.red + pixel.green + pixel.blue;
        })
      , output = []
    for(var i = 0; i < height; i++) {
        output.push([]);
        for(var j = 0; j < width; j++) {
            var pixel = sortedpixels[i*width + j]
            output[i].push(pixel);
        }
    }
    return output;
}
```