import AsyncStorage from "@react-native-async-storage/async-storage";
import * as StoreReview from "expo-store-review";

const OPEN_COUNT_KEY = "review_open_count";
const CALC_COUNT_KEY = "review_calc_count";
const FIRST_OPEN_KEY = "review_first_open";
const REVIEW_REQUESTED_KEY = "review_requested";

const MIN_OPENS = 5;
const MIN_CALCULATIONS = 10;
const MIN_DAYS = 3;

let openRecordedThisSession = false;

export async function recordAppOpen() {
    if (openRecordedThisSession) {
        return;
    }
    openRecordedThisSession = true;

  const now = Date.now();

  const firstOpen = await AsyncStorage.getItem(FIRST_OPEN_KEY);

  if (!firstOpen) {
    await AsyncStorage.setItem(FIRST_OPEN_KEY, String(now));
  }

  const currentCount = Number(
    (await AsyncStorage.getItem(OPEN_COUNT_KEY)) ?? "0"
  );

  await AsyncStorage.setItem(
    OPEN_COUNT_KEY,
    String(currentCount + 1)
  );
}

export async function recordCalculationAndMaybeRequestReview() {
  const currentCount = Number(
    (await AsyncStorage.getItem(CALC_COUNT_KEY)) ?? "0"
  );

  const newCount = currentCount + 1;

  await AsyncStorage.setItem(
    CALC_COUNT_KEY,
    String(newCount)
  );

  await maybeRequestReview();
}

async function maybeRequestReview() {
  const alreadyRequested =
    await AsyncStorage.getItem(REVIEW_REQUESTED_KEY);

  if (alreadyRequested === "true") {
    return;
  }

  const openCount = Number(
    (await AsyncStorage.getItem(OPEN_COUNT_KEY)) ?? "0"
  );

  const calculationCount = Number(
    (await AsyncStorage.getItem(CALC_COUNT_KEY)) ?? "0"
  );

  const firstOpenValue =
    await AsyncStorage.getItem(FIRST_OPEN_KEY);

  if (!firstOpenValue) {
    return;
  }

  const firstOpen = Number(firstOpenValue);

  const daysSinceFirstOpen =
    (Date.now() - firstOpen) / (1000 * 60 * 60 * 24);

  if (
    openCount < MIN_OPENS ||
    calculationCount < MIN_CALCULATIONS ||
    daysSinceFirstOpen < MIN_DAYS
  ) {
    return;
  }

  const available = await StoreReview.isAvailableAsync();

  if (!available) {
    return;
  }

  await AsyncStorage.setItem(
    REVIEW_REQUESTED_KEY,
    "true"
  );

  await StoreReview.requestReview();
}