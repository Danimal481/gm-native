import { DEFAULT_TOTAL_POINTS } from "@/constants/defaults";
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
    defaultTotalPoints: number;
    setDefaultTotalPoints: (points: number) => void;
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
    const [defaultTotalPoints, setDefaultTotalPoints] = useState(DEFAULT_TOTAL_POINTS);
    const [settingsLoaded, setSettingsLoaded] = useState(false);
    const [roundingMode, setRoundingMode] =
        useState<RoundingMode>("nearest");
        useEffect(() => {
            async function loadSettings() {
                const savedRoundingMode =
                    await AsyncStorage.getItem("roundingMode");
                
                const savedDefaultTotalPoints =
                    await AsyncStorage.getItem("defaultTotalPoints");

                if (savedRoundingMode) {
                    setRoundingMode(savedRoundingMode as RoundingMode);
                }
                if (savedDefaultTotalPoints) {
                    setDefaultTotalPoints(
                        Number(savedDefaultTotalPoints));
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

        useEffect(() => {
            if (!settingsLoaded) {
                return;
            }
                AsyncStorage.setItem("defaultTotalPoints", String(defaultTotalPoints));
            }, [defaultTotalPoints, settingsLoaded]);            
    return (
        <SettingsContext.Provider
            value={{
                roundingMode,
                setRoundingMode,
                defaultTotalPoints,
                setDefaultTotalPoints,
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
