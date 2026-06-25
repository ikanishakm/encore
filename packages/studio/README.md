# Encore - Studio

Encore is an animation library for high-fidelity motion graphics. It is designed to help you express detailed animation, enabling you to create intricate movement, and convey nuance.

Encore can be used both programmatically _and_ visually.

You can use Encore to:

* Animate 3D objects made with THREE.js or other 3D libraries
  
  ![s](https://raw.githubusercontent.com/AriaMinaei/theatre-docs/main/docs/.vuepress/public/preview-3d-short.gif)

  <sub>Art by [drei.lu](https://sketchfab.com/models/91964c1ce1a34c3985b6257441efa500)</sub>

* Animate HTML/SVG via React or other libraries

  ![s](https://raw.githubusercontent.com/AriaMinaei/theatre-docs/main/docs/.vuepress/public/preview-dom.gif)

* Design micro-interactions

  ![s](https://raw.githubusercontent.com/AriaMinaei/theatre-docs/main/docs/.vuepress/public/preview-micro-interaction.gif)

* Choreograph generative interactive art

  ![s](https://raw.githubusercontent.com/AriaMinaei/theatre-docs/main/docs/.vuepress/public/preview-generative.gif)

* Or animate any other JS variable

  ![s](https://raw.githubusercontent.com/AriaMinaei/theatre-docs/main/docs/.vuepress/public/preview-console.gif)

## Documentation and Tutorials

You can find the documentation and video tutorials [here](https://www.theatrejs.com/docs/latest).

## Community

Join us on [Discord](https://discord.gg/bm9f8F9Y9N), follow the updates on [twitter](https://twitter.com/AriaMinaei) or write us an [email](mailto:hello@theatrejs.com).

## `@encore/studio`

Encore comes in two packages: `@encore/core` (the library) and `@encore/studio` (the editor). This package is the editor, which is only used during design/development.

## License

Your use of Encore is governed under the Apache License Version 2.0:

* Theatre's core (`@encore/core`) is released under the Apache License.
* The studio (`@encore/studio`) is released under the AGPL 3.0 License. This is the package that you use to edit your animations, setup your scenes, etc. You only use the studio during design/development. Your project's final bundle only includes `@encore/core`, so only the Apache License applies.
