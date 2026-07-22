import type { RoundingMode } from "@/constants/grading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createContext,
    type ReactNode,
    useContext,
    useEffect,
    useState,
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
    const [settingsLoaded, setSettingsLoaded] = useState(false);
    const [roundingMode, setRoundingMode] =
        useState<RoundingMode>("nearest");
        useEffect(() => {
            async function loadSettings() {
                const saveRoundingMode =
                    await AsyncStorage.getItem("roundingMode");

                if (saveRoundingMode) {
                    setRoundingMode(saveRoundingMode as RoundingMode);
                }
                setSettingsLoaded(true);
            }
            loadSettings();                
        }, []);

        useEffect(() => {
            if (!settingsLoaded) {
                return;
            }
                AsyncStorage.setItem("roundingMode", roundingMode);
            }, [roundingMode, settingsLoaded]);

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
