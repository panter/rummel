---
"@panter/prisma-inputs": major
---

feature: query / connect / create by primary key
This changed was introduce to be more flexibel on the 
model that prisma-inputs can map to a input. In previous
version the model and the input object had to have matching
properties, else the mapper would have complained.

Now we allow any model to be mapped to the input.
This results in most cases with a more verbose code,
as we need to return the model property with a new function
that we provide to each property.

Check the prisma-inputs mapper section to see what has changed.
