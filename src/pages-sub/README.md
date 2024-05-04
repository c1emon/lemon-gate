## 分包路由

分包路由同 [pages](../pages/README.md) 目录下的路由配置一样，同样是由 [`@uni-helper/vite-plugin-uni-pages`](https://github.com/uni-helper/vite-plugin-uni-pages) 自动生成。

**文件夹名称可更改，但需要在 `vite.config.ts` 中 进行配置。**

```ts
import { defineConfig } from 'vite'
import UniPages from '@uni-helper/vite-plugin-uni-pages'

export default defineConfig({
  plugins: [
    UniPages({
      subPackages: [
        'src/pages-sub', // 分包路径
      ],
    }),
  ],
})
```

## ----- English Document -----

## Subpackage Routing

The subpackage routing is the same as the routing configuration under the [pages](../pages/README.md) directory, and it is also automatically generated by [`@uni-helper/vite-plugin-uni-pages`](https://github.com/uni-helper/vite-plugin-uni-pages).

**The folder name can be changed, but it needs to be configured in `vite.config.ts`.**

```ts
import { defineConfig } from 'vite'
import UniPages from '@uni-helper/vite-plugin-uni-pages'

export default defineConfig({
  plugins: [
    UniPages({
      subPackages: [
        'src/pages-sub', // Subpackage path
      ],
    }),
  ],
})
```