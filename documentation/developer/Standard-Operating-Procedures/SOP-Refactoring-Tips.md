# Refactoring tips

This project uses the `@deprecated` to mark code that should no longer be used.

# Moving code

When the need is explicitly to move code from one package to another, say from `core/components` to `core/utils`, the following steps should be taken:

-   Add a `@deprecated` comment to the old code
-   Add a `deprecationWarning("Use X instead")` to the old code if desired (this will print a loud warning to console)
-   Copy the code into the desired location in the new package
-   Update all or some imports to the new location, depending on migration plan

When confident that no code reaches the deprecated code, remove the code from the old location.
