import type { RoundingMode } from "@/constants/grading";
import {
    createContext,
    type ReactNode,
    useContext,
    useState
} from "react";

type SettingsContextValue = {
    roundingMode: RoundingMode;
    setRoundingMode: (mode: RoundingMode) => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(
  undefined
);

type SettingsProviderProps = {
  children: ReactNode;
};

export function SettingsProvider({
    children,
}: SettingsProviderProps) {
    const [roundingMode, setRoundingMode] =
        useState<RoundingMode>("nearest");
    
    return (
        <SettingsContext.Provider
            value={{
                roundingMode,
                setRoundingMode,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);

    if (context === undefined) {
        throw new Error(
            "useSettings must be used within a SettingsProvider"
        );
    }
    return context;
}
