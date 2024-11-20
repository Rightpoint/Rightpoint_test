# WORK IMPORT NOTES

-   Problem: Rich text imports all markup like h3 h4. If they are not transformed, they will fail publish.
    -   Solution: Either transform or disable rich text limitations (preferred + rewrite)
-   Problem: Contentful compose pages v1 automatically made internal name called "name" which doesn't match rest of models.
    -   Solution: Rename to "internalName" to match rest of models.
