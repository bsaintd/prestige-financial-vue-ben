/// <reference types="vite/client" />
/// <reference types="vitest" />

/* eslint-disable */
declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

import { Wrapper } from "@vue/test-utils";

declare module "@vue/test-utils" {
    interface Wrapper {
        readonly vm: any;
    }
}
