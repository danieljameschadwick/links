# @links

### Setup:

```
npm i
```

Then setup the monorepo:

```
lerna bootstrap
```

### Services:

To run an individual service use:

```
yarn run api:start:dev
yarn run web:start:dev
```

### Assistance

To add a new package, from the root directory:

```
npx lerna add <package> --scope=<service/package> [--scope=c --scope=d]
```

E.g.
```
npx lerna add @links/ui --scope=@links/web --dev
```

To remove an existing package:

1. Remove it from the local package/service
2. Run the below

```
lerna bootstrap --scope=<service/package> --no-ci --force-local
```

### Documentation

To generate a dependency graph, run:

```
npx graph
```