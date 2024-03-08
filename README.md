<img src="https://github.com/Jordan-Dey/Syncss/assets/143161975/2358d2eb-0e25-4f0e-a34a-657b739d00e8" width="250">

# Syncss

A lightweight SASS starter for swiftly crafting design systems, tailored to reflect your design rules.

The principle of Syncss is to isolate all the rules governing your design system into a readily accessible configuration. All the framework's code is available directly within your codebase, allowing you to easily edit it according to your needs.

`config/borders.scss` contains the `$default-radius` variable. If you change this value, it will impact many visual elements (such as form inputs or buttons). The same applies to the `$default-size` variable for border size or the `$primary` variable in `config/colors.scss`.

![image](https://github.com/Jordan-Dey/Syncss/assets/143161975/47a26c7c-9ffd-45fe-9293-9820fb3bd254)

## Installation

```
npm install syncss --save-dev
```

## Concepts

Syncss is based on a simple concept, split into three parts:
- Simple **configuration**: where we can easily change the rules of your design system.
- Accessible **helpers**: to use your configuration everywhere.
- Synchronized **components**: to create more complex elements, based on helpers and/or configuration.

![image](https://github.com/Jordan-Dey/Syncss/assets/143161975/990f7792-70f2-47be-a17a-c2e519a67c60)

## Configuration

Initially, I encourage you to browse the files contained in the 'config' folder and input your spacing values, color palette, typographies, and so on.

### Example:
With the default `config/spaces.scss` configuration, `$space-value` is equal to `5px` and `$regulated-multiplicators` sets the multiples of this value available in your design system. With this configuration, we have this table of available spaces:

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

If you put `$space-value: 0.2em;` and `$regulated-multiplicators: 0, 1, 2, 3, 4, 5, 7, 10, 15, 20;` in your config, this table will automatically update to (note: adding multiplicators will create a new key):
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

When your rules match your design system, helpers will produce design tokens usable everywhere in your project.

### Example:
With the available spacing configuration explained above, we can build more complex rules like the object in the `$config` variable of `config/spaces.scss`. This will produce design tokens like `m-[key]` (`m-0`, `p-2`, `mt-6`, `px-8`, ...) and this with responsiveness if needed.

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

So with this configuration, m-1 will create a 5px margin, and pt-8 will create a responsive padding-top (50px on mobile, 100px on tablet, and 200px on desktop).

## Component

This folder contains basic structures for more complex visual elements. Components can use design tokens created before and read some values from the configuration. They can be used on multiple HTML tags (they do not impact semantics) and can apply in-place styles for children elements.

Like in a design system, your components can have visual variations.

Note: These are style components and they are not related to JS components like Vue.js or React.

### Example:

`component/Btn.scss` will be built using a lot of helpers like text or spacing, but also with some configuration values like border style, size, or radius. In fact, you can showcase all variants and states of this element as in a Storybook.

![image](https://github.com/Jordan-Dey/Syncss/assets/143161975/2c53c24a-ec8e-4925-af51-f6f82b67867e)

## Contact

### Author

Jordan Dey

https://bit.ly/m/JordanDey

### Issues

https://github.com/Jordan-Dey/Syncss/issues
