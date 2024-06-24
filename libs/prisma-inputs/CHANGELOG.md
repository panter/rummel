# @panter/prisma-inputs

## 1.0.0

### Major Changes

- 6d1169c: feature: query / connect / create by primary key
  This changed was introduce to be more flexibel on the
  model that prisma-inputs can map to a input. In previous
  version the model and the input object had to have matching
  properties, else the mapper would have complained.

  Now we allow any model to be mapped to the input.
  This results in most cases with a more verbose code,
  as we need to return the model property with a new function
  that we provide to each property.

  Check the prisma-inputs mapper section to see what has changed.

- e531c50: No property symetry between model and input needed anymore.

## 0.0.10

### Patch Changes

- 9e59078: feat loosen up deepintersect

## 0.0.9

### Patch Changes

- 78a6fb6: fix reference mapper

## 0.0.8

### Patch Changes

- 6ea525c: Fix boolean mapper

## 0.0.7

### Patch Changes

- 178f3f7: fix type inference for enums

## 0.0.6

### Patch Changes

- 4a80aa7: fix: type errors when used with very restrictive tsconfig

## 0.0.5

### Patch Changes

- f679b62: introduce foreign keys

## 0.0.4

### Patch Changes

- 4b35d27: Upload file in a queue

## 0.0.3

### Patch Changes

- ec9dfbf: fewer options on useForm hook

## 0.0.2

### Patch Changes

- 24cdc03: package.json access changes
