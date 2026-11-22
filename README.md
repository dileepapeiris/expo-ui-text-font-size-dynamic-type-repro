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
