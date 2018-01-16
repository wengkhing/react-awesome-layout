# React Awesome Layout

This library provide smart, syntactic component to allow developers to easily and intuitively create responsive and adaptive layouts using Flexbox CSS.

## Usage

```html
<Block layout='row' gutter='8px' wrap>
  <div>Col 1</div>
  <Block layout='row' basis='fill'>
    <div basis='fill'>Nest 1</div>
    <div>Nest 2</div>
  </Block>
  <div>Col 2</div>
</Block>
```

### API for Block
Default value will be used if none provided

| API | Allowed Values |
|---|---|
| layout | `row \| column \| row-reverse \| column-reverse`<br>Default: `row`|
| wrap | `true \| false \| down \| up \| reverse \| none`<br>Default: `none` |
| align | `<main-axis> <cross-axis>`<br>main-axis: `start | end | center | around | between`<br>cross-axis: `start | end | center | stretch | baseline`<br>Default: `start start` |
| basis | Length of main-axis in `px | % | vw | vh`<br>Default: `100%`<br>Behaviour: Take up as much width as possible |
| xBasis | Also known as cross-basis, is the length of cross-axis in  `px | % | vw | vh`<br>Default: `auto`<br>Behaviour: Take as little space as needed by the block |
| gutter | Gutter space between child defined in `px` |

#### Please take note
When layout is `row | row-reverse`, main-axis is width and cross-axis is height;
When layout is `column | column-reverse`, main-axis is height and cross-axis is width.

### API for child of Block

| API | Allowed Values |
|---|---|
| basis | `fill | auto | px | % | vw | vh`<br>Default: `auto` |
| xBasis | `auto | px | % | vw | vh`<br>Default: `auto` |
| alignSelf | `start | end | center | stretch | baseline | auto`<br>Default: `auto` |
| order | integer value<br>Default: `0` |
