
## 支持css

```
yarn add style-loader css-loader  -D 
```

## 支持less

```
yarn add  less less-loader   -D
```

## 支持css压缩

```
yarn add  mini-css-extract-plugin  css-minimizer-webpack-plugin   -D

```

## css兼容性处理
```
yarn add postcss postcss-flexbugs-fixes  postcss-loader postcss-preset-env autoprefixer -D
```



##  JS兼容性处理
```
yarn add  babel-loader @babel/core @babel/preset-env @babel/preset-react -D
yarn add @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties @babel/plugin-proposal-private-property-in-object  @babel/plugin-proposal-private-methods -D
```

## 支持ts

```

yarn add  fork-ts-checker-webpack-plugin ts-loader -D 
```


## 支持热更新

```
yarn add @pmmmwh/react-refresh-webpack-plugin  react-refresh  -D 

```

## 其他

```
yarn add   thread-loader terser-webpack-plugin   resolve-url-loader -D
```


## eslint

配置: https://github.com/antfu/eslint-config
```
yarn add eslint@8  eslint-webpack-plugin  @eslint-react/eslint-plugin  @antfu/eslint-config eslint-plugin-format @babel/eslint-parser -D
```