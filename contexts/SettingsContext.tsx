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

export type ThemeMode = "system" | "light" | "dark";

type SettingsContextValue = {
    roundingMode: RoundingMode;
    setRoundingMode: (mode: RoundingMode) => void;
    defaultTotalPoints: number;
    setDefaultTotalPoints: (points: number) => void;
    settingsLoaded: boolean;
    gradeScale: GradeScale;
    setGradeScale: (scale: GradeScale) => void;
    totalPoints: string;
    setTotalPoints: React.Dispatch<React.SetStateAction<string>>;
    pointsEarned: string;
    setPointsEarned: React.Dispatch<React.SetStateAction<string>>;
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;

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
    const [themeMode, setThemeMode] = useState<ThemeMode>("system");
    const [totalPoints, setTotalPoints] = useState("");
    const [pointsEarned, setPointsEarned] = useState("");
    const [defaultTotalPoints, setDefaultTotalPoints] = useState(DEFAULT_TOTAL_POINTS);
    const [settingsLoaded, setSettingsLoaded] = useState(false);
    const [gradeScale, setGradeScale] = useState<GradeScale>(DEFAULT_GRADE_SCALE);
    const [roundingMode, setRoundingMode] =
        useState<RoundingMode>("nearest");
        useEffect(() => {
            async function loadSettings() {
                const savedThemeMode =
                    await AsyncStorage.getItem("themeMode");

                if (
                    savedThemeMode === "system" ||
                    savedThemeMode === "light" ||
                    savedThemeMode === "dark"
                ) {
                    setThemeMode(savedThemeMode);
                }

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
            AsyncStorage.setItem("themeMode", themeMode);
        }, [themeMode, settingsLoaded]);

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
                gradeScale,
                setGradeScale,
                totalPoints,
                setTotalPoints,
                pointsEarned,
                setPointsEarned,
                settingsLoaded,
                themeMode,
                setThemeMode,
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
