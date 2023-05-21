# Toaster: Pure CSS 3D Modelling Suite ([view site](https://petertyliu.github.io/toaster/))

Toaster is a 3D editor for modelling in pure HTML + CSS. No WebGL, no canvas.

Special thanks to [Paweł Kuna](https://github.com/codecalm) for adding my requested icons to the awesome [tabler-icons](https://github.com/tabler/tabler-icons) library!

## FAQ

### ❓ Are there any practical applications for this app?

Nope!

### ❓ It's really hard to use!

Yup!

### ❓ Can I export/embed the model I made?

You can save the model as JSON and re-import it for viewing in the app. As for exporting HTML/CSS, not at the momemnt, but if you want such a feature, you are free to make a pull request!

### ❓ Didn't [Tridiv](http://tridiv.com/) do this like a decade ago?

Indeed - they were a great inspiration (their UX is still way better than mine!) Toaster has some key improvements over Tridiv:

- A node-based scene graph with parenting and property inheritence
- Complex solids like spheres, n-sided pyramids, etc. for more complex models
- A complete set of scale/rotate/translate transforms for each node
- Toaster is open source!

### ❓ The performance is terrible!

Yup 🤷. When there's a model loaded, it's slow on Chrome, and pretty much unusable on Safari.
