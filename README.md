# @expo/ui Text ignores the system text size when textStyle.fontSize is set (iOS)

Reproduction for https://github.com/expo/expo/issues/54006 on iOS, with every row measured on
screen so the numbers can be read from the screenshots.

Versions: Expo SDK 58 (`expo` 58.0.26), `@expo/ui` 58.0.29, `expo-modules-core` 58.1.0,
`react-native` 0.88.1, New Architecture.
Recorded on the iPhone 17 Pro simulator, iOS 26.5, Xcode 27.2, 11/23/26.

## Run

```sh
npm install
npx expo run:ios   # development build, iOS simulator or device
```

Then change the system text size while the app is open. On a simulator:

```sh
xcrun simctl ui booted content_size extra-extra-extra-large
xcrun simctl ui booted content_size accessibility-extra-extra-extra-large
xcrun simctl ui booted content_size large   # back to the default
```

On a device: Settings > Accessibility > Display & Text Size > Larger Text.

## What the screen shows

The `fontScale` reported by `useWindowDimensions()`, then six rows with the same string. Under
each row a fixed-size caption prints the row's `onLayout` width and height in points.

| Row | Component | Expected on a larger text size |
| --- | --- | --- |
| RN Text, fontSize 12 | React Native `Text`, `style={{ fontSize: 12 }}` | Grows by `fontScale` (`allowFontScaling` default) |
| RN Text, fontSize 12, allowFontScaling off | React Native `Text` with `allowFontScaling={false}` | Stays 12 pt, the opt-out |
| @expo/ui Text, fontSize 12 | `@expo/ui` `Text`, `textStyle={{ fontSize: 12 }}` | Grows like the first row |
| @expo/ui Text, fontSize 12, lineHeight 20 | same, two lines, `lineHeight: 20` | Grows, line spacing included |
| @expo/ui Text, no fontSize | `@expo/ui` `Text` with no `textStyle` | Grows (SwiftUI body style) |
| Workaround: fontSize 12 × fontScale | `textStyle={{ fontSize: 12 * fontScale }}` | Grows |
