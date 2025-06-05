By the end of this article, you'll understand what this means:

```txt

```

### Introduction

What does `feColorMatrix` actually do? It takes the RGBA values of a single pixel, then performs a series of mathematical calculations using them to produce a new set of RGBA values. It does this for each pixel in the input image 

```svg
<feColorMatrix
    values="1 0 0 0 0,
            0 1 0 0 0,
            0 0 1 0 0,
            0 0 0 1 0"
/>
```