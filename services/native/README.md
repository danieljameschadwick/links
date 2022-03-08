# native

To run native app, run:

```
expo start
```

### If module is not found

```
 1. Clear watchman watches: watchman watch-del-all
 2. Delete node_modules and run npm install (lerna exec npm install)
 3. Reset Metro's cache: expo start --reset-cache
 4. Remove the cache: rm -rf /tmp/metro-*
```
