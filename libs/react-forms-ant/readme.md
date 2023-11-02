# React Forms Ant

Input components for react forms using ant design.

# Installation

You can install Prisma Inputs using npm or yarn:

```shell
yarn add @panter/react-forms-ant
```

# ! Important NOTE !

This package is `not transpiled` jet.
If you want to use it with next js you need to add this to your `next.config.js`:

This package is a **basic implementation** of form input elements for ant, if you project needs more complex input elements the ui looks very different, please **copy** this project sources into **your monorepo** and use it as you own. 

Please feel free to contribute back the input elements you created.

```js
const nextConfig = {
  transpilePackages: ["@panter/react-forms-ant"]
  ...
}
```
