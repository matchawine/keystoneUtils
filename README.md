# Keystone Utils

## Cascade delete

On a 1-to-1 or 1-to-many relationship:

- Delete children when parent is deleted
- Do not delete children when they are removed from parent relation

### Usage

- Use `beforeOperationDeleteOne({ ref: "<child ref>" })` for one-to-one relationships and `beforeOperationDeleteMany({ ref: "<child ref>" })` for one-to-many relationships
- The ref value must be the same as the ref config of the relationship field
- Add it as a before operation hook to relationship fields you want to cascade delete

### Example

See [testSchema/cascadeDelete/oneToOne.ts](https://github.com/matchawine/keystoneUtils/blob/main/testSchema/cascadeDelete/oneToOne.ts) and [testSchema/cascadeDelete/oneToMany.ts](https://github.com/matchawine/keystoneUtils/blob/main/testSchema/cascadeDelete/oneToMany.ts).

## History [Beta]

### Usage

- Add History schema to your lists
- Add the `afterOperationSaveHistory` hook to any object you want to historize

### Example

See [testSchema/historized](https://github.com/matchawine/keystoneUtils/blob/main/testSchema/history/historized.ts)
