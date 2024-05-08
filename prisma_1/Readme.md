[Learn Prisma In 60 Minutes](https://www.youtube.com/watch?v=RebA5J-rlwg)

```
  npm i --save-dev prisma typescript ts-node @types/node
```

## tsconfig.sjon

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "dist",
    "strict": true,
    "lib": ["ESNext"],
    "esModuleInterop": true
  }
}
```

```
  npx prisma init --datasource-provider sqlserver
```

> Next steps: 2. Run prisma db pull to turn your database schema into a Prisma schema. 3. Run prisma generate to generate the Prisma Client. You can then start querying your database.

```
npx prisma format
```

Prisma schema loaded from prisma\schema.prisma

```
npx prisma migrate dev --name init

npm i @prisma/client

npx prisma generate
```

add "dev": "nodemon script.ts" in package.json
