import type { Store } from "@reduxjs/toolkit";
export type PersistGateProps = Readonly<{
    children: React.ReactNode;
    store: Store;
}>;
