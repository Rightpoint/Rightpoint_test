# Floating Content

On mount, we need to distribute the items by visual space.

## How?

-   A larger item takes up more visual space, and should not cluster in one area.

## Idea

Iterate through items... if there are 8, distribute them in a 3xid.

|     |     |     |
| --- | --- | --- |
| TL  | TM  | TR  |
| ML  | MM  | MR  |
| BL  | BM  | BR  |

Maybe the zones should be configurable, that way it can more closely match distributions we are looking for.

Wide screens could have more columns.

So, given 3 items... randomly placing them in one of the 9 grids sounds good.

## Dimensions

Content should be dimensioned by itself. Right?

# Least populated quad

-   Find least populated quad.
-   Find the least populated quad, in that quad.
-   Place in there.
