# Changelog

## [2.2.1](https://github.com/Himself65/data-viewer/compare/viewer-v2.14.1...viewer-v2.2.1) (2023-03-18)


### ⚠ BREAKING CHANGES

* remove `react-lifecycles-compat`
* component ObjectKeyModal ([#6](https://github.com/Himself65/data-viewer/issues/6))

### Features

* add example for `valueTypes` ([9daf70c](https://github.com/Himself65/data-viewer/commit/9daf70c3e651894bf6afbaca698ce36f953bd3b6))
* add helper function `createDataType` ([#60](https://github.com/Himself65/data-viewer/issues/60)) ([26b7a76](https://github.com/Himself65/data-viewer/commit/26b7a76c0ca1b5a1eb1796a805787278103d9c01))
* add hover effect ([#77](https://github.com/Himself65/data-viewer/issues/77)) ([c2a9dda](https://github.com/Himself65/data-viewer/commit/c2a9ddad43e2367c7c7e023de3be73b7d53df410))
* backport support for `props.displayDataTypes` ([#63](https://github.com/Himself65/data-viewer/issues/63)) ([7ff2d4d](https://github.com/Himself65/data-viewer/commit/7ff2d4de104d307fd4cd2cc6ab80c76698db0b2e))
* backport support for `props.quotesOnKeys` and `props.sortKeys` ([#48](https://github.com/Himself65/data-viewer/issues/48)) ([2cff791](https://github.com/Himself65/data-viewer/commit/2cff7916f2c93353e80a6746a091c14a137e4e50))
* backport support for v1 ([ff729a6](https://github.com/Himself65/data-viewer/commit/ff729a61d3805f1464d879f594c056c16930b49b))
* check cycle reference ([#22](https://github.com/Himself65/data-viewer/issues/22)) ([b55a08b](https://github.com/Himself65/data-viewer/commit/b55a08b39086835bb3794e469f460a1ee80ca7a9)), closes [#20](https://github.com/Himself65/data-viewer/issues/20)
* collapse all empty iterables and disable expanding them ([#123](https://github.com/Himself65/data-viewer/issues/123)) ([5af0122](https://github.com/Himself65/data-viewer/commit/5af012280bc1a3d46e7c00e4088eecd7d289570b))
* enhance function dataType ([#81](https://github.com/Himself65/data-viewer/issues/81)) ([4cb6930](https://github.com/Himself65/data-viewer/commit/4cb6930b3b78d9715d14ed50b116b6013679402c))
* finish basic view of next component ([c9f6d32](https://github.com/Himself65/data-viewer/commit/c9f6d325ecc512e7c0096ee259c92832f96d7ea9))
* init JsonViewerStore ([2673a2d](https://github.com/Himself65/data-viewer/commit/2673a2d48916ce4bccdad8112300b3cc71575332))
* init next JsonViewer component ([cdb20f2](https://github.com/Himself65/data-viewer/commit/cdb20f292744ae6d442bfae9ac9872f103c54dd5))
* invert logic for showing dots ([#122](https://github.com/Himself65/data-viewer/issues/122)) ([a2f2145](https://github.com/Himself65/data-viewer/commit/a2f21458ae18230ecef40e08b3f6ebc44f6f13a6))
* make emotion as peer dependencies ([#7](https://github.com/Himself65/data-viewer/issues/7)) ([c9a3a79](https://github.com/Himself65/data-viewer/commit/c9a3a7942565e9e78bfd397de0818e740b1ba043))
* next component ([#18](https://github.com/Himself65/data-viewer/issues/18)) ([d354967](https://github.com/Himself65/data-viewer/commit/d354967433ddbaa90b3728885fdc4a407aca0a0e))
* **next:** implement basic indent and json parse ([6335512](https://github.com/Himself65/data-viewer/commit/6335512528a82777bc22770463f9357393942485))
* **next:** use TreeView ([b9fd642](https://github.com/Himself65/data-viewer/commit/b9fd6428c1bf8878cf7b068865709ee919ec1922))
* object expand by click on dots ([#76](https://github.com/Himself65/data-viewer/issues/76)) ([ad1c4ba](https://github.com/Himself65/data-viewer/commit/ad1c4ba98668cddbdd912f790e7ce8ff2adc9a72))
* show copy success ([#26](https://github.com/Himself65/data-viewer/issues/26)) ([a7d513a](https://github.com/Himself65/data-viewer/commit/a7d513aa81dcd5c8d2f4a7aba73fc9ca00fcab82))
* support `bigint` type ([#35](https://github.com/Himself65/data-viewer/issues/35)) ([71933e2](https://github.com/Himself65/data-viewer/commit/71933e2c9fb0637d13f62fbddb19c5027b02552d))
* support `displayObjectSize` ([#102](https://github.com/Himself65/data-viewer/issues/102)) ([98181bb](https://github.com/Himself65/data-viewer/commit/98181bb76ebfddaf72a60b2c6eaafdaa79c1cec6)), closes [#101](https://github.com/Himself65/data-viewer/issues/101)
* support `groupArraysAfterLength` ([#21](https://github.com/Himself65/data-viewer/issues/21)) ([6568d91](https://github.com/Himself65/data-viewer/commit/6568d91326d4cdd0120e959a26399c504c0944b0))
* support `onSelect` callback ([#238](https://github.com/Himself65/data-viewer/issues/238)) ([e89a380](https://github.com/Himself65/data-viewer/commit/e89a380bb4251e3a6b7486b608bf7a4171b48ff3))
* support `props.collapseStringsAfterLength` with false ([#97](https://github.com/Himself65/data-viewer/issues/97)) ([1886a7a](https://github.com/Himself65/data-viewer/commit/1886a7a6af8b6926beb77ca6d706b1eb9616d433))
* support `props.editable` ([d3fb54e](https://github.com/Himself65/data-viewer/commit/d3fb54eea3281a383d1a2d2edbbd175d60fa5050))
* support `props.enableClipboard` ([e41102c](https://github.com/Himself65/data-viewer/commit/e41102ccd45f89031f9be759cbf801dff5a5aed4))
* support `props.maxDisplayLength` ([#30](https://github.com/Himself65/data-viewer/issues/30)) ([498efe2](https://github.com/Himself65/data-viewer/commit/498efe2a37d6db9e65721577d1da8a4202c9fa7d))
* support `props.onCopy` ([#113](https://github.com/Himself65/data-viewer/issues/113)) ([da757e1](https://github.com/Himself65/data-viewer/commit/da757e1432ebc8a6f2473923ff28e924eff28aa9))
* support base16 on `props.theme` ([1c7e127](https://github.com/Himself65/data-viewer/commit/1c7e1276abdb52ab92260ac3f0bbfd71afc674df))
* support browser ([#53](https://github.com/Himself65/data-viewer/issues/53)) ([57a72ab](https://github.com/Himself65/data-viewer/commit/57a72abc3cd025025bbc820a261ac5a52f9dd6d4))
* support dark and light theme ([5fb3139](https://github.com/Himself65/data-viewer/commit/5fb313977b4d044c58dfc69173578546058d3b29))
* support e2e test ([#8](https://github.com/Himself65/data-viewer/issues/8)) ([598c39e](https://github.com/Himself65/data-viewer/commit/598c39e0f98512ae27bab350a5bcb90a50641b10))
* support inspect `Map` and `Set` ([#31](https://github.com/Himself65/data-viewer/issues/31)) ([06c886c](https://github.com/Himself65/data-viewer/commit/06c886c4a3f78ece664edcd074173da838e7c5ec))
* support inspect cache ([95f80c7](https://github.com/Himself65/data-viewer/commit/95f80c7ff3165b84fa957e1c1b707470e852feba))
* support path in dataType ([#107](https://github.com/Himself65/data-viewer/issues/107)) ([dad14b9](https://github.com/Himself65/data-viewer/commit/dad14b9b6b069d8261d12cfa0ff1ed3901555d46))
* support plugin system ([fdf9962](https://github.com/Himself65/data-viewer/commit/fdf996241683cc1b642bbd232d4a94b8874b9918))
* **ui:** replace triple dots (...) with ellipsis (…) ([#165](https://github.com/Himself65/data-viewer/issues/165)) ([bbb0dbd](https://github.com/Himself65/data-viewer/commit/bbb0dbdb8bc1078b9d5690c83ecac4a78d2b2b1f))
* update example for `onEdit` ([0dd8a93](https://github.com/Himself65/data-viewer/commit/0dd8a93e350f00f31f6ce0762b3bb395c92cf32b))
* update example for stackblitz ([688a934](https://github.com/Himself65/data-viewer/commit/688a9344495e8bb33504de3bb274fce7b504d3ca))
* use `copy-to-clipboard` ([61cf64e](https://github.com/Himself65/data-viewer/commit/61cf64e10ea3f6d215483ce246032f414a0cae5e))


### Bug Fixes

* add compare function in baseCellType Editor ([4dd5bda](https://github.com/Himself65/data-viewer/commit/4dd5bda27c3ce601b65994f6d7e3af5d9b07380a))
* add license in package.json ([930f128](https://github.com/Himself65/data-viewer/commit/930f128e03ddc6f24fa693d0cd48253c1a344274))
* add vite as dev dependency ([#148](https://github.com/Himself65/data-viewer/issues/148)) ([e34c35e](https://github.com/Himself65/data-viewer/commit/e34c35e38a532b9daeea512763cfd06e15645e6d))
* basic example ([151282e](https://github.com/Himself65/data-viewer/commit/151282e718453bfe446772389d7e14dbeafafd1d))
* border color and expand icon ([d11316a](https://github.com/Himself65/data-viewer/commit/d11316a717a76f231604397252706993ac9389f6))
* browser field cause vite build fail ([#85](https://github.com/Himself65/data-viewer/issues/85)) ([2356ce4](https://github.com/Himself65/data-viewer/commit/2356ce4ce8c16fcffe82a4f88abff10d60482a44))
* bugs ([c966281](https://github.com/Himself65/data-viewer/commit/c966281d1c6913948f8d60387f8a2acaefb8a6c7))
* build issues ([95b1ba8](https://github.com/Himself65/data-viewer/commit/95b1ba8940e1e201dcf0ad1f69ea2e740ff3b2ec))
* cannot resolve `@textea/dev-kit/utils` ([#134](https://github.com/Himself65/data-viewer/issues/134)) ([f9560c3](https://github.com/Himself65/data-viewer/commit/f9560c3670e9f2f125b0dbe3359cbbc061c7e32b))
* correct types reference ([#219](https://github.com/Himself65/data-viewer/issues/219)) ([db23186](https://github.com/Himself65/data-viewer/commit/db23186d1e712c4f1f1d4c6a4a44ed5a6e0f037a))
* disable ObjectKeyModal when inactive ([45b7132](https://github.com/Himself65/data-viewer/commit/45b7132bc476bc080d7748bf48c40944e395dddc))
* disable ssr in function inspect ([8eefe57](https://github.com/Himself65/data-viewer/commit/8eefe57f65e6fca2f27a2265c1e842b7cb8be77c))
* editable for basic value ([#95](https://github.com/Himself65/data-viewer/issues/95)) ([7d0e771](https://github.com/Himself65/data-viewer/commit/7d0e77145ea4bc4302bd3544323cae776aaa5a59))
* example ([117a166](https://github.com/Himself65/data-viewer/commit/117a16620c842bba64231c33c67f4e253fc2482b))
* **example:** add netlify badge ([c1f6ac9](https://github.com/Himself65/data-viewer/commit/c1f6ac906821bc0adc1fbd46f41038218d508e13))
* **example:** image url match ([500f308](https://github.com/Himself65/data-viewer/commit/500f308acac238f87c5cc29290b5c0b6dfe5b307))
* exports default ([9a96901](https://github.com/Himself65/data-viewer/commit/9a969017fde3a288578fa1025d440dd24dd93963))
* ignore circular dependency ([bd275f5](https://github.com/Himself65/data-viewer/commit/bd275f5b24d605f0a6f11ff9747a14c377ad94da))
* ignore error when key of Map is an object ([da2053e](https://github.com/Himself65/data-viewer/commit/da2053e933122604b17cfc4dc2ab394969431109))
* ignore rootName when its false ([#57](https://github.com/Himself65/data-viewer/issues/57)) ([58121f9](https://github.com/Himself65/data-viewer/commit/58121f9ca6af7d0ac7c9154331942cadd7ef266f))
* inline icons from `@mui/icons-material` ([#147](https://github.com/Himself65/data-viewer/issues/147)) ([4fd6f11](https://github.com/Himself65/data-viewer/commit/4fd6f11d2551af4172616e6ecc873de80aae3202))
* key and value text should be selectable ([#217](https://github.com/Himself65/data-viewer/issues/217)) ([f7576ea](https://github.com/Himself65/data-viewer/commit/f7576eafea26b5ae18e0b0181a42d50ca6e7b3c2))
* migrate zustand away from `zustand/context' ([ccf07fa](https://github.com/Himself65/data-viewer/commit/ccf07fa81cb12e759b082b6a0b0fabd83b1d2b82))
* migrate zustand to v4 ([bdb0eab](https://github.com/Himself65/data-viewer/commit/bdb0eab2f1a8561d02da3200e86b388d030d730d))
* missing `props.defaultInspectDepth` ([#40](https://github.com/Himself65/data-viewer/issues/40)) ([b1c2948](https://github.com/Himself65/data-viewer/commit/b1c294840876c5127721474b1f30c57739e8e78d))
* move eslint related deps to devDependencies ([#142](https://github.com/Himself65/data-viewer/issues/142)) ([e2a5f2f](https://github.com/Himself65/data-viewer/commit/e2a5f2fe86b273caa3b5468ffc3aa5d7fa13f14a))
* move type registry into component state ([#64](https://github.com/Himself65/data-viewer/issues/64)) ([b70e628](https://github.com/Himself65/data-viewer/commit/b70e6287444194e01ba168ad0213bb499c2d0540))
* **next:** indent width ([dfafd4b](https://github.com/Himself65/data-viewer/commit/dfafd4bc3fffd720dddb616c6e7886e2bd927a38))
* reduce MUI size by using `@swc/plugin-transform-imports` ([#169](https://github.com/Himself65/data-viewer/issues/169)) ([8cf9039](https://github.com/Himself65/data-viewer/commit/8cf9039ba03a335e2d96f1651b39e8aa2b25dcb3))
* remove ``.stackblitzrc` ([d208e71](https://github.com/Himself65/data-viewer/commit/d208e71a92142924373acc18a3fa45617360752f))
* remove `workspaces` in `package.json` before release ([#143](https://github.com/Himself65/data-viewer/issues/143)) ([2b843f9](https://github.com/Himself65/data-viewer/commit/2b843f90ef690349cb4c592adba4cb2ffbcf9843))
* remove export default ([2da4983](https://github.com/Himself65/data-viewer/commit/2da4983f5f015650b637e76040e5a3c417753664))
* remove export default ([339640b](https://github.com/Himself65/data-viewer/commit/339640b9b7efe4def049789580cef59405e72cf6))
* remove scripts when publishing ([b3497b1](https://github.com/Himself65/data-viewer/commit/b3497b1f090ccea742a6ceabb3b85c85769774c8))
* replace `Object.hasOwn` ([7cdc134](https://github.com/Himself65/data-viewer/commit/7cdc134abf8091bc900a57e062f3c9b86f453edc))
* set `overflowWrap` to `anywhere` ([#99](https://github.com/Himself65/data-viewer/issues/99)) ([7d98cf6](https://github.com/Himself65/data-viewer/commit/7d98cf68c2a7bba086ff2cdcff0d0f722f86991d))
* set editable to false by default ([#69](https://github.com/Himself65/data-viewer/issues/69)) ([02f6790](https://github.com/Himself65/data-viewer/commit/02f6790a9e1013a32bad7198a471746032e535a1))
* set target as `ES5` ([598d229](https://github.com/Himself65/data-viewer/commit/598d229510839e70e327a0c4fcf29f82744a8f22))
* show three dots only on collapsed strings ([#118](https://github.com/Himself65/data-viewer/issues/118)) ([992c9f1](https://github.com/Himself65/data-viewer/commit/992c9f1be0c6651c083eca9c197d2665eaedbf8e))
* simplify if conditions ([#70](https://github.com/Himself65/data-viewer/issues/70)) ([248990c](https://github.com/Himself65/data-viewer/commit/248990c0bcbab1b134790303a3d989a000e15632))
* some enhancements ([#78](https://github.com/Himself65/data-viewer/issues/78)) ([25b23eb](https://github.com/Himself65/data-viewer/commit/25b23ebd548b434e3366a6ab833743f3f6181599))
* ssr on date value ([15037d1](https://github.com/Himself65/data-viewer/commit/15037d139061fbe027cd708fd0be6e8bdb5e0d42))
* state on nested array ([#28](https://github.com/Himself65/data-viewer/issues/28)) ([661151a](https://github.com/Himself65/data-viewer/commit/661151aee6dcd764945a681ccff2ed5016a153dc))
* string on parseInput ([f9da340](https://github.com/Himself65/data-viewer/commit/f9da34079b265ef9a857d6afe4261596159839ed))
* style add padding to `null` and `undefined` ([#50](https://github.com/Himself65/data-viewer/issues/50)) ([1c724d6](https://github.com/Himself65/data-viewer/commit/1c724d676f80219d4955002ee887ca105db97e4e))
* support indent width ([#32](https://github.com/Himself65/data-viewer/issues/32)) ([4f8b32f](https://github.com/Himself65/data-viewer/commit/4f8b32f6cd6c7ea392f934769cde7c3dc8dbc7df))
* throw error if change '__proto__' ([790d99d](https://github.com/Himself65/data-viewer/commit/790d99de31316fbc5951d8ef98556d9c8c3c1aab))
* type ([2c85ef3](https://github.com/Himself65/data-viewer/commit/2c85ef31c1e84a89534195190e797d55b7dde0f3))
* type registry runs multiple times ([#67](https://github.com/Himself65/data-viewer/issues/67)) ([c3daa8e](https://github.com/Himself65/data-viewer/commit/c3daa8e3afbc91149ad329a2e7bbcb234872133a))
* type requirement in example ([9e34a81](https://github.com/Himself65/data-viewer/commit/9e34a81d4a5191843f19d3cbaa2f085cd30812b2))
* **ui:** remove left margin in key-value separator ([#153](https://github.com/Himself65/data-viewer/issues/153)) ([16e0903](https://github.com/Himself65/data-viewer/commit/16e0903424badc25ba52852864d959073da0cbe3))
* use ES2018 as target ([1d06313](https://github.com/Himself65/data-viewer/commit/1d063139a949d2602d04fa511658c3990766de89))


### Code Refactoring

* component ObjectKeyModal ([#6](https://github.com/Himself65/data-viewer/issues/6)) ([5c572d9](https://github.com/Himself65/data-viewer/commit/5c572d9296dac60445498e1c9350c5a73fd357a5))
* remove `react-lifecycles-compat` ([9ad888e](https://github.com/Himself65/data-viewer/commit/9ad888e3939bb7f1efd5ad3bde29afc47bcf17e4))


### Build System

* fix release-please ci ([dc5b28f](https://github.com/Himself65/data-viewer/commit/dc5b28fbf9d807c8004e44d9c25a0072a9e51a48))


### Documentation

* fix install step  ([04a3893](https://github.com/Himself65/data-viewer/commit/04a3893dfbc16f7aa5cd52b062f32d48cb10e30b))
