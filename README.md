# Syncss

A lightweight SASS starter for swiftly crafting design systems, tailored to reflect your design rules.

The principle of Syncss is to isolate all the rules governing your design system into a readily accessible configuration. All the framework's code is available directly within your codebase, allowing you to easily edit it according to your needs.

`config/borders.scss` contains the `$defaultRadius` variable. If you change this value, they will impact a lot of visual element (like form input or buttons). This the same thing with `$defaultSize` for border size or with `$primary` variable in `config/colors.scss`.

## Installation

```
npm install syncss
```

## Concepts



## Configuration

Initially, I encourage you to browse the files contained in the 'config' folder and input your spacing values, color palette, typographies, and so on.

### Exemple:
With ths default `config/spaces.scss` configuration `$spaceValue` is equal to `5px` and `$regulatedMultiplicators` set the multiples of this value available in your design system. With this configuration we have this table of available spaces:

| Key | Multiples | Value |
| :-: |:-:| :-:|
| 0 | 0 | 0px |
| 1 | 1 | 5px |
| 2 | 2 | 10px |
| 3 | 3 | 15px |
| 4 | 4 | 20px |
| 5 | 6 | 30px |
| 6 | 10 | 50px |
| 7 | 20 | 100px |
| 8 | 40 | 200px |

If you put `$spaceValue: 0.2em;` and `$regulatedMultiplicators: 0, 1, 2, 3, 4, 5, 7, 10, 15, 20;` in your config this table will automatically updated to (note: add multiplicators will create a new key):
| Key | Multiples | Value |
| :-: |:-:| :-:|
| 0 | 0 | 0em |
| 1 | 1 | 0.2em |
| 2 | 2 | 0.4em |
| 3 | 3 | 0.6em |
| 4 | 4 | 0.8em |
| 5 | 5 | 1em |
| 6 | 7 | 1.4em |
| 7 | 10 | 2em |
| 8 | 15 | 3em |
| 9 | 20 | 4em |

## Helper

When your rules match your design system, helpers will produce for you design token usable every where in your project.

### Exemple:
With the available spacing configuration explained above, we can build more complex rules like the object in `$config` variable of `config/spaces.scss`. This will produce design token like `m-[key]` (`m-0`, `p-2`, `mt-6`, `px-8`, ...) and this with responsiveness if need.

```
// config/spaces.scss

$config: (
  get(0), // key 0
  get(1), // key 1
  get(2), // key 2
  ( // key 3
    "mobile": get(2),
    "tablet": get(3),
  ),
  ( // key 4
    "mobile": get(3),
    "tablet": get(4),
  ),
  ( // key 5
    "mobile": get(4),
    "tablet": get(5),
  ),
  ( // key 6
    "mobile": get(5),
    "tablet": get(6),
  ),
  ( // key 7
    "mobile": get(5),
    "tablet": get(6),
    "desktop": get(7),
  ),
  ( // key 8
    "mobile": get(6),
    "tablet": get(7),
    "desktop": get(8),
  )
);
```

So with this configuration `m-1` will create a 5px margin and `pt-8` a responsive padding-top (50px on mobile, 100px on tablet and 200px on desktop).

## Componant

This folder contain basic structure for more complexe visual element.

### Exemple:

## Contact

### Author

### Issues