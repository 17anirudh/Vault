import type { ReactNode } from "react";

type CashRootProps = { children: ReactNode }

export default function Money({ children }: CashRootProps) {
    return (
        <>
            {children}
        </>
    );
}