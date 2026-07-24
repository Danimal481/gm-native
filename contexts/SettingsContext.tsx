import { DEFAULT_GRADE_SCALE, DEFAULT_TOTAL_POINTS } from "@/constants/defaults";
import {
    type GradeScale,
    type RoundingMode,
} from "@/constants/grading";
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
    settingsLoaded: boolean;
    gradeScale: GradeScale;
    setGradeScale: (scale: GradeScale) => void;
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
    const [gradeScale, setGradeScale] = useState<GradeScale>(DEFAULT_GRADE_SCALE);
    const [roundingMode, setRoundingMode] =
        useState<RoundingMode>("nearest");
        useEffect(() => {
            async function loadSettings() {
                const savedRoundingMode =
                    await AsyncStorage.getItem("roundingMode");
                
                const savedDefaultTotalPoints =
                    await AsyncStorage.getItem("defaultTotalPoints");
                
                const savedGradeScale =
                    await AsyncStorage.getItem("gradeScale");

                if (savedRoundingMode) {
                    setRoundingMode(savedRoundingMode as RoundingMode);
                }
                if (savedDefaultTotalPoints) {
                    setDefaultTotalPoints(
                        Number(savedDefaultTotalPoints));
                }
                if (savedGradeScale) {
                    setGradeScale(JSON.parse(savedGradeScale));
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
        
        useEffect(() => {
            if (!settingsLoaded) {
                return;
            }
                AsyncStorage.setItem("gradeScale", JSON.stringify(gradeScale)
            );
        }, [gradeScale, settingsLoaded]);
    return (
        <SettingsContext.Provider
            value={{
                roundingMode,
                setRoundingMode,
                defaultTotalPoints,
                setDefaultTotalPoints,
                settingsLoaded,
                gradeScale,
                setGradeScale,
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
