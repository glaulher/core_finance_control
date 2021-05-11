# Backend Application



```typescript
yarn add typeorm reflect-metadata express  sqlite3 uuid
```
```javascript
yarn add -D typescript ts-node-dev @types/express
```

Create scripts in package.json

```json
"scripts": {
    "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts",
    "typeorm": "ts-node-dev node_modules/typeorm/cli.js"
  }
```

Create migrations table 

```javascript
yarn typeorm migration:create -n CreateUsers 
```

Create  table 

```javascript
yarn typeorm migration:run
```

Reverse table 

```javascript
yarn typeorm migration:reverse
```

